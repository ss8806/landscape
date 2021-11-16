<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Category;
use App\Models\Article;
use App\Models\User;

class LikeTest extends TestCase
{
    use RefreshDatabase;

    public function testIsLikedByNull()
    {
    //createメソッドは保存したモデルのインスタンスを返すので、これが変数$articleに代入される。
        $article = Article::factory()->create();
    //Articleクラスのインスタンスが代入された$articleがisLikedメソッドを使用しています。
        $result = $article->isLiked(null);
    //assertFalseメソッドは、引数がfalseかどうかをテストします。
    //$resultにはisLikeyメソッドの戻り値が代入されており、この戻り値はassert...のようなメソッドは持っていません。$result->assert...といった書き方にはなりません。
        $this->assertFalse($result);
    }

    public function testIsLikedByTheUser()
    {
        $article = Article::factory()->create();
        $user = User::factory()->create();
    // $article->likes()->attach($user)とすることで、
    // likesテーブルのuser_idには、$userのidの値
    // likesテーブルのarticle_idには、$articleのidの値
    // を持った、likesテーブルのレコードが新規登録されます。
        $article->likes()->attach($user);

        $result = $article->isLiked($user);

        $this->assertTrue($result);
    }

    public function testIsLikedByAnother()
    {
        $article = Article::factory()->create();
        $user = User::factory()->create();
        $another = User::factory()->create();
        $article->likes()->attach($another);

        $result = $article->isLiked($user);

        $this->assertFalse($result);
    }
}
