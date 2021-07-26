<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Genders extends Model
{
    //
    public function users() {
        return $this->hasMany ( 'App\User','genders_id','id');           
    }      
}
