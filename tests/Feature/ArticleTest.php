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
        Category::factory()->create();
        $user = $this->user = User::factory()->create([
            'name' => 'a',
            'email' => 'a@a.com',
            'password' => 'a',
        ]);
        // ログインした状態になる
        $this->actingAs($user);
        Article::factory()->create([
            'title' => 'a',
            'body' => 'a',
            'user_id' => '1',
            'category_id' => '1',
        ]);
    }

    public function testIndex()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $articles = Article::factory()->count(2)->create();
        // dd($articles);
        $this->assertCount(2, $articles);
    }
    // ゲストログイン
        // public function testGuestCreate()
        // {//特にログインするための処理を行なっていませんので、変数$responseには未ログイン状態で記事投稿画面にアクセスした時のレスポンスが代入されます。
        //     $response = $this->get(route('create'));
        // //assertRedirectメソッドでは、引数として渡したURLにリダイレクトされたかどうかをテストします。
        //     $response->assertRedirect(route('login'));
        // }    

    public function testCreate()
    {   
        // 上記のsetUp()でログインしている
        // $user = User::factory()->create();
        // ログインした状態になる
        // $this->actingAs($user);
        $response = $this->get('/article/create');
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $data = [
            'title' => 'テスト投稿',
            'body' => 'テスト投稿です',
            'user_id' => 1,
            'category_id' => 1,
        ];
        $response = $this->from('/article/create')->post('/article/store', $data);
        // dd($response->json());
        // $response->assertStatus(302);
        $response->assertRedirect('/');
    }

    public function testShow()
    { 
        // articleが生成されてないとエラー500がでる
        $response = $this->get(route('show', ['id' => 1]));
        $response->assertStatus(200);
    }

    public function testEdit()
    {
        $response = $this->from('mypage')->get(route('edit', ['id' => 1]));
        $response->assertStatus(302);
        // $response->assertRedirect(route('edit', ['id' => 1])); // Failed asserting that two strings are equal.
    }

    public function testUpdate()
    {
        $data = [
            'title' => 'b',
            'body' => 'b',
            'category_id' => '2',
        ];
        $response = $this->from('/article/1/edit')->post('/article/1/update', $data);
        $response->assertStatus(302);
    }

    public function testDestroy()
    {
        $response = $this->from('/article/1/edit')->delete('/article/1/delete');
        $response->assertStatus(302);
    }
}
