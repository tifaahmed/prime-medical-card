<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PageContentRequest;
use App\Http\Resources\Dashboard\PageContentResource;
use App\Models\PageContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageContentController extends Controller
{
    public function index(Request $request): Response
    {
        $page = $request->string('page')->toString();
        $search = $request->string('search')->toString();

        $items = PageContent::query()
            ->when($page, fn ($q) => $q->where('page', $page))
            ->when($search, fn ($q) => $q->where(function ($qq) use ($search) {
                $qq->where('section', 'like', "%{$search}%")
                    ->orWhere('key', 'like', "%{$search}%");
            }))
            ->orderBy('page')
            ->orderBy('section')
            ->orderBy('key')
            ->paginate(25)
            ->withQueryString()
            ->through(fn ($r) => PageContentResource::make($r)->resolve($request));

        return Inertia::render('dashboard/page-contents/index', [
            'contents' => $items,
            'filters' => ['search' => $search, 'page' => $page],
            'pages' => PageContentRequest::PAGES,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/page-contents/create', [
            'pages' => PageContentRequest::PAGES,
        ]);
    }

    public function store(PageContentRequest $request): RedirectResponse
    {
        $row = PageContent::create($request->only([
            'page', 'section', 'key', 'value', 'is_rich',
        ]));

        return $this->redirectAfterSave(
            $request,
            'dashboard.page-contents.edit',
            'dashboard.page-contents.index',
            $row,
        );
    }

    public function edit(Request $request, PageContent $pageContent): Response
    {
        return Inertia::render('dashboard/page-contents/edit', [
            'content' => PageContentResource::make($pageContent)->resolve($request),
            'pages' => PageContentRequest::PAGES,
        ]);
    }

    public function update(PageContentRequest $request, PageContent $pageContent): RedirectResponse
    {
        $pageContent->update($request->only([
            'page', 'section', 'key', 'value', 'is_rich',
        ]));

        return $this->redirectAfterSave(
            $request,
            'dashboard.page-contents.edit',
            'dashboard.page-contents.index',
            $pageContent,
        );
    }

    public function destroy(PageContent $pageContent): RedirectResponse
    {
        $pageContent->delete();

        return to_route('dashboard.page-contents.index');
    }
}
