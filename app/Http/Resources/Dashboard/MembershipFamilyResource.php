<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MembershipFamilyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'relationship' => $this->relationship?->value,
            'relationship_label' => $this->relationship?->labels(),
            'date_of_birth' => $this->date_of_birth?->toDateString(),
            'phone' => $this->phone,
            'email' => $this->email,
            'is_active' => (bool) $this->is_active,
            'photo_url' => $this->photo ?: null,
        ];
    }
}
