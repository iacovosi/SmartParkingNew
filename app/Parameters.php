<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parameters extends Model
{
    //
    public function requestresults() { 
        return $this->belongsToMany( 'App\requestResults', 'RequestParameters', 'parameters_id','request_results_id' );             
    }       
}
