<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class requestResults extends Model
{
    //
    public function userrequests() { 
        return $this->belongsToMany( 'App\userRequest', 'user_results', 'request_results_id', 'user_requests_id' )->withTimestamps();
    }

}
