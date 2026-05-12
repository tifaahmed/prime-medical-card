<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageContent extends Model
{
    protected $fillable = [
        'page',
        'section',
        'key',
        'value',
        'is_rich',
    ];

    protected function casts(): array
    {
        return [
            'is_rich' => 'boolean',
        ];
    }

    /**
     * Get a flat map of "section.key" => value for the given page.
     *
     * @return array<string, array{value: string|null, is_rich: bool}>
     */
    public static function mapFor(string $page): array
    {
        return static::query()
            ->where('page', $page)
            ->get(['section', 'key', 'value', 'is_rich'])
            ->mapWithKeys(fn (PageContent $row) => [
                "{$row->section}.{$row->key}" => [
                    'value' => $row->value,
                    'is_rich' => $row->is_rich,
                ],
            ])
            ->all();
    }
}
