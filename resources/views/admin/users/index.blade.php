@extends('layouts.app')

@section('styles')
    <style>
        /*VALIDITY CHECKS*/

        input[type=text],
        input[type=email],
        input[type=number],
        textarea,
        fieldset {
            /* required to properly style form
               elements on WebKit based browsers */
            -webkit-appearance: none;

            width: 100%;
            border: 1px solid #333;
            margin: 0;

            font-family: inherit;
            font-size: 90%;

            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        input:invalid {
            box-shadow: 0 0 5px 1px red;
        }

        input:focus:invalid {
            outline: none;
        }

    </style>
@stop



@section('content')

    <div class="panel panel-default">
        <div class="panel-heading">
            Users
        </div>
        <div class="panel-body">
            <table id="table" class="table table-bordered" style="font-size: 10px; ">
                <thead>
                <th>
                    Name
                </th>
                <th>
                    Username
                </th>
                <th>
                    Email
                </th>
                <th>
                    Role of User
                </th>
                <th>
                    Gender
                </th>
                <th>
                    Date of Birth
                </th>
                <th>
                    Money
                </th>
                <th>
                    API KEY
                </th>
                <th>
                    Edit
                </th>
                <th>
                    Activate/DeActivate
                </th>
                </thead>

                <tbody id="tablecontents">
                @if($users->count() > 0)
                    @foreach($users as $user)
                        <tr class="row1" data-id="{{ $user->id }}">
                            <td>
                                <div id="name{{ $user->id }}">
                                    {{ $user->name }}
                                </div>
                            </td>
                            <td>
                                <div id="username{{ $user->id }}">
                                    {{ $user->username }}

                                </div>
                            </td>
                            <td>
                                <div id="email{{ $user->id }}">
                                    {{ $user->email }}
                                </div>
                            </td>
                            <td>
                                <select name="role_id" id="role{{ $user->id }}" class="form-control rolechange"
                                        disabled>
                                    @foreach($roles as $role)
                                        <option value="{{ $role->id }}"
                                                @if($user->roles_id == $role->id)
                                                selected
                                                @endif
                                        >{{ $role->name }}</option>
                                    @endforeach
                                </select>
                            </td>

                            <td>
                                <select name="gender_id" id="gender{{ $user->id }}" class="form-control genderchange"
                                        disabled>
                                    @foreach($gender as $gen)
                                        <option value="{{ $gen->id }}"
                                                @if($user->genders_id == $gen->id)
                                                selected
                                                @endif
                                        >{{ $gen->name }}</option>
                                    @endforeach
                                </select>
                            </td>
                            <td>
                                <div id="dateofbirth{{ $user->id }}">
                                    {{ $user->dateofbirth }}
                                </div>
                            </td>
                            <td>
                                <div id="amount{{ $user->id }}">
                                    {{ $user->amount }}
                                </div>
                            </td>
                            <td>
                                <div id="apikey{{ $user->id }}">
                                    {{ $user->apikey }}
                                </div>
                            </td>
                            <td>
                                @if(Auth::id() !== $user->id)
                                    <div class="btn btn-xs btn-info editPower" id="edit{{$user->id}}">Edit</div>
                                @endif
                            </td>
                            <td>
                                @if(Auth::id() !== $user->id)
                                    @if($user->isAdmin())
                                        @if($user->activated)
                                            <div id="deactivate{{$user->id}}"
                                                 class="btn btn-xs btn-danger deactivate">DEACTIVATE
                                            </div>
                                        @else
                                            <div id="activate{{$user->id}}"
                                                 class="btn btn-xs btn-success activate">ACTIVATE
                                            </div>
                                        @endif
                                    @else
                                        <input name="activated" readonly type="checkbox" value="on" class="changestatus"
                                               id="{{ $user->id }}"
                                               @if ($user->activated==1)
                                               checked="checked">
                                    @endif
                                    >
                                @endif
                                @else
                                    <input name="activated" readonly disabled type="checkbox"
                                           @if ($user->activated==1)
                                           checked="checked">
                                @endif
                                @endif
                            </td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="10" class="text-center">No users</th>
                    </tr>
                @endif
                </tbody>
            </table>
        </div>
    </div>




    <div id="dialog-message-edit-User" title="Edit User">
        <p>
            <span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>
            Edit User.
        </p>
        <p>
            <!-- HEADER, FOOTER, CENTERED -->
            <div class="card text-center">
                <div class="card-header">
                    Edit User DATA
                </div>
                <div class="card-body">
                    <h4 class="card-title"> User Data</h4>
        <p class="card-text">
        <form name="myUserSave" id="myUserSave">
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
                       name="apikey">
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
                <label for="avaliable">activated</label>
                <input class="form-control" id="activated" name="activated" type="checkbox" value="1"></input>
            </div>

        </form>

        </p>
        <div class="form-group">
            <button type="button" id="SAVEUserInfo" class="btn btn-primary" style="width: 50%">
                SAVE
            </button>
        </div>
    </div>
    <div class="card-footer text-muted">
        END OF FORM
    </div>


@stop

@section('scripts')

    <script type="text/javascript">
        var arrayofUsers =<?php echo $users; ?>;
        var getArray = {};
        for (i = 0; i < arrayofUsers.length; i++) {
            // alert(arrayofUsers[i].id);
            getArray[arrayofUsers[i].id] = arrayofUsers[i];
        }
        //alert(sexyArray);

        $(function () {
            $("#table").DataTable();
        });

        dialog = $("#dialog-message-edit-User").dialog({
            autoOpen: false,
            modal: true,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "explode",
                duration: 1000
            },
            height: 500,
            width: 600,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });

        $('.deactivate,.activate').button().on("click", function () {
                //alert(this.id);
                if (this.id.includes("deactivate")) {
                    // alert("deactivate");
                    id = this.id.replace('deactivate', '');
                    type = 1;
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('user.deactivate') }}",
                        data: {
                            'id': id,
                            user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                            _token: '{{csrf_token()}}',
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            location.reload();
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });
                }
                else if (this.id.includes("activate")) {
                    // alert("activate");
                    id = this.id.replace('activate', '');
                    type = 2;
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "{{ route('user.activate') }}",
                        data: {
                            'id': id,
                            user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                            _token: '{{csrf_token()}}',
                        },
                        success: function (data) {
                            if (data.status == "success") {
                                console.log(data);
                            } else {
                                console.log("Error:" + data);
                            }
                            location.reload();
                        }
                        ,
                        error: function (jqXHR, textStatus, errorThrown) {
                            //alert();
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    });

                }
            }
        );

        $(".editPower").button().on("click", function () {
            user = getArray[this.id.replace('edit', '')];
            //alert(user.id);
            $("#name").val(user.name);
            $("#username").val(user.username);
            $("#email").val(user.email);
            $("#dateofbirth").val(user.dateofbirth);
            $("#apikey").val(user.apikey);
            $("#id").val(user.id);
            $("#gender").val(user.genders_id);
            $("#role").val(user.roles_id);
            if (user.activated) {
                $('#activated').attr('checked', true);
            } else {
                $('#activated').attr('checked', false);
            }
            dialog.dialog("open");
        });


        $("#SAVEUserInfo").button().on("click", function () {
            if ($("#myUserSave").valid()) {
                var formData = JSON.stringify($("#myUserSave").serializeArray());
                //alert(formData);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "{{ route('user.edit') }}",
                    data: {
                        data: formData,
                        user_id: "{{empty(\Auth::user())?1003:\Auth::user()->id}}",
                        _token: '{{csrf_token()}}',
                    },
                    success: function (data) {
                        if (data.status == "success") {
                            console.log(data);
                        } else {
                            console.log("Error:" + data);
                        }
                        //possitionData = data.alladata;
                        dialog.dialog("close");
                        location.reload();
                    }
                    ,
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert();
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            }
            else {
                $("#myUserSave").validate();
            }
        });


        // for selecting time date
        flatpickr('#dateofbirth', {
            enableTime: true,
            dateFormat: "Y-m-d H:i",
        });

    </script>
@stop
