<?php

use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('sources')->insert([
            'name' => 'admin',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
        	'name' => 'parkwhiz api',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
            'name' => 'google places api',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
            'name' => 'yandex api',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
            'name' => 'overpass api',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
            'name' => 'CROWDSOURCING',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
        \DB::table('sources')->insert([
            'name' => 'EXCEL',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
    }
}
