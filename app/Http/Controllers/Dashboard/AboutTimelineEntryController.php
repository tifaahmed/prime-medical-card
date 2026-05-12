<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AboutTimelineEntryRequest;
use App\Http\Resources\Dashboard\AboutTimelineEntryResource;
use App\Models\AboutTimelineEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutTimelineEntryController extends Controller
{
    public function index(Request $request): Response
    {
        $items = AboutTimelineEntry::query()
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->through(fn ($r) => AboutTimelineEntryResource::make($r)->resolve($request));

        return Inertia::render('dashboard/about-timeline/index', [
            'entries' => $items,
            'filters' => ['search' => ''],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/about-timeline/create');
    }

    public function store(AboutTimelineEntryRequest $request): RedirectResponse
    {
        $row = AboutTimelineEntry::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-timeline.edit',
            'dashboard.about-timeline.index',
            $row,
        );
    }

    public function edit(Request $request, AboutTimelineEntry $aboutTimeline): Response
    {
        return Inertia::render('dashboard/about-timeline/edit', [
            'entry' => AboutTimelineEntryResource::make($aboutTimeline)->resolve($request),
        ]);
    }

    public function update(AboutTimelineEntryRequest $request, AboutTimelineEntry $aboutTimeline): RedirectResponse
    {
        $aboutTimeline->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-timeline.edit',
            'dashboard.about-timeline.index',
            $aboutTimeline,
        );
    }

    public function destroy(AboutTimelineEntry $aboutTimeline): RedirectResponse
    {
        $aboutTimeline->delete();

        return to_route('dashboard.about-timeline.index');
    }
}
