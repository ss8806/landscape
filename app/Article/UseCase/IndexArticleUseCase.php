<?php

namespace App\Article\UseCase;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


final class IndexArticleUseCase
{
    public function handle()
    { 
        try {
            $categories = Category::orderBy('sort_no')->get();
            $articles = Article::orderBy('id', 'desc')->get()->transform(function ($article) {
                return 
                [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    'c_id' => $article->category_id,
                    'c_name' => $article->category()->get(),
                    'create' => $article->created_at,
                    'show_url' => URL::route('show', $article->id),
                ];
            });

            // $articles = Article::orderBy('id', 'desc')->paginate(5)
            // ->withQueryString()->through(fn ($article) => [
            //         'id' => $article->id,
            //         'title' => $article->title,
            //         'body' => $article->body,
            //         'pic1' => $article->pic1,
            //         'c_id' => $article->category_id,
            //         'c_name' => $article->category()->get(),
            //         'create' => $article->created_at,
            //         'show_url' => URL::route('show', $article->id),
            //     ]);
            return
            [  
                'success' => session('success'),
                'categories' => $categories,
                'articles' => $articles,
            ];
        } 
        catch (\Exception $e) {
            Log::error($e->getMessage());
            throw ValidationException::withMessages([
            'url' => 'エラー'
        ]);
        }
    }
}