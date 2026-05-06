<?php

namespace Database\Factories;

use App\Models\Facility;
use App\Models\Offer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Offer>
 */
class OfferFactory extends Factory
{
    protected $model = Offer::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(3);
        $short = $this->faker->sentence(8);
        $full = $this->faker->paragraph(3);
        $oldPrice = $this->faker->randomFloat(2, 100, 1000);
        $price = round($oldPrice * $this->faker->randomFloat(2, 0.4, 0.9), 2);

        return [
            'offerable_id' => Facility::factory(),
            'offerable_type' => Facility::class,
            'title' => ['en' => $title, 'ar' => $title],
            'short_description' => ['en' => $short, 'ar' => $short],
            'full_description' => ['en' => $full, 'ar' => $full],
            'phone' => $this->faker->phoneNumber(),
            'price' => $price,
            'old_price' => $oldPrice,
        ];
    }
}
