<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesTableSeeder::class);
        $this->call(GendersTableSeeder::class);        
        $this->call(UsersTableSeeder::class);
        $this->call(ParametersSeeder::class);        
        $this->call(ParkingTypeTableSeeder::class);     
        $this->call(SourceSeeder::class);         
    }
}
