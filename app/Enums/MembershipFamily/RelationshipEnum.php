<?php

namespace App\Enums\MembershipFamily;

enum RelationshipEnum: string
{
    case WIFE = 'wife';
    case HUSBAND = 'husband';
    case SON = 'son';
    case DAUGHTER = 'daughter';
    case FATHER = 'father';
    case MOTHER = 'mother';
    case BROTHER = 'brother';
    case SISTER = 'sister';

    /**
     * Get all relationship values as array.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Bilingual labels for this relationship.
     *
     * @return array{en: string, ar: string}
     */
    public function labels(): array
    {
        return match ($this) {
            self::WIFE => ['en' => 'Wife', 'ar' => 'زوجة'],
            self::HUSBAND => ['en' => 'Husband', 'ar' => 'زوج'],
            self::SON => ['en' => 'Son', 'ar' => 'ابن'],
            self::DAUGHTER => ['en' => 'Daughter', 'ar' => 'ابنة'],
            self::FATHER => ['en' => 'Father', 'ar' => 'أب'],
            self::MOTHER => ['en' => 'Mother', 'ar' => 'أم'],
            self::BROTHER => ['en' => 'Brother', 'ar' => 'أخ'],
            self::SISTER => ['en' => 'Sister', 'ar' => 'أخت'],
        };
    }

    /**
     * Get options for select dropdowns.
     *
     * @return array<int, array{value: string, label: array{en: string, ar: string}}>
     */
    public static function getOptions(): array
    {
        return array_map(fn (self $case) => [
            'value' => $case->value,
            'label' => $case->labels(),
        ], self::cases());
    }
}
