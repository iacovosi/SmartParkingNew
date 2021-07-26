<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->

        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js" integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
        <script src="{{ asset('js/bootstrap/bootstrap.js') }}"></script>
        <script src="{{ asset('js/toastr.min.js') }}"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <script type="text/javascript" src="//cdn.datatables.net/v/dt/dt-1.10.12/datatables.min.js"></script>
        <script src="{{ asset('js/validate/jquery.validate.min.js') }}"></script>
        <script src="{{ asset('js/validate/additional-methods.min.js') }}"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">


        <!-- Styles -->
        <link href="{{ asset('css/bootstrap/bootstrap.css') }}" rel="stylesheet"/>
        <link href="{{ asset('css/toastr.min.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.12/datatables.min.css"/>


        @yield('styles')
    </head>
    <body>
        <div id="app">
            @guest
                <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
                    @else
                        <nav class="navbar navbar-expand-md  navbar-dark bg-dark navbar-laravel">
                            @endguest
                <div class="container">
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <!-- Left Side Of Navbar -->
                        <ul class="navbar-nav mr-auto">

                        </ul>

                        <!-- Right Side Of Navbar -->
                        <ul class="navbar-nav ml-auto">
                            <!-- Authentication Links -->
                            @guest
                                <li><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                                <li><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
                            @else

                                @if (Auth::user()->isAdmin())
                                    <li class="nav-item dropdown">
                                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                            ADMIN TOOLBOX <span class="caret"></span>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a class="dropdown-item"
                                               href="{{ route('users') }}">{{ __('Edit/View users') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('user.create')}}">{{ __('Add User') }}</a>
                                        </div>
                                    </li>
                                @endif


                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        MAP TOOLBOX <span class="caret"></span>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item"
                                           href="{{ route('map.searchmap') }}">{{ __('FIND BEST PARKING') }}</a>
                                        <a class="dropdown-item"
                                           href="{{ route('get.bookmarks',['user_id' => Auth::user()->id ])}}">{{ __('BOOKMARKS') }}</a>

                                        @if (Auth::user()->isAdmin())
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item"
                                               href="{{ route('map.adminmap') }}">{{ __('PARKING MANANGEMENT') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('map.providermap') }}">{{ __('PROVIDER PARKING MANANGEMENT (MY PARKINGS)') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('import.exceladmin') }}">{{ __('IMPORT EXCEL') }}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item"
                                               href="{{ route('get.reports',['reporttype' => 1])}}">{{ __('REPORT ON DESTINATION REQUESTS') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('get.reports',['reporttype' => 2])}}">{{ __('REPORT ON REQUESTS LOCATION') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('get.reports',['reporttype' => 3])}}">{{ __('REPORT ON PLACES') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('get.reports',['reporttype' => 4])}}">{{ __('REPORT ON RANKS') }}</a>
                                            <a class="dropdown-item"
                                               href="{{ route('get.reports',['reporttype' => 5])}}">{{ __('REPORT ON SOURCES') }}</a>
                                        @else
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item"
                                               href="{{ route('map.providermap') }}">{{ __('PROVIDER PARKING MANANGEMENT') }}</a>
                                        @endif
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>

                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="{{ route('user.profile.edit') }}">
                                            {{ __('Edit Profile') }}
                                        </a>
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                         document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                            @endguest
                        </ul>
                    </div>
                </div>
                            @guest
                        </nav>
                        @else
                </nav>
            @endguest

            <main class="py-4">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                                @yield('content')
                        </div>
                    </div>
                </div>
            </main>
        </div>


        <script>
            @if(Session::has('success'))
            toastr.success("{{ Session::get('success') }}");
                //session()->forget('success');
                //session()->flush();
            @endif
            @if(Session::has('info'))
            toastr.info("{{ Session::get('info') }}");
                //session()->forget('info');
                //session()->flush();
            @endif
            @if(Session::has('error'))
            toastr.info("{{ Session::get('error') }}");
            //session()->forget('info');
            //session()->flush();
            @endif
        </script>

        @yield('scripts')
    </body>
    @yield('scripts2')
    </html>
    