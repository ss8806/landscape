<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Article;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{
    use HandlesAuthorization;

    public function __construct(User $user, Article $article)
    {
        $user = auth()->user();
        
        if ($user->id === $article->user_id){
            return true;
        }
              
    }

    // public function viewAny(?User $user)
    // {
    //     return true;
    // }


    // public function update(User $user, Article $article)
    // {
    //     $user = auth()->user();
        
    //     return $user->id === $article->user_id
    //             ? Response::allow()
    //             : Response::deny('You do not own this post.');
    // }    
}
