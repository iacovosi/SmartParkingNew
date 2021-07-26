@extends('layouts.app')

@section('content')

      @include('admin.includes.errors')

      <div class="panel panel-default">
            <div class="panel-heading">
                  Create a new user
            </div>

            <div class="panel-body">
                  <form action="{{ route('user.store') }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="Name">Name / Surname </label>
                            <input type="text" class="form-control" id="name" placeholder="Name"
                                   name="name">
                        </div>
                      <div class="form-group">
                          <label for="UserName">User Name</label>
                          <input type="text" class="form-control" id="username" placeholder="Username" name="username">
                      </div>
                      <div class="form-group">
                          <label for="password">Password</label>
                          <input type="password" class="form-control" id="password" placeholder="password"
                                 name="password">
                      </div>
                      <div class="form-group">
                          <label for="email">Email</label>
                          <input type="email" class="form-control" id="email" placeholder="email"
                                 name="email">
                      </div>
                      <div class="form-group">
                          <label for="dateofbirth">Date of birth</label>
                          <input id="dateofbirth" class="flatpickr" data-enabletime=true name="dateofbirth">
                      </div>
                      <div class="form-group">
                          <label for="amount">Ammount of Money</label>
                          <input type="number" class="form-control" id="amount"
                                 placeholder="amount"
                                 name="amount" VALUE="0">
                        </div>
                        <div class="form-group">
                            <label for="apikey">API key</label>
                            <input type="text" class="form-control" id="apikey"
                                   placeholder="apikey"
                                   name="apikey" value="{{$api}}">
                        </div>

                      <input type="hidden" name="id" id="id"/>

                      <div class="form-group">
                          <label for="gender">Gender</label>
                          <select name="genders_id" id="gender" class="form-control">
                              @foreach($gender as $gen)
                                  <option value="{{ $gen->id }}"
                                  >{{ $gen->name }}</option>
                              @endforeach
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="role">Role</label>
                          <select name="roles_id" id="role" class="form-control">
                              @foreach($roles as $role)
                                  <option value="{{ $role->id }}"
                                  >{{ $role->name }}</option>
                              @endforeach
                          </select>
                      </div>


                      <div class="form-group">
                              <div class="text-center">
                                    <button class="btn btn-success" type="submit">
                                          Add user
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
