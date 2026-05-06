<?php

namespace App\Models;

use App\Traits\MediaImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Facility extends Model implements HasMedia
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
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'facility_type_id',
        'governorate_id',
        'phone',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the facility type that owns the facility.
     */
    public function facilityType(): BelongsTo
    {
        return $this->belongsTo(FacilityType::class);
    }

    /**
     * Get the governorate that owns the facility.
     */
    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    /**
     * Get the branches for the facility.
     */
    public function branches(): HasMany
    {
        return $this->hasMany(FacilityBranch::class);
    }

    /**
     * Get all of the facility's offers.
     */
    public function offers(): MorphMany
    {
        return $this->morphMany(Offer::class, 'offerable');
    }
}
