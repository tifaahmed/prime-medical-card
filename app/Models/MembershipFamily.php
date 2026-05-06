<?php

namespace App\Models;

use App\Enums\MembershipFamily\RelationshipEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class MembershipFamily extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'membership_id',
        'name',
        'relationship',
        'date_of_birth',
        'phone',
        'email',
        'photo_path',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'is_active' => 'boolean',
        'relationship' => RelationshipEnum::class,
    ];

    /**
     * Get the membership this family member belongs to.
     */
    public function membership(): BelongsTo
    {
        return $this->belongsTo(Membership::class);
    }

    /**
     * Get the main user (membership owner) through the membership.
     */
    public function getOwnerAttribute()
    {
        return $this->membership?->user;
    }
}
