<?php

namespace App\Http\Controllers;

use App\Genders;
use App\Roles;
use App\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Session;

class UserControler extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('admin.users.index')->with('users', User::all())->
        with('roles', Roles::all())->with('gender', Genders::all());
    }


    public function editProfile()
    {
        if (Auth::check()) {
            return view('admin.users.profile')->with('user', User::find(Auth::user()->id))->
            with('roles', Roles::all())->with('gender', Genders::all());
        } else {
            Session::flash('error', 'Error on User  data.');
            return redirect()->back()->withErrors('Error on User data.');
        }
    }

    public function updateProfile(Request $request)
    {
        if (!empty($request)) {
            $user = User::find($request->id);
            if (!empty($user)) {

                $user->name = $request->name;
                $user->username = $request->username;
                $user->email = $request->email;
                $user->dateofbirth = $request->dateofbirth;
                $user->apikey = $request->apikey;
                $user->genders_id = $request->genders_id;
                $user->roles_id = $request->roles_id;
                if (!empty($request->password)) {
                    $user->password = Hash::make($request->password);
                }
                if (!isset($request->activated) || empty($request->activated)) {
                    $request->activated = 0;
                } else {
                    $request->activated = 1;
                }
                $user->activated = $request->activated;
                $user->save();
                Session::flash('success', 'User updated.');
                return redirect()->back();
            } else {
                Session::flash('error', 'Error on User finding ! No data.');
                return redirect()->back()->withErrors('Error on User finding ! No data.');
            }
        } else {
            Session::flash('error', 'Error on User update ! No data.');
            return redirect()->back()->withErrors('Error on User update ! No data.');
        }

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public
    function create()
    {
        //
        return view('admin.users.create')->
        with('roles', Roles::all())->with('gender', Genders::all())->with('api', $this->randomApiKey());
    }

    protected
    function randomApiKey()
    {
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public
    function store(Request $request)
    {
        //
        if (!empty($request)) {
            $newUser = new User();
            $newUser->name = $request->name;
            $newUser->username = $request->username;
            $newUser->email = $request->email;
            $newUser->dateofbirth = $request->dateofbirth;
            $newUser->apikey = $request->apikey;
            $newUser->genders_id = $request->genders_id;
            $newUser->roles_id = $request->roles_id;
            $newUser->password = Hash::make($request->password);
            $newUser->activated = 1;
            $powerr = DB::table('users')->where('name', '=', $request->name)
                ->orWhere('username', '=', $request->username)->orWhere('email', '=', $request->email)->get()->all();
            if (!empty($powerr) || (is_array($powerr) && count($powerr) > 0)) {
                Session::flash('error', 'Error on User creation ! Email/Username/Name exists!.');
                return redirect()->back()->withErrors('Error on User creation ! Email/Username/Name exists!.');
            } else {
                $newUser->save();
                Session::flash('success', 'User created.');
                return redirect()->back();
            }
        } else {
            Session::flash('error', 'Error on User creation ! No data.');
            return redirect()->back()->withErrors('Error on User creation ! No data.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function edit(Request $request)
    {
        //
        //
        if (!empty($request)) {
            $data = json_decode($request->data);
            $check = Array();
            foreach ($data as $key => $value) {
                $check[$value->name] = $value->value;
            }
            $existingUser = User::find($check['id']);
            $existingUser->name = $check['name'];
            $existingUser->username = $check['username'];
            $existingUser->email = $check['email'];
            $existingUser->dateofbirth = $check['dateofbirth'];
            $existingUser->apikey = $check['apikey'];
            $existingUser->genders_id = $check['genders_id'];
            $existingUser->roles_id = $check['roles_id'];
            if (!isset($check['activated']) || empty($check['activated'])) {
                $check['activated'] = 0;
            } else {
                $check['activated'] = 1;
            }
            $existingUser->activated = $check['activated'];
            $existingUser->save();


            return response('{"content":' . json_encode($existingUser) . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . ',"status":"success"}', 200);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public
    function deactivate(Request $request)
    {
        //
        //
        if (!empty($request)) {
            $id = $request->id;
            $existingUser = User::find($id);
            $existingUser->activated = 0;
            $existingUser->save();
            return response('{"content":0' . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . ',"status":"success"}', 200);
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public
    function activate(Request $request)
    {
        //
        //
        if (!empty($request)) {
            $id = $request->id;
            $existingUser = User::find($id);
            $existingUser->activated = 1;
            $existingUser->save();
            return response('{"content":1' . ',"status":"success"}', 200);
        } else {
            return response('{"content":' . ',"status":"success"}', 200);
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public
    function destroy($id)
    {
        //
    }

}
