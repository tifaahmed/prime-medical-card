<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CardTemplateRequest;
use App\Http\Resources\Dashboard\CardTemplateResource;
use App\Models\CardTemplate;
use App\Models\Membership;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CardTemplateController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $templates = CardTemplate::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('is_default', 'desc')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($t) => CardTemplateResource::make($t)->resolve($request));

        return Inertia::render('dashboard/card-templates/index', [
            'templates' => $templates,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/card-templates/create', [
            'defaultLayout' => Membership::DEFAULT_CARD_LAYOUT,
        ]);
    }

    public function store(CardTemplateRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $template = CardTemplate::create([
            'name' => $data['name'],
            'layout' => $data['layout'] ?? Membership::DEFAULT_CARD_LAYOUT,
            'is_default' => $data['is_default'] ?? false,
        ]);

        if ($template->is_default) {
            CardTemplate::where('id', '!=', $template->id)->update(['is_default' => false]);
        }

        $this->syncImages($template, $request);

        return $this->redirectAfterSave(
            $request,
            'dashboard.card-templates.edit',
            'dashboard.card-templates.index',
            $template,
        );
    }

    public function edit(Request $request, CardTemplate $cardTemplate): Response
    {
        return Inertia::render('dashboard/card-templates/edit', [
            'template' => CardTemplateResource::make($cardTemplate)->resolve($request),
        ]);
    }

    public function update(CardTemplateRequest $request, CardTemplate $cardTemplate): RedirectResponse
    {
        $data = $request->validated();

        $cardTemplate->update([
            'name' => $data['name'],
            'layout' => $data['layout'] ?? $cardTemplate->layout,
            'is_default' => $data['is_default'] ?? false,
        ]);

        if ($cardTemplate->is_default) {
            CardTemplate::where('id', '!=', $cardTemplate->id)->update(['is_default' => false]);
        }

        $this->syncImages($cardTemplate, $request);

        return $this->redirectAfterSave(
            $request,
            'dashboard.card-templates.edit',
            'dashboard.card-templates.index',
            $cardTemplate,
        );
    }

    public function destroy(CardTemplate $cardTemplate): RedirectResponse
    {
        $cardTemplate->delete();

        return to_route('dashboard.card-templates.index');
    }

    private function syncImages(CardTemplate $template, CardTemplateRequest $request): void
    {
        foreach (['front_empty', 'front_example', 'back'] as $field) {
            if ($request->boolean("{$field}_remove")) {
                $template->clearMediaCollection($field);
            }

            if ($request->hasFile($field)) {
                $template->addMedia($request->file($field))
                    ->usingFileName($request->file($field)->getClientOriginalName())
                    ->toMediaCollection($field);
            }
        }
    }
}
