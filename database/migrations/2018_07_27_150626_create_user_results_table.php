<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_results', function (Blueprint $table) {
            $table->unsignedInteger('user_requests_id');
            $table->foreign('user_requests_id')->references('id')->on('user_requests');
            $table->unsignedInteger('request_results_id');
            $table->foreign('request_results_id')->references('id')->on('request_results');            
            $table->primary(['user_requests_id', 'request_results_id']);          
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
        Schema::dropIfExists('user_results');
    }
}
