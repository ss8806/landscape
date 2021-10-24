<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    public function category(): BelongsTo
    {
        return $this->belongsTo('App\Models\Category');
    }

    public function scopeOrderById($query)
    {
        $query->orderBy('id');
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
