<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'category_id', 'body', 'pic1'];

    public function user(): BelongsTo
    {
        //return $this->belongsTo(User::class);
        return $this->belongsTo('App\Models\User');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
        // return $this->belongsTo('App\Models\Category');
    }

    public function likes(): BelongsToMany
    {
    // likesにおけるarticleモデルとuserモデルの関係は多対多となる。 第二引数には中間テーブルlikesを指定
        return $this->belongsToMany('App\Models\User', 'likes',)->withTimestamps();
    }

    public function isLiked(?User $user): bool
    {
    // $this->likesにより、Articleモデルからlikesテーブル経由で紐付くUserモデルが、コレクションで返る。
    // countメソッドは、コレクションの要素数を数えて、数値を返す
        return $user //三項演算子
    // このArticleををお気に入りにしたユーザーの中に、引数として渡された$userがいれば、1かそれより大きい数値が返る
            ? (bool)$this->likes->where('id', $user->id)->count() 
    // このアイデアをいいねしたユーザーの中に、引数として渡された$userがいなければ、0が返る 
            : false; 
    }

    // public function scopeFilter($query, array $filters)
    // {
    //     $query->when($filters['search'] ?? null, function ($query, $search) {
    //         $query->where(function ($query) use ($search) {
    //             $query->where('id', 'like', '%'.$search.'%')
    //                 ->orWhere('title', 'like', '%'.$search.'%')
    //                 ->orWhere('body', 'like', '%'.$search.'%');
    //         });
    //     })->when($filters['role'] ?? null, function ($query, $role) {
    //         $query->whereRole($role);
    //     })->when($filters['trashed'] ?? null, function ($query, $trashed) {
    //         if ($trashed === 'with') {
    //             $query->withTrashed();
    //         } elseif ($trashed === 'only') {
    //             $query->onlyTrashed();
    //         }
    //     });
    // }
}
