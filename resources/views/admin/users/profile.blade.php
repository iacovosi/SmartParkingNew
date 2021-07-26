@extends('layouts.app')

@section('content')

    @include('admin.includes.errors')

    <div class="panel panel-default">
        <div class="panel-heading">
            Edit your profile
        </div>

        <div class="panel-body">
            <form action="{{ route('user.profile.update') }}" method="post" enctype="multipart/form-data">
                {{ csrf_field() }}

                <div class="form-group">
                    <label for="Name">Name / Surname </label>
                    <input type="text" class="form-control" id="name" placeholder="Name"
                           name="name" value="{{$user->name}}">
                </div>
                <div class="form-group">
                    <label for="UserName">User Name</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" name="username"
                           value="{{$user->username}}">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="email"
                           name="email" value="{{$user->email}}">
                </div>
                <div class="form-group">
                    <label for="dateofbirth">Date of birth</label>
                    <input id="dateofbirth" class="flatpickr" data-enabletime=true name="dateofbirth"
                           value="{{$user->dateofbirth}}">
                </div>


                <input type="hidden" name="id" id="id" value="{{$user->id}}"/>

                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select name="genders_id" id="gender" class="form-control">
                        @foreach($gender as $gen)
                            <option value="{{ $gen->id }}"
                                    @if($user->genders_id == $gen->id)
                                    selected
                                    @endif
                            >{{ $gen->name }}</option>
                        @endforeach
                    </select>
                </div>


                <div class="form-group">
                    <label for="name">New Password</label>
                    <input type="password" name="password" class="form-control"
                           placeholder="New Password (if empty we keep old) ">
                </div>

                @if (Auth::user()->isAdmin())

                    <div class="form-group">
                        <label for="apikey">API key</label>
                        <input type="text" class="form-control" id="apikey"
                               placeholder="apikey"
                               name="apikey" value="{{$user->apikey}}">
                    </div>

                    <div class="form-group">
                        <label for="amount">Ammount of Money</label>
                        <input type="number" class="form-control" id="amount"
                               placeholder="amount"
                               name="amount" VALUE="{{$user->amount}}">
                    </div>


                    <div class="form-group">
                        <label for="avaliable">activated</label>
                        <input class="form-control" id="activated" name="activated" type="checkbox" value="1"
                        @if (!empty($user->activated))
                            {{'checked'}}
                                @endif
                        ></input>
                    </div>

                    <div class="form-group">
                        <label for="role">Role</label>
                        <select name="roles_id" id="role" class="form-control">
                            @foreach($roles as $role)
                                <option value="{{ $role->id }}"
                                        @if($user->roles_id == $role->id)
                                        selected
                                        @endif
                                >{{ $role->name }}</option>
                            @endforeach
                        </select>
                    </div>



                @endif
                <div class="form-group">
                    <div class="text-center">
                        <button class="btn btn-success" type="submit">
                            Update profile
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@stop




@section('scripts')

    <script type="text/javascript">
        // for selecting time date
        flatpickr('#dateofbirth', {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });

    </script>
@stop
