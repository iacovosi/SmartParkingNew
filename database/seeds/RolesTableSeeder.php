<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        //
        \DB::table('roles')->insert([
            'name' => 'Administrator',
            'isAdminRole'=>1,
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('roles')->insert([
        	'name' => 'Business',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('roles')->insert([
            'name' => 'Application',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);
        \DB::table('roles')->insert([
            'name' => 'Provider',
            'created_at' => NOW(),
            'updated_at' => NOW()
        ]);

    }
}
