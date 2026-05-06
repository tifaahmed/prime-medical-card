<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Translatable\HasTranslations;

class Membership extends Model implements HasMedia
{
    use HasFactory;
    use HasSlug;
    use HasTranslations;
    use InteractsWithMedia;
    use SoftDeletes;

    /**
     * The attributes that are translatable.
     *
     * @var array<int, string>
     */
    public $translatable = ['job_title'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'membership_number',
        'slug',
        'registration_date',
        'expiration_date',
        'is_active',
        'is_visible',
        'job_title',
    ];

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('membership_number')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'registration_date' => 'datetime',
            'expiration_date' => 'datetime',
            'is_active' => 'boolean',
            'is_visible' => 'boolean',
        ];
    }

    /**
     * Get the user that owns the membership.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the family members for the membership.
     */
    public function family(): HasMany
    {
        return $this->hasMany(MembershipFamily::class);
    }

    /**
     * Scope a query to only include active memberships.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include inactive memberships.
     */
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope a query to only include visible memberships.
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    /**
     * Scope a query to only include hidden memberships.
     */
    public function scopeHidden($query)
    {
        return $query->where('is_visible', false);
    }

    /**
     * Scope a query to order memberships by creation date descending.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($membership) {
            if ($membership->is_active) {
                static::where('user_id', $membership->user_id)
                    ->where('id', '!=', $membership->id)
                    ->update(['is_active' => false]);
            }
        });
    }
}
