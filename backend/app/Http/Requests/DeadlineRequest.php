<?php

namespace App\Http\Requests;

use App\Rules\Kana;
use App\Rules\PhoneNumber;
use App\Rules\RoomBelongsToBuilding;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DeadlineRequest extends FormRequest
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
            'date' => ['required', 'date'],
            'type' => ['required', 'integer'],
            'status' => ['required', 'integer'],
            'result' => ['required', 'integer'],
            'company_id' => ['required', 'integer'],
            'my_page_id' => ['required', 'integer'],
        ];
    }

    public function attributes()
    {
        return [
            'date' => '締切日',
            'type' => '種類',
            'status' => '進捗状況',
            'result' => '結果',
        ];
    }

    public function messages ()
    {
        return [
            'date.required' => ':attributeは必須項目です',
            'type.required' => ':attributeは必須項目です',
            'status.required' => ':attributeは必須項目です',
            'result.required' => ':attributeは必須項目です',
        ];
    }
}
