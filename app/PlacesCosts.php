<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlacesCosts extends Model
{
    //
    public function places() {
        return $this->belongsTo( 'App\Places' ,'places_id','id');
    }
}
