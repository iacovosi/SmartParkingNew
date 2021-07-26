<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->point('loc');
            $table->double('lat');
            $table->double('long');
            $table->integer('disabledcount');
            $table->integer('occupied')->default(0);
            $table->integer('emptyspaces')->default(0);
            $table->boolean('empty');
            $table->boolean('avaliable');            
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');              
            $table->double('cost')->default(0);               
            $table->unsignedInteger('parkingtype_id');
            $table->foreign('parkingtype_id')->references('id')->on('parking_types');  
            $table->integer('reportedcount');
            $table->integer('validity')->default(1);
            $table->integer('capacity');
            $table->datetime('time');     
            $table->integer('maximumduration')->default(0);    
            $table->integer('source_id')->default(1);
            $table->string('comments')->default("NO");
            $table->boolean('opendata')->default(0);
            $table->unsignedInteger('provider_id')->default(1003);
            $table->foreign('provider_id')->references('id')->on('users');
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
        Schema::dropIfExists('places');
    }
}
