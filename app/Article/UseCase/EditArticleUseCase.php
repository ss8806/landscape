<?php

namespace App\Article\UseCase;

use App\Models\Article;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

final class EditArticleUseCase
{
  public function handle($id)
  {
    $user = Auth::user();
    $article = Article::find($id);
    $user_id = $article->user()->get();
    $c_name = $article->category()->get();
    $categories = Category::orderBy('sort_no')->get();
    //dd($article);
    if ($user->id === $article->user_id){
        return 
        [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'body' => $article->body,
                'pic1' => $article->pic1,
                'user_id' => $user_id,
                'c_id' => $article->category_id,
                'c_name' => $c_name,
                'show_url' => URL::route('edit', $article->id),
            ],
            'categories' => $categories
        ];
    } else{
        return App::abort(404); // 404エラーを返す
    }
}
}