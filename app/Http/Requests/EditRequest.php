<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'editIcon'  => 'require|file|image',
            'editName'  => 'min:5|max:100',
            'editEmail' => 'min:1|max:30|email',
            'editPassword' => 'min:4|max:20|email',
        ];
    }

    public function attributes()
    {
        return [
            'editIcon'  => 'アイコン',
            'editName'  => '名前',
            'editEmail'  => 'メールアドレス',
            'editPassword'  => 'パスワード',
        ];
    }
}
