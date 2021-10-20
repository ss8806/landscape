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
                // 'editIcon' => ['file', 'image'],
                'editName' => ['min:5','max:15'],
                'editEmail' =>['string','max:100','email'],           
        ];
    }

    public function attributes()
    {
        return [
            'editName'        => '名前',
        ];
    }
}
