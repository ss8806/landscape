<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;


class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Mypage/index',['user' => Auth::user()]);   
    }

    public function show()
    {
        return Inertia::render('Mypage/profile',['user' => Auth::user()]);   
    }

    public function editName(Request $request)
    {
        $user = Auth::user();
        $user->name = $request->input('editName');
        $user->save();

        // return Redirect::route('profile',['status' => '名前を変更']);

        return redirect()->route('profile');
    
    }    
}
