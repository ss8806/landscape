<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileRequest;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;
use App\Models\User;
use Illuminate\Validation\Rules;


class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $posts = $user->postArticles()->orderBy('id', 'DESC')->take(5)->get();
        $likes = $user->likeArticles()->orderBy('id', 'DESC')->take(5)->get();

        return Inertia::render('Mypage/index',
        [ 
            'user' => Auth::user(),
            'success' => session('success'),
            'error' => session('error'),
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
                    'pic1' => $like->pic1,
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

        return Inertia::render('Mypage/Posts',
        [ 
            'user' => Auth::user(),            
            'posts' => $posts->map(function ($post) {
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

    public function showLikes()
    {
        $user = Auth::user();
        $likes = $user->likeArticles()->orderBy('id', 'DESC')->get();

        return Inertia::render('Mypage/Likes',[ 'user' => Auth::user(),
            'likes' => $likes->map(function ($like) {
                return [
                    'id' => $like->id,
                    'title' => $like->title,
                    'pic1' => $like->pic1,
                    'category_id' => $like->category()->get(),
                    'show_url' => URL::route('show', $like->id),
                ];
            }),
        ]);
    }

    public function showProfile()
    {
        return Inertia::render('Mypage/Profile',
        [
            'user' => Auth::user(),
            'success' => session('success'),
            'error' => session('error'),
        ]);   
    }

    // public function editAvatar(Request $request)
    // {
    //     $user = Auth::user();
         
    //      if ($request->has('editicon')) { 
    //          $fileName = $this->saveIcon($request->file('editicon')); //???????????????????????????????????????????????????
    //          $user->icon = $fileName; // ??????????????????DB?????????
    //      }

    //      $user->save();
 
    //      return redirect()->back()
    //          ->with('success', '??????????????????????????????????????????');
    // }

    // public function editIcon(Request $request)
    // {
    //     $user = Auth::user();
    //     $file_base64 = $request->input('icon');
    //     Log::info($file_base64);
    //     // Base64???????????????????????????????????????????????????
    //     list(, $fileData) = explode(';', $file_base64);
    //     list(, $fileData) = explode(',', $fileData);
    //     $fileData = base64_decode($fileData);

    //     // ?????????????????????????????? + ?????????
    //     $fileName = Str::random(20).'.jpg';

    //     // ??????????????????????????????
    //     $path = 'mydata/'.$fileName; 

    //     // AWS S3 ???????????????
    //     Storage::disk('s3')->put($path, $fileData);
    //     // DB?????????
    //     $user->icon = $fileName;
    //     $user->save();
    //     User::where('id', $request->id)->update(['icon' => $fileName]);
    //     return redirect()->back();
    // }

    public function editIcon(ProfileRequest $request)
    {
        $user = Auth::user();
        if($file = $request->file('icon')){
            $path = 'mydata'; 
            //     // AWS S3 ???????????????
            $s3_file_name = Storage::disk('s3')->put($path, $file);
            $user->icon  = $s3_file_name;
        }
        $user->update();
        return back()->with('success', '????????????????????????????????????');
    }

    public function editName(ProfileRequest $request)
    {
        $user = Auth::user();
        $user->name = $request->input('editName');
        $user->update();

        return back()->with('success', '??????????????????????????????');
        // return Redirect::route('profile',['success' => '???????????????']);
        //return redirect()->route('profile')->with('success', '??????????????????????????????');
    }
    
    public function editEmail(ProfileRequest $request)
    {
        $user = Auth::user();
        $user->email = $request->input('editEmail'); 
        $user->update();
        return back()->with('success', '?????????????????????????????????????????????'); 
    }
    public function editPassword(Request $request)
    {
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = Auth::user();
        $inputPass = $request->input('password');
        $length = strlen($inputPass);

        if($length >= 4 ){
        $user->password = Hash::make($request->password);
        $user->save();
            return back()->with('success', '???????????????????????????????????????');
        }else{
            return back()->with('error', '?????????????????????????????????????????????');
        }
    }
}
