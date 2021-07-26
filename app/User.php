<?php

namespace App;

use Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'username', 'roles_id', 'genders_id', 'email', 'password', 'dateofbirth', 'apikey'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function role()
    {
        return $this->belongsTo('App\Roles', 'roles_id', 'id');
    }

    public function gender()
    {
        return $this->belongsTo('App\Genders', 'genders_id', 'id');
    }

    public function activities()
    {
        return $this->hasMany('App\Activity', 'user_id', 'id');
    }

    public function bookmarks()
    {
        return $this->hasMany('App\Bookmarks', 'user_id', 'id');
    }

    public function UserKeys()
    {
        return $this->hasMany('App\UserKeys', 'user_id', 'id');
    }

    public function provider_places()
    {
        return $this->hasMany('App\Places', 'provider_id', 'id');
    }

    public static function getUser($identity, $password)
    {
        $user = null;
        if (Auth::attempt(['username' => request('identity'), 'password' => request('password'), 'activated' => 1])) {
            $user = User::where('username', $identity)->where('password', Hash::make($password))->first();

        } else if (Auth::attempt(['email' => request('identity'), 'password' => request('password'), 'activated' => 1])) {
            $user = User::where('email', $identity)->where('password', Hash::make($password))->first();

        } else {
            $identiuty = request('identity');
            $password = request('password');
            $user = User::where('username', $identiuty)
                ->where('apikey', $password)
                ->where('activated', 1)
                ->first();
            if (empty($user)) {
                $user = User::where('email', $identiuty)
                    ->where('apikey', $password)
                    ->where('activated', 1)
                    ->first();
            }
        }
        return $user;
    }

    public static function checkUserForAPI($identity, $password)
    {
        $user = getUser($identity, $password);
        if (!empty($user)) {
            $role = $user->role()->where('id', 1)->orWhere('id', 3)->get();
            if (!empty($role) && count($role) > 0) {
                return 1;
            }
        }
        return 0;
    }

    public function isAdmin()
    {
        $user = Auth::user();
        $role = $user->role()->where('id', 1)->get();
        if (!empty($role) && count($role) > 0) {
            return 1;
        }
        return 0;
    }

    public static function isAdminById($id)
    {
        $user = User::find($id);
        $role = $user->role()->where('id', 1)->get();
        if (!empty($role) && count($role) > 0) {
            return 1;
        }
        return 0;
    }

    public function isProvider()
    {
        $user = Auth::user();
        $role = $user->role()->where('id', 4)->get();
        if (!empty($role) && count($role) > 0) {
            return 1;
        }
        return 0;
    }

    public static function isProviderById($id)
    {
        $user = User::find($id);
        $role = $user->role()->where('id', 4)->get();
        if (!empty($role) && count($role) > 0) {
            return 1;
        }
        return 0;
    }

}
