<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('guest/welcome');
    }

    public function about(): Response
    {
        return Inertia::render('guest/about');
    }

    public function services(): Response
    {
        return Inertia::render('guest/services');
    }

    public function serviceDetail(string $id): Response
    {
        return Inertia::render('guest/service-detail', ['id' => $id]);
    }

    public function partners(): Response
    {
        return Inertia::render('guest/partners');
    }

    public function partnerDetail(string $id): Response
    {
        return Inertia::render('guest/partner-detail', ['id' => $id]);
    }

    public function contact(): Response
    {
        return Inertia::render('guest/contact');
    }

    public function memberCard(string $number): Response
    {
        return Inertia::render('guest/member-card', ['number' => $number]);
    }
}
