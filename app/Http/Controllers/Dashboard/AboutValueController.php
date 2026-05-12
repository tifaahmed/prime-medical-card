<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AboutValueRequest;
use App\Http\Resources\Dashboard\AboutValueResource;
use App\Models\AboutValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutValueController extends Controller
{
    public function index(Request $request): Response
    {
        $items = AboutValue::query()
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->through(fn ($r) => AboutValueResource::make($r)->resolve($request));

        return Inertia::render('dashboard/about-values/index', [
            'values' => $items,
            'filters' => ['search' => ''],
            'iconKeys' => AboutValueRequest::ICON_KEYS,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/about-values/create', [
            'iconKeys' => AboutValueRequest::ICON_KEYS,
        ]);
    }

    public function store(AboutValueRequest $request): RedirectResponse
    {
        $row = AboutValue::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-values.edit',
            'dashboard.about-values.index',
            $row,
        );
    }

    public function edit(Request $request, AboutValue $aboutValue): Response
    {
        return Inertia::render('dashboard/about-values/edit', [
            'value' => AboutValueResource::make($aboutValue)->resolve($request),
            'iconKeys' => AboutValueRequest::ICON_KEYS,
        ]);
    }

    public function update(AboutValueRequest $request, AboutValue $aboutValue): RedirectResponse
    {
        $aboutValue->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-values.edit',
            'dashboard.about-values.index',
            $aboutValue,
        );
    }

    public function destroy(AboutValue $aboutValue): RedirectResponse
    {
        $aboutValue->delete();

        return to_route('dashboard.about-values.index');
    }
}
