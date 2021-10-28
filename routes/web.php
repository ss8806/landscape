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
Route::get('/article/{id}/show', [ArticleController::class, 'show'])->name('show');

Route::middleware('auth')
    ->group(function () {
        // profile
        Route::get('/mypage', [UserController::class, 'index'])->name('mypage');
        Route::get('/profile', [UserController::class, 'showProfile'])->name('profile');   
        Route::put('/editName', [UserController::class, 'editName'])->name('editName');
        Route::put('/editEmail', [UserController::class, 'editEmail'])->name('editEmail');
        Route::post('/editIcon', [UserController::class, 'editIcon'])->name('editIcon');
        Route::put('/editPassword', [UserController::class, 'editPassword'])->name('editPassword');
        // article
        Route::get('/article/create', [ArticleController::class, 'create'])->name('create');
        Route::post('/article/store', [ArticleController::class, 'store'])->name('store');
        Route::get('/article/{id}/edit', [ArticleController::class, 'edit'])->name('edit');
        // Route::put('/article/{id}/edit', [ArticleController::class, 'update'])->name('update');
        Route::put('/article/{id}/update', [ArticleController::class, 'update'])->name('update');
        Route::delete('/article/{id}/delete',  [ArticleController::class, 'destroy'])->name('delete');
    });

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// // })->middleware(['verified'])->name('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

require __DIR__.'/auth.php';
