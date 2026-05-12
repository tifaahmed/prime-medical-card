<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeFeaturedOffer extends Model
{
    protected $fillable = [
        'title',
        'partner',
        'description',
        'discount',
        'expires_text',
        'tag',
        'accent_color',
        'is_published',
        'position',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'position' => 'integer',
        ];
    }
}
