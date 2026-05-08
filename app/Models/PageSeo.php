<?php

namespace App\Models;

use App\Traits\MediaImageTrait;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class PageSeo extends Model implements HasMedia
{
    use HasTranslations;
    use InteractsWithMedia;
    use MediaImageTrait;

    public $translatable = ['title', 'description'];

    protected $fillable = [
        'page_key',
        'title',
        'description',
        'keywords',
        'noindex',
    ];

    protected function casts(): array
    {
        return [
            'keywords' => 'array',
            'noindex' => 'boolean',
        ];
    }
}
