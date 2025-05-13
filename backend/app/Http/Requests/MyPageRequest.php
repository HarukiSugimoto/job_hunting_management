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
            'status' => ['required', 'integer'],
            'pritority' => ['required', 'integer'],
            'company_id' => ['required', 'integer'],
            'user_id' => ['required', 'integer'],
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
