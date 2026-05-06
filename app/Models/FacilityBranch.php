<?php

namespace App\Models;

use App\Traits\MediaImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class FacilityBranch extends Model implements HasMedia
{
    use HasFactory;
    use HasSlug;
    use HasTranslations;
    use InteractsWithMedia;
    use MediaImageTrait;

    /**
     * The attributes that are translatable.
     *
     * @var array<int, string>
     */
    public $translatable = [
        'name',
        'address',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'facility_id',
        'name',
        'slug',
        'address',
        'phone',
        'latitude',
        'longitude',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'phone' => 'array',
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom(function ($model) {
                $facility = $model->facility ?? Facility::find($model->facility_id);
                $facilityName = $facility ? $facility->name : '';

                if ($model->name) {
                    return $facilityName.' '.$model->name;
                }

                return $facilityName.' '.($model->address ?? 'branch');
            })
            ->saveSlugsTo('slug');
    }

    /**
     * Get the facility that owns the branch.
     */
    public function facility(): BelongsTo
    {
        return $this->belongsTo(Facility::class);
    }

    /**
     * Get all of the branch's offers.
     */
    public function offers(): MorphMany
    {
        return $this->morphMany(Offer::class, 'offerable');
    }
}
