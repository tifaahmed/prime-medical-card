<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SiteSettingRequest;
use App\Http\Resources\Dashboard\SiteSettingResource;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(Request $request): Response
    {
        $settings = SiteSetting::current();

        return Inertia::render('dashboard/site-settings/edit', [
            'settings' => SiteSettingResource::make($settings)->resolve($request),
        ]);
    }

    public function update(SiteSettingRequest $request): RedirectResponse
    {
        $settings = SiteSetting::current();
        $settings->fill($request->validated())->save();

        return $this->redirectAfterSave(
            $request,
            'dashboard.site-settings.edit',
            'dashboard.site-settings.edit',
            $settings,
        );
    }
}
