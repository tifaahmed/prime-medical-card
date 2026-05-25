<?php

namespace App\Http\Middleware;

use App\Http\Resources\Guest\SiteSettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $appUrl = rtrim(config('app.url', $request->getSchemeAndHttpHost()), '/');

        $parentShare = parent::share($request);

        Log::info('[HandleInertiaRequests] Sharing errors', [
            'url' => $request->path(),
            'method' => $request->method(),
            'inertia' => $request->header('X-Inertia'),
            'inertia_version' => $request->header('X-Inertia-Version'),
            'inertia_partial_component' => $request->header('X-Inertia-Partial-Component'),
            'inertia_partial_data' => $request->header('X-Inertia-Partial-Data'),
            'referer' => $request->header('referer'),
            'errors' => $parentShare['errors'] ?? 'no-errors-key',
            'session_errors_exist' => $request->session()->has('errors'),
        ]);

        return [
            ...$parentShare,
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'appUrl' => $appUrl,
            'currentUrl' => '/'.ltrim($request->path(), '/'),
            'flash' => [
                'contact_submitted' => fn () => $request->session()->get('contact_submitted'),
            ],
            'siteSettings' => fn () => SiteSettingResource::make(SiteSetting::current())->resolve($request),
        ];
    }
}
