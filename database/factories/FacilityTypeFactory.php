<?php

namespace Database\Factories;

use App\Models\FacilityType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FacilityType>
 */
class FacilityTypeFactory extends Factory
{
    protected $model = FacilityType::class;

    public function definition(): array
    {
        $en = $this->faker->unique()->randomElement([
            'Hospital', 'Clinic', 'Pharmacy', 'Laboratory', 'Radiology Center',
            'Dental Center', 'Optical Center', 'Physiotherapy Center',
        ]);

        return [
            'name' => [
                'en' => $en,
                'ar' => $en,
            ],
        ];
    }
}
