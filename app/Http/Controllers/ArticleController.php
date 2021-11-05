<?php

namespace App\Http\Controllers;

use App\Models\Article;
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
    // ポリシーを設定したがうまくいかなかった
    // public function __construct()
    // {
    //     $user = auth()->user();
    //     $this->middleware('can:, article')->only([
    //         'edit','update','destroy'
    //     ]);
    // }

    // public function __construct()
    // {
    // $this->authorizeResource(Article::class, 'article');
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {  
        $categories = Category::orderBy('sort_no')->get();
        $articles = Article::orderBy('id', 'desc')->get();
        return Inertia::render('Article/index',
        [  
            'success' => session('success'),
            'categories' => $categories,
            'articles' => $articles->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    'c_id' => $article->category_id,
                    'c_name' => $article->category()->get(),
                    'create' => $article->created_at,
                    'show_url' => URL::route('show', $article->id),
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
        return Inertia::render('Article/Create',['categories' => $categories]);  
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
        return redirect()->route('articles')->with('success', __('Registered'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article, $id)
    {
        $article = Article::find($id);
        $user_id = $article->user()->get();
        $category_id = $article->category()->get();
        $initial_is_liked= $article->isLiked(Auth::user());
        $endpoint = route('like', $article);
        //dd($initial_is_liked);
        //dd($endpoint);


        //return Inertia::render('Article/show',['article' => $article]);
        return Inertia::render('Article/Show', 
        [       
            'success' => session('success'),
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'body' => $article->body,
                'pic1' => $article->pic1,
                'user_id' => $user_id,
                'category_id' => $category_id,
                'initial_is_liked' => $initial_is_liked,
                'endpoint' => $endpoint,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article, $id)
    {
        $user = Auth::user();
        $article = Article::find($id);
        $user_id = $article->user()->get();
        $category_id = $article->category()->get();
        $categories = Category::orderBy('sort_no')->get();
        //dd($article);
        if ($user->id === $article->user_id){
            return Inertia::render('Article/Edit',[
                'article' => [
                    'id' => $article->id,
                    'title' => $article->title,
                    'body' => $article->body,
                    'pic1' => $article->pic1,
                    'user_id' => $user_id,
                    'c_id' => $article->category_id,
                    'category_id' => $category_id,
                    'show_url' => URL::route('edit', $article->id),
                ],
                'categories' => $categories
            ]);
        } else{
            return App::abort(404); // 404エラーを返す
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        // dd($article);
        $article->fill($request->all())->update();
        return redirect()->route('mypage')->with('success', __('Edited'));
        
        // articles()->save($article->fill($request->all()));
        // return redirect('/')->with('flash_message', __('Registered.'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article, $id)
    {
        Article::find($id)->delete();
        return redirect()->route('mypage')->with('success', __('Deleted'));
        // return Redirect::route('mypage')->with('flash_message', __('Deleted.'));
    }

     public function like(Request $request, Article $article)
    {
        //モデルを結びつけている中間テーブルにレコードを削除する。 
        //$article->likes()->detach($request->user()->id);
        // モデルを結びつけている中間テーブルにレコードを挿入する。
        $article->likes()->attach($request->user()->id);

        return ['success', __('Liked')];
    }

    // 気になるリストから削除する処理
    public function unlike(Request $request, Article $article)
    {
        $article->likes()->detach($request->user()->id);

        return  ['success', __('UnLiked')];
    }   
}
