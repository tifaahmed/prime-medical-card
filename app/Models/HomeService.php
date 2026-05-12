<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeService extends Model
{
    protected $fillable = [
        'title',
        'description',
        'discount',
        'icon_key',
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
