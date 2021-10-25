<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;


class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     return Inertia::render('Article/index', [
    //         'filters' => Request::all('search', 'role', 'trashed'),
    //         'articles' => Article::filter(Request::only('search', 'role', 'trashed'))->get()
    //             ->transform(fn ($article) => [
    //                 'id' => $article->id,
    //                 'title' => $article->name,
    //                 // 'body' => $article->body,
    //                 'show_url' => URL::route('showArticle', $article),
    //                 // 'photo' => $user->photo_path ? URL::route('image', ['path' => $user->photo_path, 'w' => 40, 'h' => 40, 'fit' => 'crop']) : null,
    //             ]),
    //     ]);
    // }

    public function index()
    {
       
        return Inertia::render('Article/index', [
            'articles' => Article::all()->map(function ($article) {
                $user = $article->user()->get();
                $category = $article->category()->get();
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    // 'user_id' => $article->user_id,
                    'user_id' => $article->user()->get(),
                    // 'category_id' => $article->category_id,
                    'category_id' => $article->category()->get(),
                    'show_url' => URL::route('showArticle', $article),
                ];
            }),
            //'create_url' => URL::route('showArticle'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function create()
    {
        $categories = Category::orderBy('sort_no')->get();

        return Inertia::render('Article/create',['user' => Auth::user(), 'category'=> $categories]);  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function showArticle(Article $article)
    {
        $user = $article->user()->get();
        $category = $article->category()->get();

        //return Inertia::render('Article/showArticle',['article' => $article]);
        return Inertia::render('Article/showArticle', [
            'article' => [
                'title' => $article->title,
                'body' => $article->body,
                'pic1' => $article->pic1,
                // 'user_id' => $article->user_id,
                'user_id' => $user,
                // 'category_id' => $article->category_id,
                'category_id' => $category,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        //
    }
}
