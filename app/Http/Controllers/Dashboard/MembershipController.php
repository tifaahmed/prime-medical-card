<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\MembershipFamily\RelationshipEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\MembershipRequest;
use App\Http\Resources\Dashboard\MembershipResource;
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
            ->with('media')
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
        ]);
    }

    public function store(MembershipRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $family = $data['family'] ?? [];
        $photo = $request->file('photo');
        $photoRemove = (bool) ($data['photo_remove'] ?? false);
        unset($data['family'], $data['photo'], $data['photo_remove']);

        $membership = DB::transaction(function () use ($request, $data, $family, $photo, $photoRemove) {
            $user = $this->createPlaceholderUser($data['membership_number']);
            $data['user_id'] = $user->id;

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
            'family' => fn ($q) => $q->orderBy('id'),
            'family.media',
            'media',
        ]);

        return Inertia::render('dashboard/memberships/edit', [
            'membership' => MembershipResource::make($membership)->resolve($request),
            'relationships' => RelationshipEnum::getOptions(),
        ]);
    }

    public function update(MembershipRequest $request, Membership $membership): RedirectResponse
    {
        $data = $request->validated();
        $family = $data['family'] ?? [];
        $photo = $request->file('photo');
        $photoRemove = (bool) ($data['photo_remove'] ?? false);
        unset($data['family'], $data['photo'], $data['photo_remove']);

        DB::transaction(function () use ($request, $membership, $data, $family, $photo, $photoRemove) {
            $membership->update($data);
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

    private function createPlaceholderUser(string $membershipNumber): User
    {
        $slug = Str::slug($membershipNumber) ?: 'member-'.Str::random(8);
        $email = "{$slug}@placeholder.invalid";

        if (User::where('email', $email)->exists()) {
            $email = "{$slug}-".Str::lower(Str::random(6)).'@placeholder.invalid';
        }

        return User::create([
            'name' => 'Member '.$membershipNumber,
            'email' => $email,
            'password' => Hash::make(Str::random(40)),
            'email_verified_at' => now(),
        ]);
    }
}
