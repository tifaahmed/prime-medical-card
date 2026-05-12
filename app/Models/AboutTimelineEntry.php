<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutTimelineEntry extends Model
{
    protected $table = 'about_timeline';

    protected $fillable = [
        'year',
        'title',
        'description',
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
