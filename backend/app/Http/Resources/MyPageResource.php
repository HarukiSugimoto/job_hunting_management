<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MyPageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'link' => $this->link,
            'login_id' => $this->login_id,
            'priority' => $this->priority,
            'type' => $this->type,
            'company' => new CompanyResource($this->whenLoaded('company')),
        ];
    }
}
