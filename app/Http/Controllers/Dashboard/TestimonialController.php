<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TestimonialRequest;
use App\Http\Resources\Dashboard\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = Testimonial::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%"))
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($r) => TestimonialResource::make($r)->resolve($request));

        return Inertia::render('dashboard/testimonials/index', [
            'testimonials' => $items,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/testimonials/create');
    }

    public function store(TestimonialRequest $request): RedirectResponse
    {
        $row = Testimonial::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.testimonials.edit',
            'dashboard.testimonials.index',
            $row,
        );
    }

    public function edit(Request $request, Testimonial $testimonial): Response
    {
        return Inertia::render('dashboard/testimonials/edit', [
            'testimonial' => TestimonialResource::make($testimonial)->resolve($request),
        ]);
    }

    public function update(TestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.testimonials.edit',
            'dashboard.testimonials.index',
            $testimonial,
        );
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return to_route('dashboard.testimonials.index');
    }
}
