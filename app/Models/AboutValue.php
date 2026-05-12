<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutValue extends Model
{
    protected $fillable = [
        'title',
        'description',
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
