<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use App\Article\UseCase\IndexArticleUseCase;
use App\Article\UseCase\ShowArticleUseCase;
use App\Article\UseCase\EditArticleUseCase;
use App\Http\Requests\ArticleRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
// use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


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

    // ファットコントローラー
    public function index(Request $request)
    {  
        // $request_params = $request->all();
        // if ($request_params){
        //     $category = $request_params['category'];
        // }else{
        //     $category = null;
        // }

        $keyword = $request->input('keyword');

        $query = Article::query();
        // カテゴリで絞り込み
        if ($request->filled('category')) {
            $categoryID = $request->input('category');           
            $query->where('category_id', $categoryID);
        }

        // キーワードで絞り込み
        if ($request->filled('keyword')) {
            $keyword = '%' . $this->escape($request->input('keyword')) . '%';
            $query->where(function ($query) use ($keyword) {
                $query->where('title', 'LIKE', $keyword);
            });
        }

        $categories = Category::orderBy('sort_no')->get();
        $artcles = $query->orderBy('id', 'desc')->paginate(8)
        ->withQueryString()->through(fn ($article) => [
            'id' => $article->id,
            'title' => $article->title,
            'body' => $article->body,
            'pic1' => $article->pic1,
            'c_id' => $article->category_id,
            'c_name' => $article->category()->get(),
        ]);
        
        return Inertia::render('Article/index',
        [  
            'success' => session('success'),
            'categories' => $categories,
            'articles' => $artcles ,
            'keyword' => $keyword ,
        ]);
    }

    private function escape(string $value)
    {
        return str_replace(
            ['\\', '%', '_'],
            ['\\\\', '\\%', '\\_'],
            $value
        );
    }

    // useCaseを作成してスリムコントローラー化
    // public function index(IndexArticleUseCase $useCase)
    // {  
    //     $useCase = new IndexArticleUseCase();
    //     return Inertia::render('Article/index',
    //     $useCase->handle([  
    //         'categories',
    //         'articles'
    //     ]));
    // }

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
    public function store(ArticleRequest $request, Article $article)
    {
        try{
            // $article = new Article;
          
            // $file_base64 = $request->input('pic1');
            //  // Base64文字列をデコードしてバイナリに変換
            // list(, $fileData) = explode(';', $file_base64);
            // list(, $fileData) = explode(',', $fileData);
            // $fileData = base64_decode($fileData);
            // // ランダムなファイル名 + 拡張子
            // $fileName = Str::random(20).'.jpg';
            // // // 保存するパスを決める
            // $path = 'mydata/'.$fileName; 

            // // AWS S3 に保存する
            // Storage::disk('s3')->put($path, $fileData);
            
            // DBに保存
            $user = Auth::user();
            $article->user_id   = $user->id;
            $article->title     = $request->input('title');
            $article->category_id     = $request->input('category_id');
            $article->pic1     = $request->input('pic1');
            $article->body     = $request->input('body');
            $article->save();

            // Article::where('id', $request->id)->save(['title' => $request->title]);
            // Article::where('id', $request->id)->save(['body' => $request->body]);
            // Article::where('id', $request->id)->save(['category_id' => $request->category_id]);
            // Article::where('id', $request->id)->save(['pic1' => $fileName]);

            // Auth::user()->articles()->save($article->fill($request->all()));

            return redirect()->route('articles')->with('success', __('Registered'));

        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw ValidationException::withMessages([
                'url' => 'エラー登録できませんでした。'
            ]);
        }

    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    // ファットコントローラー
        // public function show(Article $article, $id)
        // {
        //     $article = Article::find($id);
        //     $user = $article->user()->get();
        //     $category_id = $article->category()->get();
        //     $initial_is_liked= $article->isLiked(Auth::user());
        //     $endpoint = route('like', $article);
        //     //dd($initial_is_liked);
        //     //dd($endpoint);

        //     //return Inertia::render('Article/show',['article' => $article]);
        //     return Inertia::render('Article/Show', 
        //     [       
        //         'success' => session('success'),
        //         'article' => [
        //             'id' => $article->id,
        //             'title' => $article->title,
        //             'body' => $article->body,
        //             'pic1' => $article->pic1,
        //             'user' => $user,
        //             'category_id' => $category_id,
        //             'initial_is_liked' => $initial_is_liked,
        //             'endpoint' => $endpoint,
        //         ],
        //     ]);
        // }

    public function show(ShowArticleUseCase $useCase, $id)
    {
        return Inertia::render('Article/Show',
        $useCase->handle($id, ['article']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */

    // ファットコントローラー
        // public function edit(Article $article, $id)
        // {
        //     $user = Auth::user();
        //     $article = Article::find($id);
        //     $user_id = $article->user()->get();
        //     $c_name = $article->category()->get();
        //     $categories = Category::orderBy('sort_no')->get();
        //     //dd($article);
        //     if ($user->id === $article->user_id){
        //         return Inertia::render('Article/Edit',[
        //             'article' => [
        //                 'id' => $article->id,
        //                 'title' => $article->title,
        //                 'body' => $article->body,
        //                 'pic1' => $article->pic1,
        //                 'user_id' => $user_id,
        //                 'c_id' => $article->category_id,
        //                 'c_name' => $c_name,
        //                 'show_url' => URL::route('edit', $article->id),
        //             ],
        //             'categories' => $categories
        //         ]);
        //     } else{
        //         return App::abort(404); // 404エラーを返す
        //     }
        // }
    // スリム化
    public function edit(EditArticleUseCase $useCase, $id)
    {  
        return Inertia::render('Article/Edit',
        $useCase->handle($id, [  
            'article',
            'categories'
        ]));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, $id)
    {
        $article = Article::find($id);
        // dd($article);
        $article->fill($request->all())->update();
        return redirect()->route('mypage')->with('success', __('Edited'));        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Article::find($id)->delete();
        return redirect()->route('mypage')->with('success', __('Deleted'));
    }

     public function like(Request $request, Article $article)
    {
        //モデルを結びつけている中間テーブルnoレコードを削除する。 
        $article->likes()->detach($request->user()->id);
        // モデルを結びつけている中間テーブルにレコードを挿入する。
        $article->likes()->attach($request->user()->id);
    }

    // 気になるリストから削除する処理
    public function unlike(Request $request, Article $article)
    {
        //モデルを結びつけている中間テーブルnoレコードを削除する。 
        $article->likes()->detach($request->user()->id);
    }   
}
