<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CityRequest;
use App\Http\Resources\Dashboard\CityResource;
use App\Http\Resources\Dashboard\GovernorateResource;
use App\Models\City;
use App\Models\Governorate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $cities = City::query()
            ->with('governorate')
            ->when($search, fn ($q) => $q->where('slug', 'like', "%{$search}%"))
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($city) => CityResource::make($city)->resolve($request));

        return Inertia::render('dashboard/cities/index', [
            'cities' => $cities,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('dashboard/cities/create', [
            'governorates' => $this->governorateOptions($request),
        ]);
    }

    public function store(CityRequest $request): RedirectResponse
    {
        $city = City::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.cities.edit',
            'dashboard.cities.index',
            $city,
        );
    }

    public function edit(Request $request, City $city): Response
    {
        return Inertia::render('dashboard/cities/edit', [
            'city' => CityResource::make($city)->resolve($request),
            'governorates' => $this->governorateOptions($request),
        ]);
    }

    public function update(CityRequest $request, City $city): RedirectResponse
    {
        $city->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.cities.edit',
            'dashboard.cities.index',
            $city,
        );
    }

    public function destroy(City $city): RedirectResponse
    {
        $city->delete();

        return to_route('dashboard.cities.index');
    }

    private function governorateOptions(Request $request): array
    {
        return Governorate::query()
            ->orderBy('id')
            ->get()
            ->map(fn ($gov) => GovernorateResource::make($gov)->resolve($request))
            ->all();
    }
}
