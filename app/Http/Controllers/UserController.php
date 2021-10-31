<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\EditRequest;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = $user->postArticles()->orderBy('id', 'DESC')->take(5)->get();
        //$likes = $user->likeArticles()->orderBy('id', 'DESC')->take(5)->get();
        $likes = $user->likeArticles()->get();

        return Inertia::render('Mypage/index',[ 'user' => Auth::user(),
            'posts' => $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'pic1' => $post->pic1,
                    'category_id' => $post->category()->get(),
                    'show_url' => URL::route('edit', $post->id),
                ];
            }),
            'likes' => $likes->map(function ($like) {
                return [
                    // 'like' => $like,
                    'id' => $like->id,
                    'title' => $like->title,
                    'category_id' => $like->category()->get(),
                    'show_url' => URL::route('show', $like->id),
                ];
            }),
        ]);
    }

    public function showPosts()
    {
        $user = Auth::user();
        $posts = $user->postArticles()->orderBy('id', 'DESC')->get();

        return Inertia::render('Mypage/posts',[ 'user' => Auth::user(),
            'likes' => $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'pic1' => $post->pic1,
                    //'user_id' => $article->user()->get(),
                    'category_id' => $post->category()->get(),
                    'show_url' => URL::route('edit', $post->id),
                ];
            }),
        ]);
    }

    // public function showLikes()
    // {
    //     $user = Auth::user();
    //     $likes = $user->likeArticles()->orderBy('id', 'DESC')->get();

    //     return Inertia::render('Mypage/posts',[ 'user' => Auth::user(),
    //         'likes' => $likes->map(function ($like) {
    //             return [
    //                 'id' => $like->id,
    //                 'title' => $like->title,
    //                 'pic1' => $like->pic1,
    //                 'category_id' => $like->category()->get(),
    //                 'show_url' => URL::route('show', $like->article_id),
    //             ];
    //         }),
    //     ]);
    // }

    public function showProfile()
    {
        return Inertia::render('Mypage/profile',['user' => Auth::user()]);   
    }

    public function editAvatar(Request $request)
    {
        $user = Auth::user();
         
         if ($request->has('editicon')) { 
             $fileName = $this->saveIcon($request->file('editicon')); //アップロードされた画像の情報を取得
             $user->icon = $fileName; // ファイル名をDBに保存
         }

         $user->save();
 
         return redirect()->back()
             ->with('status', 'プロフィールを変更しました。');
    }

    public function editIcon(Request $request)
    {
        $user = Auth::user();
        $file_base64 = $request->input('icon');

        // Base64文字列をデコードしてバイナリに変換
        list(, $fileData) = explode(';', $file_base64);
        list(, $fileData) = explode(',', $fileData);
        $fileData = base64_decode($fileData);

        // ランダムなファイル名 + 拡張子
        $fileName = Str::random(20).'.jpg';

        // 保存するパスを決める
        // $path = 'mydata/'.$fileName; 

        // AWS S3 に保存する
        //Storage::disk('s3')->put($path, $fileData, 'public');
        // DBに保存
        $user->icon = $fileName;
        $user->save();
        //User::where('id', $request->id)->update(['icon' => $fileName]);
        return redirect()->back();
    }

    public function editName(EditRequest $request)
    {
        $user = Auth::user();
        $user->name = $request->input('editName');
        $user->save();

        // return Redirect::route('profile',['status' => '名前を変更']);
        return redirect()->back()->with('status', 'プロフィールを変更しました。');
    }
    
    public function editEmail(EditRequest $request)
    {
        $user = Auth::user();
        $user->email = $request->input('editEmail'); 
        $user->save();
 
        return redirect()->back()->with('status', 'プロフィールを変更しました。');
    }
    public function editPassword(Request $request)
    {
        $user = Auth::user();
        $user->password = Hash::make($request->input('editPassword'));
        $user->save();
 
        return redirect()->back()->with('status', 'パスワードを変更しました。');
    }
}
