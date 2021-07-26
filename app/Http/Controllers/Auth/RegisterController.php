<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Roles;
use App\Genders;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:50',           
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|max:60|confirmed',
            'dateofbirth' => 'required|date',            
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'roles_id' => 2,// $data['roles_id'] ,
            'genders_id' =>   $data['genders_id'] ,
            'dateofbirth' => $data['dateofbirth'] ,
            'apikey' => $this->randomApiKey() ,            
        ]);
    }

    protected function randomApiKey() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 16; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        //
        $roles=Roles::all();
        $user=Auth::user(); 
        $genders=Genders::all();
        $ip=$_SERVER['HTTP_HOST'];
        $user_id= Auth::id();
        return view('auth.register')->with('roles',$roles)->with('genders',$genders)->with('user',$user)->with('ip',$ip)->with('user_id',$user_id);
    }

}
