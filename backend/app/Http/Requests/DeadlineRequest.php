<?php

namespace App\Http\Requests;

use App\Rules\Kana;
use App\Rules\PhoneNumber;
use App\Rules\RoomBelongsToBuilding;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => '企業名',
        ];
    }

    public function messages ()
    {
        return [
            'name.required_if' => ':attributeは必須項目です',
        ];
    }
}
