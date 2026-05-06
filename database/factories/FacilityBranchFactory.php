<?php

namespace Database\Factories;

use App\Models\Facility;
use App\Models\FacilityBranch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FacilityBranch>
 */
class FacilityBranchFactory extends Factory
{
    protected $model = FacilityBranch::class;

    public function definition(): array
    {
        $en = $this->faker->streetName();
        $address = $this->faker->address();

        return [
            'facility_id' => Facility::factory(),
            'name' => [
                'en' => $en.' Branch',
                'ar' => 'فرع '.$en,
            ],
            'address' => [
                'en' => $address,
                'ar' => $address,
            ],
            'phone' => [$this->faker->phoneNumber(), $this->faker->phoneNumber()],
        ];
    }
}
