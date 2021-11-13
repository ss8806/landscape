<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use App\Models\Article;
use App\Article\UseCase\IndexArticleUseCase;
use App\Article\UseCase\ShowArticleUseCase;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    private ShowArticleUseCase $useCase;
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

    public function testIndex()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $articles = Article::factory()->count(2)->create();
        // dd($articles);
        $response = $this->assertCount(2, $articles);
    }

    public function testAuthCreate()
    {   
        // 上記のsetUp()でログインしている
        $response = $this->get('/article/create');
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function 登録することができる()
    {
        $data = [
            'title' => 'テスト投稿',
            'body' => 'テスト投稿です',
            'user_id' => 1,
            'category_id' => 1,
        ];
        $this->post('/article/store', $data);
        // dd($response->json());
        
    }

    // public function testGuestCreate()
    // {//特にログインするための処理を行なっていませんので、変数$responseには未ログイン状態で記事投稿画面にアクセスした時のレスポンスが代入されます。
    //     $response = $this->get(route('articles.create'));
    // //assertRedirectメソッドでは、引数として渡したURLにリダイレクトされたかどうかをテストします。
    //     $response->assertRedirect(route('login'));
    // }    
    // public function testAuthCreate()
    // {   // テストに必要なUserモデルを「準備」arrange
    //     $user = factory(User::class)->create();
    // // ログインして記事投稿画面にアクセスすることを「実行」act
    //     $response = $this->actingAs($user)
    //         ->get(route('articles.create'));
    // // レスポンスを「検証」assert
    //     $response->assertStatus(200)
    //         ->assertViewIs('articles.create');
    // }
}
