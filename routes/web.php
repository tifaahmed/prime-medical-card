<?php

use App\Http\Controllers\Dashboard\AboutStatController;
use App\Http\Controllers\Dashboard\CardTemplateController;
use App\Http\Controllers\Dashboard\AboutTimelineEntryController;
use App\Http\Controllers\Dashboard\AboutValueController;
use App\Http\Controllers\Dashboard\CityController;
use App\Http\Controllers\Dashboard\ContactMessageController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\FacilityBranchController;
use App\Http\Controllers\Dashboard\FacilityController;
use App\Http\Controllers\Dashboard\FacilityTypeController;
use App\Http\Controllers\Dashboard\FaqController;
use App\Http\Controllers\Dashboard\HomeFeaturedOfferController;
use App\Http\Controllers\Dashboard\HomeServiceController;
use App\Http\Controllers\Dashboard\HomeStepController;
use App\Http\Controllers\Dashboard\GovernorateController;
use App\Http\Controllers\Dashboard\MembershipController;
use App\Http\Controllers\Dashboard\OfferController;
use App\Http\Controllers\Dashboard\PageContentController;
use App\Http\Controllers\Dashboard\PageSeoController;
use App\Http\Controllers\Dashboard\PricingPlanController;
use App\Http\Controllers\Dashboard\SiteSettingController;
use App\Http\Controllers\Dashboard\TestimonialController;
use App\Http\Controllers\Guest\GuestController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', [GuestController::class, 'welcome'])->name('home');

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

Route::get('/about', [GuestController::class, 'about'])->name('about');
Route::get('/services', [GuestController::class, 'services'])->name('services');
Route::get('/services/{id}', [GuestController::class, 'serviceDetail'])->name('service.show');
Route::get('/partners', [GuestController::class, 'partners'])->name('partners');
Route::get('/partners/{slug}', [GuestController::class, 'partnerDetail'])->name('partner.show');
Route::get('/contact', [GuestController::class, 'contact'])->name('contact');
Route::post('/contact', [GuestController::class, 'submitContact'])->name('contact.submit');

Route::get('/card/{number}', [GuestController::class, 'memberCard'])
    ->where('number', '[A-Za-z0-9\-]+')
    ->name('member.card');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::resource('governorates', GovernorateController::class)->except('show');
        Route::resource('cities', CityController::class)->except('show');
        Route::resource('facility-types', FacilityTypeController::class)->except('show');
        Route::resource('facilities', FacilityController::class);
        Route::resource('facility-branches', FacilityBranchController::class)->except('show');
        Route::resource('offers', OfferController::class)->except('show');
        Route::get('memberships/{membership}/card', [MembershipController::class, 'card'])->name('memberships.card');
        Route::post('memberships/{membership}/card', [MembershipController::class, 'updateCard'])->name('memberships.card.update');
        Route::post('memberships/{membership}/card/snapshot', [MembershipController::class, 'saveCardSnapshot'])->name('memberships.card.snapshot');
        Route::resource('memberships', MembershipController::class);
        Route::resource('page-seos', PageSeoController::class)->only(['index', 'edit', 'update']);
        Route::resource('card-templates', CardTemplateController::class)->except('show');
        Route::resource('faqs', FaqController::class)->except('show');
        Route::resource('testimonials', TestimonialController::class)->except('show');
        Route::resource('pricing-plans', PricingPlanController::class)->except('show');
        Route::resource('home-services', HomeServiceController::class)->except('show');
        Route::resource('home-steps', HomeStepController::class)->except('show');
        Route::resource('home-featured-offers', HomeFeaturedOfferController::class)->except('show');
        Route::resource('about-stats', AboutStatController::class)->except('show');
        Route::resource('about-values', AboutValueController::class)->except('show');
        Route::resource('about-timeline', AboutTimelineEntryController::class)->except('show')->parameters(['about-timeline' => 'aboutTimeline']);
        Route::resource('page-contents', PageContentController::class)->except('show');
        Route::get('site-settings', [SiteSettingController::class, 'edit'])->name('site-settings.edit');
        Route::put('site-settings', [SiteSettingController::class, 'update'])->name('site-settings.update');
        Route::resource('contact-messages', ContactMessageController::class)->only(['index', 'update', 'destroy']);
    });
});

require __DIR__.'/settings.php';
