<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PageSeoRequest;
use App\Http\Resources\Dashboard\PageSeoResource;
use App\Models\PageSeo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageSeoController extends Controller
{
    private const PAGE_LABELS = [
        'home' => 'Home',
        'about' => 'About',
        'partners' => 'Partners',
        'contact' => 'Contact',
    ];

    private const PAGE_PATHS = [
        'home' => '/',
        'about' => '/about',
        'partners' => '/partners',
        'contact' => '/contact',
    ];

    public function index(Request $request): Response
    {
        $rows = PageSeo::with('media')
            ->whereIn('page_key', array_keys(self::PAGE_LABELS))
            ->get()
            ->keyBy('page_key');

        $pages = collect(self::PAGE_LABELS)
            ->map(function (string $label, string $key) use ($rows, $request) {
                $row = $rows->get($key);

                return [
                    'page_key' => $key,
                    'label' => $label,
                    'path' => self::PAGE_PATHS[$key],
                    'seo' => $row
                        ? PageSeoResource::make($row)->resolve($request)
                        : null,
                ];
            })
            ->values()
            ->all();

        return Inertia::render('dashboard/page-seos/index', [
            'pages' => $pages,
        ]);
    }

    public function edit(Request $request, PageSeo $pageSeo): Response
    {
        $pageSeo->load('media');

        return Inertia::render('dashboard/page-seos/edit', [
            'page' => [
                'page_key' => $pageSeo->page_key,
                'label' => self::PAGE_LABELS[$pageSeo->page_key] ?? $pageSeo->page_key,
                'path' => self::PAGE_PATHS[$pageSeo->page_key] ?? null,
                'seo' => PageSeoResource::make($pageSeo)->resolve($request),
            ],
        ]);
    }

    public function update(PageSeoRequest $request, PageSeo $pageSeo): RedirectResponse
    {
        $data = $request->validated();
        $image = $request->file('og_image');
        $imageRemove = (bool) ($data['og_image_remove'] ?? false);
        unset($data['og_image'], $data['og_image_remove']);

        $pageSeo->update($data);
        $this->syncOgImage($pageSeo, $image, $imageRemove);

        return $this->redirectAfterSave(
            $request,
            'dashboard.page-seos.edit',
            'dashboard.page-seos.index',
            $pageSeo,
        );
    }

    private function syncOgImage(PageSeo $pageSeo, $image, bool $remove): void
    {
        if ($remove || $image) {
            $pageSeo->clearMediaCollection('image');
        }

        if ($image) {
            $pageSeo->addMedia($image->getRealPath())
                ->usingFileName($image->getClientOriginalName())
                ->toMediaCollection('image');
        }
    }
}
