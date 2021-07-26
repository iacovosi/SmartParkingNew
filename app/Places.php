<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Grimzy\LaravelMysqlSpatial\Eloquent\SpatialTrait;

class Places extends Model
{
    use SpatialTrait;
    //
    public function parkingtype() {
        return $this->belongsTo( 'App\ParkingType' ,'parkingtype_id','id');        
    }    
    public function activities() {
        return $this->hasMany ( 'App\Activity','places_id','id');           
    }   
    public function bookmarks() {
        return $this->hasMany ( 'App\Bookmarks','places_id','id');           
    }     
    public function source() {
        return $this->belongsTo( 'App\Source' ,'source_id','id');        
    }
    public function placesCosts() {
        return $this->hasMany ( 'App\PlacesCosts','places_id','id');
    }

    public function provider() {
        return $this->belongsTo( 'App\User' ,'provider_id','id');
    }

    protected $spatialFields = [
        'loc'
    ];
}
