<?php

use Illuminate\Database\Seeder;

class ParametersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('parameters')->insert([
            'name' => 'Distance of parking place from current position',
            'alias' => 'userDistance',
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('parameters')->insert([
            'name' => 'Distance of parking place from destination',
            'alias' => 'destDistance',            
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);         
        \DB::table('parameters')->insert([
            'name' => 'Cost',
            'alias' => 'cost',            
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]); 
        \DB::table('parameters')->insert([
            'name' => 'Time from current position to parking place',
            'alias' => 'userDuration',            
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);   
        \DB::table('parameters')->insert([
            'name' => 'Time from parking place to destination',
            'alias' => 'destDuration',            
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);
        \DB::table('parameters')->insert([
            'name' => 'Duration',
            'alias' => 'duration',            
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);                                                    
    }
}
