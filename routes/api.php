<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['web', 'auth:api']], function () {
    Route::post('/API/get-details', ['uses' => 'APIController@getDetails', 'as' => 'api.getUserDetails']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});

Route::post('/API/login', ['uses' => 'APIController@login', 'as' => 'api.login']);
Route::post('/API/register', ['uses' => 'APIController@register', 'as' => 'api.register']);
/*
Route::group(['middleware' => 'auth:api'], function () {

});
*/
