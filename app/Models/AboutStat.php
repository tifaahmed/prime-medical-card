<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutStat extends Model
{
    protected $fillable = ['value', 'label', 'is_published', 'position'];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'position' => 'integer',
        ];
    }
}
