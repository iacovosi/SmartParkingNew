<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        \DB::table('users')->insert([
            'id'=>1003,
            'name' => 'Administrator',
            'username'=> 'administrator', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-1',    
            'amount'=> '0', 
            'roles_id' => '1',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'z6M66TAsE65ipxNU',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);   
        
        \DB::table('users')->insert([
            'id'=>1004,
            'name' => 'christosv',
            'username'=> 'christosv', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-2',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'tsDKJVgU3pORWFs8',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);         

        \DB::table('users')->insert([
            'id'=>1005,
            'name' => 'user1',
            'username'=> 'user1', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-3',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'SCXc5dy9TjNSdauV',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  

        \DB::table('users')->insert([
            'id'=>1006,
            'name' => 'test123',
            'username'=> 'test123', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-4',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> '6lo7ZAu0u7eU6Rtr',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);          


        \DB::table('users')->insert([
            'id'=>1007,
            'name' => 'provider',
            'username'=> 'provider', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-5',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'lWfGNlAbnGrWjLYi',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  


        \DB::table('users')->insert([
            'id'=>1008,
            'name' => 'owner',
            'username'=> 'owner', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'not Any-6',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'riqhwYl9ROBXVKhH',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);  



        \DB::table('users')->insert([
            'id'=>1009,
            'name' => 'vasosv',
            'username'=> 'vasosv', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'vasosv@cs.ucy.ac.cy',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'CT3DIAASNvEiObyY',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]); 

        \DB::table('users')->insert([
            'id'=>1010,
            'name' => 'iacovos ioannou',
            'username'=> 'iacovosi', 
            'password' => '$2y$10$gy2ldQcgquoJ1gevqGHB6.pOuQozzlYFDVju2eUwOedg1b5VCEaa.',
            'email'=>'iacovos.ioannou@gmail.com',    
            'amount'=> '0', 
            'roles_id' => '2',
            'genders_id'=>'1',  
            'dateofbirth'=>'1978-07-25 12:00:00',
            'apikey'=> 'GKtDJiXp9ftP3skn',              
        	'created_at' => NOW(),
        	'updated_at' => NOW()
        ]);        

    }
}
