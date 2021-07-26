<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_parameters', function (Blueprint $table) {
            $table->unsignedInteger('user_requests_id');
            $table->foreign('user_requests_id')->references('id')->on('user_requests');
            $table->unsignedInteger('parameters_id');
            $table->foreign('parameters_id')->references('id')->on('parameters');            
            $table->primary(['user_requests_id', 'parameters_id']);
            $table->integer('order');   
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
        Schema::dropIfExists('request_parameters');
    }
}
