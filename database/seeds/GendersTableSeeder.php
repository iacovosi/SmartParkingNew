<?php

use Illuminate\Database\Seeder;

class GendersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('genders')->insert([
            'name' => 'Male',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('genders')->insert([
        	'name' => 'Female',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);          
    }
}
