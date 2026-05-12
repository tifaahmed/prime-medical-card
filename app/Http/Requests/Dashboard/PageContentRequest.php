<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageContentRequest extends FormRequest
{
    public const PAGES = ['home', 'about', 'partners', 'contact'];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('page_content')?->id;

        return [
            'page' => ['required', 'in:'.implode(',', self::PAGES)],
            'section' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9_]+$/i'],
            'key' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9_]+$/i'],
            'value' => ['nullable', 'string', 'max:20000'],
            'is_rich' => ['nullable', 'boolean'],
            'uniq' => [
                Rule::unique('page_contents')
                    ->where(fn ($q) => $q
                        ->where('page', $this->input('page'))
                        ->where('section', $this->input('section'))
                        ->where('key', $this->input('key')))
                    ->ignore($id),
            ],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_rich' => $this->boolean('is_rich'),
            'uniq' => 1,
        ]);
    }

    public function messages(): array
    {
        return [
            'section.regex' => 'القسم يجب أن يحتوي على حروف وأرقام و _ فقط.',
            'key.regex' => 'المفتاح يجب أن يحتوي على حروف وأرقام و _ فقط.',
            'uniq.unique' => 'يوجد محتوى بنفس (الصفحة، القسم، المفتاح).',
        ];
    }
}
