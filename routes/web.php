<?php

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/sitemap.xml', function () {
    $appUrl = rtrim(config('app.url', url('/')), '/');
    $today = date('Y-m-d');

    $partnerIds = [
        'salam-international', 'dar-al-fouad', 'cleopatra', 'el-ezaby', 'seif',
        'al-borg', 'al-mokhtabar', 'alfa-labs', 'golden-radiology',
        'diagnostic-imaging', 'smile-dental', 'white-line', 'magrabi',
        'el-mohandes', 'physio-care', 'rehab-plus',
    ];

    $serviceIds = [
        'clinics', 'pharmacy', 'labs', 'radiology', 'dental',
        'optics', 'mental', 'physio',
    ];

    $urls = [
        ['loc' => "$appUrl/", 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['loc' => "$appUrl/about", 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['loc' => "$appUrl/services", 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => "$appUrl/partners", 'priority' => '0.9', 'changefreq' => 'weekly'],
        ['loc' => "$appUrl/contact", 'priority' => '0.7', 'changefreq' => 'monthly'],
    ];

    foreach ($serviceIds as $id) {
        $urls[] = ['loc' => "$appUrl/services/$id", 'priority' => '0.8', 'changefreq' => 'monthly'];
    }
    foreach ($partnerIds as $id) {
        $urls[] = ['loc' => "$appUrl/partners/$id", 'priority' => '0.7', 'changefreq' => 'monthly'];
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";
    foreach ($urls as $u) {
        $xml .= "  <url>\n";
        $xml .= "    <loc>{$u['loc']}</loc>\n";
        $xml .= "    <lastmod>$today</lastmod>\n";
        $xml .= "    <changefreq>{$u['changefreq']}</changefreq>\n";
        $xml .= "    <priority>{$u['priority']}</priority>\n";
        $xml .= "  </url>\n";
    }
    $xml .= '</urlset>';

    return Response::make($xml, 200, ['Content-Type' => 'application/xml']);
})->name('sitemap');

Route::inertia('/about', 'guest/about')->name('about');
Route::inertia('/services', 'guest/services')->name('services');
Route::get('/services/{id}', function (string $id) {
    return inertia('guest/service-detail', ['id' => $id]);
})->name('service.show');
Route::inertia('/partners', 'guest/partners')->name('partners');
Route::get('/partners/{id}', function (string $id) {
    return inertia('guest/partner-detail', ['id' => $id]);
})->name('partner.show');
Route::inertia('/contact', 'guest/contact')->name('contact');

Route::get('/card/{number}', function (string $number) {
    return inertia('guest/member-card', ['number' => $number]);
})->where('number', '[0-9]+')->name('member.card');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
