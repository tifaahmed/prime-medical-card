<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\MembershipFamily\RelationshipEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\MembershipRequest;
use App\Http\Resources\Dashboard\CardTemplateResource;
use App\Http\Resources\Dashboard\MembershipResource;
use App\Models\CardTemplate;
use App\Models\Membership;
use App\Models\MembershipFamily;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MembershipController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $memberships = Membership::query()
            ->with(['media', 'user'])
            ->withCount('family')
            ->when($search, fn ($q) => $q->where('membership_number', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($membership) => MembershipResource::make($membership)->resolve($request));

        return Inertia::render('dashboard/memberships/index', [
            'memberships' => $memberships,
            'filters' => ['search' => $search],
        ]);
    }

    public function show(Request $request, Membership $membership): Response
    {
        $membership->load([
            'user',
            'family' => fn ($q) => $q->orderBy('id'),
            'family.media',
            'media',
        ]);

        return Inertia::render('dashboard/memberships/show', [
            'membership' => MembershipResource::make($membership)->resolve($request),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/memberships/create', [
            'relationships' => RelationshipEnum::getOptions(),
            'next_membership_number' => $this->generateMembershipNumber(),
        ]);
    }

    public function store(MembershipRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $family = $data['family'] ?? [];
        $photo = $request->file('photo');
        $photoRemove = (bool) ($data['photo_remove'] ?? false);
        $nameParts = $this->extractNameParts($data);
        unset(
            $data['family'], $data['photo'], $data['photo_remove'],
            $data['first_name'], $data['second_name'], $data['third_name'], $data['fourth_name'],
        );

        $membership = DB::transaction(function () use ($request, $data, $family, $photo, $photoRemove, $nameParts) {
            $user = $this->createPlaceholderUser($data['membership_number'], $nameParts);
            $data['user_id'] = $user->id;

            if (! ($data['card_template_id'] ?? null)) {
                $default = CardTemplate::getDefault();
                if ($default) {
                    $data['card_template_id'] = $default->id;
                }
            }

            $membership = Membership::create($data);
            $this->syncMembershipPhoto($membership, $photo, $photoRemove);
            $this->syncFamily($membership, $family, $request);

            return $membership;
        });

        return $this->redirectAfterSave(
            $request,
            'dashboard.memberships.edit',
            'dashboard.memberships.index',
            $membership,
        );
    }

    public function edit(Request $request, Membership $membership): Response
    {
        $membership->load([
            'user',
            'family' => fn ($q) => $q->orderBy('id'),
            'family.media',
            'media',
        ]);

        $resolved = MembershipResource::make($membership)->resolve($request);
        $resolved['first_name'] = $membership->user?->first_name;
        $resolved['second_name'] = $membership->user?->second_name;
        $resolved['third_name'] = $membership->user?->third_name;
        $resolved['fourth_name'] = $membership->user?->fourth_name;

        return Inertia::render('dashboard/memberships/edit', [
            'membership' => $resolved,
            'relationships' => RelationshipEnum::getOptions(),
        ]);
    }

    public function update(MembershipRequest $request, Membership $membership): RedirectResponse
    {
        $data = $request->validated();
        $family = $data['family'] ?? [];
        $photo = $request->file('photo');
        $photoRemove = (bool) ($data['photo_remove'] ?? false);
        $nameParts = $this->extractNameParts($data);
        unset(
            $data['family'], $data['photo'], $data['photo_remove'],
            $data['first_name'], $data['second_name'], $data['third_name'], $data['fourth_name'],
        );

        DB::transaction(function () use ($request, $membership, $data, $family, $photo, $photoRemove, $nameParts) {
            $membership->update($data);
            $this->syncMembershipUser($membership, $nameParts);
            $this->syncMembershipPhoto($membership, $photo, $photoRemove);
            $this->syncFamily($membership, $family, $request);
        });

        return $this->redirectAfterSave(
            $request,
            'dashboard.memberships.edit',
            'dashboard.memberships.index',
            $membership,
        );
    }

    public function destroy(Membership $membership): RedirectResponse
    {
        $membership->delete();

        return to_route('dashboard.memberships.index');
    }

    public function card(Membership $membership): Response
    {
        $membership->load(['media', 'user', 'cardTemplate']);

        $templates = CardTemplate::query()
            ->orderBy('is_default', 'desc')
            ->orderBy('id')
            ->get()
            ->map(fn ($t) => CardTemplateResource::make($t)->resolve(Request::capture()))
            ->all();

        return Inertia::render('dashboard/memberships/card', [
            'membership' => [
                'id' => $membership->id,
                'membership_number' => $membership->membership_number,
                'expiration_date' => $membership->expiration_date?->toDateString(),
                'job_title_en' => $membership->getTranslation('job_title', 'en', false),
                'job_title_ar' => $membership->getTranslation('job_title', 'ar', false),
                'company_name' => $membership->company_name,
                'card_first_name' => $membership->card_first_name,
                'card_full_name' => $membership->card_full_name,
                'card_membership_number' => $membership->card_membership_number,
                'photo_url' => $membership->photo ?: null,
                'holder_name' => $membership->user?->name,
                'first_name' => $membership->user?->first_name,
                'second_name' => $membership->user?->second_name,
                'third_name' => $membership->user?->third_name,
                'fourth_name' => $membership->user?->fourth_name,
                'card_layout' => $membership->resolvedCardLayout(),
                'card_template_id' => $membership->card_template_id,
            ],
            'cardTemplates' => $templates,
            'default_card_layout' => Membership::DEFAULT_CARD_LAYOUT,
        ]);
    }

    public function updateCard(Request $request, Membership $membership): RedirectResponse
    {
        $data = $request->validate([
            'card_first_name' => ['nullable', 'string', 'max:255'],
            'card_full_name' => ['nullable', 'string', 'max:255'],
            'card_membership_number' => ['nullable', 'string', 'max:255'],
            'job_title_en' => ['nullable', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'expiration_date' => ['nullable', 'date'],
            'photo' => ['nullable', 'mimes:jpeg,png,jpg,gif,webp,avif', 'max:4096'],
            'photo_remove' => ['nullable', 'boolean'],
            'card_template_id' => ['nullable', 'exists:card_templates,id'],
            'card_layout' => ['nullable', 'array'],
            'card_layout.*' => ['array'],
            'card_layout.*.top' => ['nullable', 'numeric'],
            'card_layout.*.left' => ['nullable', 'numeric'],
            'card_layout.*.width' => ['nullable', 'numeric'],
            'card_layout.*.height' => ['nullable', 'numeric'],
            'card_layout.*.fontSize' => ['nullable', 'numeric'],
            'card_layout.*.rounded' => ['nullable', 'boolean'],
            'card_layout.*.hidden' => ['nullable', 'boolean'],
        ]);

        $membership->card_first_name = $data['card_first_name'] ?? null;
        $membership->card_full_name = $data['card_full_name'] ?? null;
        $membership->card_membership_number = $data['card_membership_number'] ?? null;
        if (array_key_exists('expiration_date', $data) && $data['expiration_date']) {
            $membership->expiration_date = $data['expiration_date'];
        }
        $jobTitle = $membership->job_title ?? [];
        if (! is_array($jobTitle)) {
            $jobTitle = [];
        }
        $jobTitle['en'] = $data['job_title_en'] ?? null;
        $membership->job_title = $jobTitle;
        $membership->company_name = $data['company_name'] ?? null;
        if (array_key_exists('card_template_id', $data)) {
            $membership->card_template_id = $data['card_template_id'];
        }
        if (array_key_exists('card_layout', $data)) {
            $layout = $data['card_layout'];
            array_walk_recursive($layout, function (&$v, $k) {
                if ($k === 'hidden') {
                    $v = filter_var($v, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false;
                }
            });
            $membership->card_layout = $layout;
        }
        $membership->save();

        $this->syncMembershipPhoto(
            $membership,
            $request->file('photo'),
            (bool) ($data['photo_remove'] ?? false),
        );

        return to_route('dashboard.memberships.card', $membership);
    }

    public function saveCardSnapshot(Request $request, Membership $membership): RedirectResponse
    {
        $request->validate([
            'front' => ['required', 'image', 'mimes:png', 'max:10240'],
        ]);

        $membership->clearMediaCollection('card_front');
        $membership->addMedia($request->file('front')->getRealPath())
            ->usingFileName('card-'.$membership->membership_number.'-front.png')
            ->toMediaCollection('card_front');

        return back();
    }

    private function syncMembershipPhoto(Membership $membership, $photo, bool $remove): void
    {
        if ($remove || $photo) {
            $membership->clearMediaCollection('photo');
        }

        if ($photo) {
            $membership->addMedia($photo->getRealPath())
                ->usingFileName($photo->getClientOriginalName())
                ->toMediaCollection('photo');
        }
    }

    private function syncFamily(Membership $membership, array $family, MembershipRequest $request): void
    {
        foreach ($family as $i => $payload) {
            $id = $payload['id'] ?? null;
            $delete = (bool) ($payload['_delete'] ?? false);

            if ($id && $delete) {
                MembershipFamily::where('id', $id)
                    ->where('membership_id', $membership->id)
                    ->delete();

                continue;
            }

            $attributes = [
                'name' => $payload['name'] ?? null,
                'relationship' => $payload['relationship'] ?? null,
                'date_of_birth' => $payload['date_of_birth'] ?? null,
                'phone' => $payload['phone'] ?? null,
                'email' => $payload['email'] ?? null,
                'is_active' => (bool) ($payload['is_active'] ?? true),
            ];

            $member = null;
            if ($id) {
                $member = MembershipFamily::where('id', $id)
                    ->where('membership_id', $membership->id)
                    ->first();

                if ($member) {
                    $member->update($attributes);
                }
            } else {
                $hasContent = ! empty(array_filter([
                    $attributes['name'],
                    $attributes['relationship'],
                    $attributes['phone'],
                    $attributes['email'],
                ]));

                if (! $hasContent) {
                    continue;
                }

                $member = $membership->family()->create($attributes);
            }

            if ($member) {
                $this->syncFamilyPhoto($member, $request, $i, $payload);
            }
        }
    }

    private function syncFamilyPhoto(
        MembershipFamily $member,
        MembershipRequest $request,
        int $index,
        array $payload,
    ): void {
        $photo = $request->file("family.{$index}.photo");
        $remove = (bool) ($payload['photo_remove'] ?? false);

        if ($remove || $photo) {
            $member->clearMediaCollection('photo');
        }

        if ($photo) {
            $member->addMedia($photo->getRealPath())
                ->usingFileName($photo->getClientOriginalName())
                ->toMediaCollection('photo');
        }
    }

    private function generateMembershipNumber(): string
    {
        $year = now()->format('Y');
        $prefix = "MC-{$year}-";

        $lastNumber = Membership::withTrashed()
            ->where('membership_number', 'like', $prefix.'%')
            ->orderByDesc('membership_number')
            ->value('membership_number');

        $sequence = 1;
        if ($lastNumber) {
            $sequence = ((int) Str::afterLast($lastNumber, '-')) + 1;
        }

        do {
            $candidate = $prefix.str_pad((string) $sequence, 4, '0', STR_PAD_LEFT);
            $sequence++;
        } while (Membership::withTrashed()->where('membership_number', $candidate)->exists());

        return $candidate;
    }

    private function createPlaceholderUser(string $membershipNumber, array $nameParts = []): User
    {
        $slug = Str::slug($membershipNumber) ?: 'member-'.Str::random(8);
        $email = "{$slug}@placeholder.invalid";

        if (User::where('email', $email)->exists()) {
            $email = "{$slug}-".Str::lower(Str::random(6)).'@placeholder.invalid';
        }

        return User::create([
            'name' => $this->buildFullName($nameParts) ?: 'Member '.$membershipNumber,
            'first_name' => $nameParts['first_name'] ?? null,
            'second_name' => $nameParts['second_name'] ?? null,
            'third_name' => $nameParts['third_name'] ?? null,
            'fourth_name' => $nameParts['fourth_name'] ?? null,
            'email' => $email,
            'password' => Hash::make(Str::random(40)),
            'email_verified_at' => now(),
        ]);
    }

    private function extractNameParts(array $data): array
    {
        return [
            'first_name' => $data['first_name'] ?? null,
            'second_name' => $data['second_name'] ?? null,
            'third_name' => $data['third_name'] ?? null,
            'fourth_name' => $data['fourth_name'] ?? null,
        ];
    }

    private function buildFullName(array $nameParts): string
    {
        return trim(implode(' ', array_filter([
            $nameParts['first_name'] ?? null,
            $nameParts['second_name'] ?? null,
            $nameParts['third_name'] ?? null,
            $nameParts['fourth_name'] ?? null,
        ])));
    }

    private function syncMembershipUser(Membership $membership, array $nameParts): void
    {
        $user = $membership->user;
        if (! $user) {
            return;
        }

        $user->forceFill([
            'first_name' => $nameParts['first_name'] ?? null,
            'second_name' => $nameParts['second_name'] ?? null,
            'third_name' => $nameParts['third_name'] ?? null,
            'fourth_name' => $nameParts['fourth_name'] ?? null,
            'name' => $this->buildFullName($nameParts) ?: $user->name,
        ])->save();
    }
}
