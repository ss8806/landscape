<?php

namespace App\Article\UseCase;

use App\Models\Article;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

final class ShowArticleUseCase
{
    public function handle($id)
    {
        try {
            $article = Article::find($id);
            $user = $article->user()->get();
            $category_id = $article->category()->get();
            $initial_is_liked= $article->isLiked(Auth::user());
            $endpoint = route('like', $article); // web.phpの約43行目のlike 
            //dd($initial_is_liked);
            //dd($endpoint);

            //return Inertia::render('Article/show',['article' => $article]);
            return 
            [       
                'success' => session('success'),
                'article' => [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    'user' => $user,
                    'category_id' => $category_id,
                    'initial_is_liked' => $initial_is_liked,
                    'endpoint' => $endpoint,
                ],
            ];
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw ValidationException::withMessages([
                'url' => 'エラー'
            ]);
        }
    }
}