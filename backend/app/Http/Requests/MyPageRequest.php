<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MyPageRequest extends FormRequest
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
            'link' => ['required', 'string'],
            'login_id' => ['required', 'string'],
            'type' => ['required', 'string'],
            'pritority' => ['required', 'integer'],
            'company_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
        ];
    }

    public function attributes()
    {
        return [
            'link' => 'MyPageのリンク',
            'login_id' => 'MyPageのログインID',
            'type' => '職種',
            'pritority' => '優先度',
        ];
    }

    public function messages ()
    {
        return [
            'link.required' => ':attributeは必須項目です',
            'login_id.required' => ':attributeは必須項目です',
            'type.required' => ':attributeは必須項目です',
            'priority.required' => ':attributeは必須項目です',
        ];
    }
}
