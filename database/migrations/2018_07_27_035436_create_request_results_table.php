<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_results', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');            
            $table->double('distanceDest');
            $table->double('distanceDestNorm');
            $table->double('distanceUser');
            $table->double('distanceUserNorm');
            $table->double('durationDest');
            $table->double('durationDestNorm');
            $table->double('durationUser');
            $table->double('durationUserNorm');
            $table->double('costNorm');
            $table->double('score');
            $table->unsignedInteger('places_id');  
            $table->foreign('places_id')->references('id')->on('places');                        
            $table->unsignedInteger('user_id');            
            $table->foreign('user_id')->references('id')->on('users');            
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
        Schema::dropIfExists('request_results');
    }
}
