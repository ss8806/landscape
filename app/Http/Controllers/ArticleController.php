<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
// use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;



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
    //                 'show_url' => URL::route('show', $article),
    //                 // 'photo' => $user->photo_path ? URL::route('image', ['path' => $user->photo_path, 'w' => 40, 'h' => 40, 'fit' => 'crop']) : null,
    //             ]),
    //     ]);
    // }

    public function index()
    {
       
        return Inertia::render('Article/index', [
            'articles' => Article::all()->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    //'user_id' => $article->user()->get(),
                    'category_id' => $article->category()->get(),
                    'show_url' => URL::route('show', $article),
                ];
            }),
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
        return Inertia::render('Article/create',['categories' => $categories]);  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = new Article;
        Auth::user()->articles()->save($article->fill($request->all()));
        return redirect('/')->with('flash_message', __('Registered.'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $user_id = $article->user()->get();
        $category_id = $article->category()->get();

        //return Inertia::render('Article/show',['article' => $article]);
        return Inertia::render('Article/show', [
            'article' => [
                'title' => $article->title,
                'body' => $article->body,
                'pic1' => $article->pic1,
                'user_id' => $user_id,
                'category_id' => $category_id,
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
        $user_id = $article->user()->get();
        $category_id = $article->category()->get();
        $categories = Category::orderBy('sort_no')->get();

        return Inertia::render('Article/edit',[
            'article' => [
                'title' => $article->title,
                'body' => $article->body,
                'pic1' => $article->pic1,
                'user_id' => $user_id,
                'category_id' => $category_id,
            ],
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article, $id)
    {
        $article = Article::find($id);
        Auth::user()->articles()->save($article->fill($request->all() ));

        //$article->fill($request->all())->save();

        return redirect('/')->with('flash_message', __('Registered.'));
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
