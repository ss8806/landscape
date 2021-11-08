<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Article;

class ArticleTest extends TestCase
{
    use RefreshDatabase;
    public function setUp(): void
    {
        // setUp()はテストを実行するときに最初に実行される
        parent::setUp();
        // userデータを作成
        $user = User::factory()->create();
        Category::factory()->create();
        // ログインした状態になる
        $this->actingAs($user);
    }

     /**
     * @test
     */
    public function 一覧を取得()
    {

        $articles = Article::factory()->count(10)->create();

        //$response = $this->get('/');
        $response = $this->get(route('articles'));

        $response->assertOK()
                ->assertStatus(200)
                ->assertOK($articles->count());
    }
    
}
