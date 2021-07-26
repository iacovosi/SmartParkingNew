<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('username',50)->unique(); 
            $table->string('password',60);
            $table->string('email')->unique();      
            $table->decimal('amount', 8, 2)->default(0);   
            $table->boolean('activated')->default(1);  
            $table->unsignedInteger('roles_id');
            $table->foreign('roles_id')->references('id')->on('roles');    
            $table->unsignedInteger('genders_id');
            $table->foreign('genders_id')->references('id')->on('genders');              
            $table->datetime('dateofbirth');
            $table->string('apikey',60);          
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
