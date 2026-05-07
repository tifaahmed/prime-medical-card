<?php

namespace App\Traits;

trait MediaImageTrait
{
    public function getAvatarAttribute(): string
    {
        $media = $this->getFirstMedia('avatar');

        return $media ? $media->getUrl() : '';
    }

    public function getImageAttribute(): string
    {
        $media = $this->getFirstMedia('image');

        return $media ? $media->getUrl() : '';
    }

    public function getThumbnailAttribute(): string
    {
        $media = $this->getFirstMedia('thumbnail');

        return $media ? $media->getUrl() : '';
    }

    public function getLogoAttribute(): string
    {
        $media = $this->getFirstMedia('logo');

        return $media ? $media->getUrl() : '';
    }

    public function getHeaderAttribute(): string
    {
        $media = $this->getFirstMedia('header');

        return $media ? $media->getUrl() : '';
    }

    public function getPhotoAttribute(): string
    {
        $media = $this->getFirstMedia('photo');

        return $media ? $media->getUrl() : '';
    }

    public function getGalleryAttribute(): array
    {
        return $this->getMedia('gallery')
            ->map(fn ($m) => ['id' => $m->id, 'url' => $m->getUrl()])
            ->toArray();
    }
}
