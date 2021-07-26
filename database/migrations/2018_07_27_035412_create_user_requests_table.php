<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_requests', function (Blueprint $table) {
            $table->increments('id');
            $table->point('userloc');            
            $table->double('userlat');
            $table->double('userlong');
            $table->point('destloc');               
            $table->double('destlat');
            $table->double('destlong');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');                
            $table->datetime('time');            
            $table->double('totaltime');
            $table->double('fuzzytime');
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
        Schema::dropIfExists('user_requests');
    }
}
