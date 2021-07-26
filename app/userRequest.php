<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class userRequest extends Model
{
    //
    public function requestresults() { 
        return $this->belongsToMany( 'App\requestResults', 'user_results', 'user_requests_id', 'request_results_id' )->withTimestamps();
    }
    public function requestparameters() {
        return $this->belongsToMany( 'App\Parameters', 'request_parameters', 'user_requests_id', 'parameters_id' )->withTimestamps();
    }
}
