<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CardTemplateSeeder::class,
            // SuperAdminSeeder::class,
            // GovernorateSeeder::class,
            // CitySeeder::class,
            // FacilityTypeSeeder::class,
            // EgyptianFacilitySeeder::class,
            // OfferSeeder::class,
            // PageSeoSeeder::class,
            // FaqSeeder::class,
            // SiteSettingSeeder::class,
            // TestimonialSeeder::class,
            // PricingPlanSeeder::class,
            // HomeServiceSeeder::class,
            // HomeStepSeeder::class,
            // HomeFeaturedOfferSeeder::class,
            // AboutContentSeeder::class,
            // PageContentSeeder::class,
        ]);
    }
}
