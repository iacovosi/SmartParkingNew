<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->increments('id');   
            $table->boolean('temporary');    
            $table->string('description');
            $table->string('name');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');             
           // $table->unsignedInteger('parkingtype_id');
          //  $table->foreign('parkingtype_id')->references('id')->on('parking_types');              
            $table->unsignedInteger('places_id');
            $table->foreign('places_id')->references('id')->on('places');             
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
        Schema::dropIfExists('bookmarks');
    }
}
