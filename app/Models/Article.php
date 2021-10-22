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
}
