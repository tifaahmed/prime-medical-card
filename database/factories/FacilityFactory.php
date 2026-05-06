<?php

namespace Database\Factories;

use App\Models\Facility;
use App\Models\FacilityType;
use App\Models\Governorate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Facility>
 */
class FacilityFactory extends Factory
{
    protected $model = Facility::class;

    public function definition(): array
    {
        $en = $this->faker->unique()->company();

        return [
            'name' => [
                'en' => $en,
                'ar' => $en,
            ],
            'facility_type_id' => FacilityType::factory(),
            'governorate_id' => Governorate::factory(),
        ];
    }
}
