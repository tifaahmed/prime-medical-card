<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\AboutStatRequest;
use App\Http\Resources\Dashboard\AboutStatResource;
use App\Models\AboutStat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AboutStatController extends Controller
{
    public function index(Request $request): Response
    {
        $items = AboutStat::query()
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->through(fn ($r) => AboutStatResource::make($r)->resolve($request));

        return Inertia::render('dashboard/about-stats/index', [
            'stats' => $items,
            'filters' => ['search' => ''],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/about-stats/create');
    }

    public function store(AboutStatRequest $request): RedirectResponse
    {
        $row = AboutStat::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-stats.edit',
            'dashboard.about-stats.index',
            $row,
        );
    }

    public function edit(Request $request, AboutStat $aboutStat): Response
    {
        return Inertia::render('dashboard/about-stats/edit', [
            'stat' => AboutStatResource::make($aboutStat)->resolve($request),
        ]);
    }

    public function update(AboutStatRequest $request, AboutStat $aboutStat): RedirectResponse
    {
        $aboutStat->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.about-stats.edit',
            'dashboard.about-stats.index',
            $aboutStat,
        );
    }

    public function destroy(AboutStat $aboutStat): RedirectResponse
    {
        $aboutStat->delete();

        return to_route('dashboard.about-stats.index');
    }
}
