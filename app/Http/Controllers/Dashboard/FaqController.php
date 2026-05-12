<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\FaqRequest;
use App\Http\Resources\Dashboard\FaqResource;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $faqs = Faq::query()
            ->when($search, fn ($q) => $q->where('question', 'like', "%{$search}%"))
            ->orderBy('position')
            ->orderBy('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn ($faq) => FaqResource::make($faq)->resolve($request));

        return Inertia::render('dashboard/faqs/index', [
            'faqs' => $faqs,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/faqs/create');
    }

    public function store(FaqRequest $request): RedirectResponse
    {
        $faq = Faq::create($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.faqs.edit',
            'dashboard.faqs.index',
            $faq,
        );
    }

    public function edit(Request $request, Faq $faq): Response
    {
        return Inertia::render('dashboard/faqs/edit', [
            'faq' => FaqResource::make($faq)->resolve($request),
        ]);
    }

    public function update(FaqRequest $request, Faq $faq): RedirectResponse
    {
        $faq->update($request->validated());

        return $this->redirectAfterSave(
            $request,
            'dashboard.faqs.edit',
            'dashboard.faqs.index',
            $faq,
        );
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return to_route('dashboard.faqs.index');
    }
}
