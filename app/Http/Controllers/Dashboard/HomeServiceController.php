<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\HomeServiceRequest;
use App\Http\Resources\Dashboard\HomeServiceResource;
use App\Models\HomeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = HomeService::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%"))
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($r) => HomeServiceResource::make($r)->resolve($request));

        return Inertia::render('dashboard/home-services/index', [
            'services' => $items,
            'filters' => ['search' => $search],
            'iconKeys' => HomeServiceRequest::ICON_KEYS,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/home-services/create', [
            'iconKeys' => HomeServiceRequest::ICON_KEYS,
        ]);
    }

    public function store(HomeServiceRequest $request): RedirectResponse
    {
        $row = HomeService::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-services.edit',
            'dashboard.home-services.index',
            $row,
        );
    }

    public function edit(Request $request, HomeService $homeService): Response
    {
        return Inertia::render('dashboard/home-services/edit', [
            'service' => HomeServiceResource::make($homeService)->resolve($request),
            'iconKeys' => HomeServiceRequest::ICON_KEYS,
        ]);
    }

    public function update(HomeServiceRequest $request, HomeService $homeService): RedirectResponse
    {
        $homeService->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.home-services.edit',
            'dashboard.home-services.index',
            $homeService,
        );
    }

    public function destroy(HomeService $homeService): RedirectResponse
    {
        $homeService->delete();

        return to_route('dashboard.home-services.index');
    }
}
