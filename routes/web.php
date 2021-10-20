<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ArticleController::class, 'index'])->name('articles');

Route::middleware('auth')
    ->group(function () {
        Route::get('/mypage', [UserController::class, 'index'])->name('mypage');
        Route::get('/profile', [UserController::class, 'show'])->name('profile');   
        Route::put('/editName', [UserController::class, 'editName'])->name('editName');
        Route::put('/editEmail', [UserController::class, 'editEmail'])->name('editEmail');
        Route::post('/editIcon', [UserController::class, 'editIcon'])->name('editIcon');
    });

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
// })->middleware(['verified'])->name('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
