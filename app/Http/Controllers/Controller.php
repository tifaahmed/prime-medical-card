<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

abstract class Controller
{
    /**
     * Redirect after a save action, honoring the dashboard "save & stay"
     * vs "save & return" intent. Also flashes a toast so the dashboard
     * Sonner Toaster shows a confirmation message.
     *
     * The intent is read from the `redirect` input ("stay" keeps the user
     * on the edit page, anything else sends them back to the resource
     * index).
     */
    protected function redirectAfterSave(
        Request $request,
        string $editRouteName,
        string $indexRouteName,
        Model $model,
        string $message = 'Saved successfully.',
    ): RedirectResponse {
        Inertia::flash('toast', [
            'type' => 'success',
            'message' => $message,
        ]);

        if ($request->input('redirect') === 'stay') {
            return to_route($editRouteName, $model);
        }

        return to_route($indexRouteName);
    }
}
