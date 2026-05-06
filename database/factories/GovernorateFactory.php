<?php

namespace Database\Factories;

use App\Models\Governorate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Governorate>
 */
class GovernorateFactory extends Factory
{
    protected $model = Governorate::class;

    public function definition(): array
    {
        $en = $this->faker->unique()->city();

        return [
            'name' => [
                'en' => $en,
                'ar' => 'محافظة '.$en,
            ],
        ];
    }
}
