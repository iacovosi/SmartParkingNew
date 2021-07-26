<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('parked');           
            //$table->integer('reported_count');
            $table->unsignedInteger('places_id');
            $table->foreign('places_id')->references('id')->on('places');                            
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');      
            //$table->integer('parkingtype_id');
            $table->datetime('time');                         
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
        Schema::dropIfExists('activities');
    }
}
