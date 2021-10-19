<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('categories')->insert([
            [
                'name' => 'パン・惣菜',
                'sort_no' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '弁当',
                'sort_no' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ], 
            [
                'name' => '飲料',
                'sort_no' => '3',
                'created_at' => now(),
                'updated_at' => now(),
            ], 
            [
                'name' => 'スイーツ',
                'sort_no' => '4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'その他',
                'sort_no' => '5',
                'created_at' => now(),
                'updated_at' => now(),
            ],    
        ]);
    }
}
