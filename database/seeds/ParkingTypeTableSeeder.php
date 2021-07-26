<?php

use Illuminate\Database\Seeder;

class ParkingTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('parking_types')->insert([
            'id'=> '1',
        	'name' => 'HOME',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  
       
        \DB::table('parking_types')->insert([
            'id'=> '2',
        	'name' => 'WORK',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  

        \DB::table('parking_types')->insert([
            'id'=> '3',
        	'name' => 'SHOPS',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  

        \DB::table('parking_types')->insert([
            'id'=> '4',
        	'name' => 'FOOD',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  

        \DB::table('parking_types')->insert([
            'id'=> '5',
        	'name' => 'DRING',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  

        \DB::table('parking_types')->insert([
            'id'=> '6',
        	'name' => 'OTHER',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]); 

        \DB::table('parking_types')->insert([
            'id'=> '7',
        	'name' => 'Parking Place',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]); 

        \DB::table('parking_types')->insert([
            'id'=> '8',
        	'name' => 'Parking Lot',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);         
    }
}
