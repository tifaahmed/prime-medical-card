<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class CardTemplate extends Model implements HasMedia
{
    use HasSlug;
    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'layout',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'layout' => 'array',
            'is_default' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function frontEmptyUrl(): ?string
    {
        return $this->getFirstMediaUrl('front_empty') ?: null;
    }

    public function frontExampleUrl(): ?string
    {
        return $this->getFirstMediaUrl('front_example') ?: null;
    }

    public function backUrl(): ?string
    {
        return $this->getFirstMediaUrl('back') ?: null;
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('front_empty')->singleFile();
        $this->addMediaCollection('front_example')->singleFile();
        $this->addMediaCollection('back')->singleFile();
    }

    public static function getDefault(): ?self
    {
        return static::where('is_default', true)->first();
    }
}
