<?php

namespace Database\Seeders;

use App\Models\Facility;
use App\Models\FacilityBranch;
use App\Models\FacilityType;
use App\Models\Governorate;
use App\Models\Offer;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $governorates = Governorate::query()->get();
        if ($governorates->isEmpty()) {
            $governorates = Governorate::factory()->count(5)->create();
        }

        $types = FacilityType::query()->get();
        if ($types->isEmpty()) {
            $types = FacilityType::factory()->count(5)->create();
        }

        $facilities = collect();
        foreach ($types as $type) {
            $facilities = $facilities->merge(
                Facility::factory()
                    ->count(3)
                    ->state(fn () => [
                        'facility_type_id' => $type->id,
                    ])
                    ->create()
            );
        }

        foreach ($facilities as $facility) {
            FacilityBranch::factory()
                ->count(rand(1, 3))
                ->for($facility)
                ->state(fn () => [
                    'governorate_id' => $governorates->random()->id,
                ])
                ->create();

            Offer::factory()
                ->count(rand(1, 4))
                ->state([
                    'offerable_id' => $facility->id,
                    'offerable_type' => Facility::class,
                ])
                ->create();
        }
    }
}
