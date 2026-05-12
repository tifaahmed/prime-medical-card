<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'period',
        'features',
        'badge',
        'is_featured',
        'cta_label',
        'cta_variant',
        'is_published',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'position' => 'integer',
        ];
    }
}
