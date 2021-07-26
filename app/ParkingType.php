<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingType extends Model
{
    //
    //public function activities() {
    //    return $this->hasMany ( 'App\Activity','parkingtype_id','id');           
    //}  

    public function places() {
        return $this->hasMany ( 'App\Places','parkingtype_id','id');           
    }      
}
