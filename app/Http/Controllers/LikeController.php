<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\like;
use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LikeController extends Controller
{

    public function showLikes()
    {
        
    }

    public function like(Request $request, Article $article)
    {
        //モデルを結びつけている中間テーブルにレコードを削除する。 
        $article->likes()->detach($request->user()->id);
        // モデルを結びつけている中間テーブルにレコードを挿入する。 
        $article->likes()->attach($request->user()->id);

        return [
            'id' => $article->id,
        ];
    }

    // 気になるリストから削除する処理
    public function unlike(Request $request, Article $article)
    {
        $article->likes()->detach($request->user()->id);

        return [
            'id' => $article->id,
        ];
    }  
}
