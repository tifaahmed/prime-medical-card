<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $messages = ContactMessage::query()
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('name', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString()
            ->through(fn (ContactMessage $m) => [
                'id' => $m->id,
                'name' => $m->name,
                'phone' => $m->phone,
                'subject' => $m->subject,
                'is_read' => (bool) $m->is_read,
                'created_at' => $m->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('dashboard/contact-messages/index', [
            'messages' => $messages,
            'filters' => ['search' => $search],
            'unreadCount' => ContactMessage::where('is_read', false)->count(),
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage): RedirectResponse
    {
        $data = $request->validate([
            'is_read' => ['required', 'boolean'],
        ]);

        $contactMessage->update($data);

        return back();
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $contactMessage->delete();

        return to_route('dashboard.contact-messages.index');
    }
}
