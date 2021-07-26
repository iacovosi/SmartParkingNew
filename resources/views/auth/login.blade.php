@extends('layouts.app')

@section('content')

@include('includes.errors')

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
            <form class="form-horizontal" method="POST" action="{{ route('login') }}">
              {{ csrf_field() }}
              @if(session()->has('login_error'))
                <div class="alert alert-success">
                  {{ session()->get('login_error') }}
                </div>
              @endif
              <div class="form-group{{ $errors->has('identity') ? ' has-error' : '' }}">
                <label for="identity" class="col-md-4 control-label">Email or Username</label>

                <div class="col-md-6">
                  <input id="identity" type="identity" class="form-control" name="identity"
                         value="{{ old('identity') }}" autofocus>

                  @if ($errors->has('identity'))
                    <span class="help-block">
                                        <strong>{{ $errors->first('identity') }}</strong>
                                    </span>
                  @endif
                </div>
              </div>

              <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                <label for="password" class="col-md-4 control-label">Password</label>

                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="password">

                  @if ($errors->has('password'))
                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                  @endif
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-8 col-md-offset-4">
                  <button type="submit" class="btn btn-primary">
                    Login
                  </button>

                  <a class="btn btn-link" href="{{ route('password.request') }}">
                    Forgot Your Password?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
</div>
</div>
@endsection

@section('styles')
@stop

@section('scripts2')
@endsection