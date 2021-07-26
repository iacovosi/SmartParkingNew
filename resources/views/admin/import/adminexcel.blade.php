@extends('layouts.app')

@section('styles')
    <style>
        /* highlight results */
        .ui-autocomplete span.hl_results {
            background-color: #ffff66;
        }

        /* loading - the AJAX indicator */
        .ui-autocomplete-loading {
            background: white url('{{ asset('images/ui-anim_basic_16x16.gif') }}') right center no-repeat;
        }

        /* scroll results */
        .ui-autocomplete {
            max-height: 250px;
            overflow-y: auto;
            /* prevent horizontal scrollbar */
            overflow-x: hidden;
            /* add padding for vertical scrollbar */
            padding-right: 5px;
        }

        .ui-autocomplete li {
            font-size: 16px;
        }

        .ui-dialog {
            z-index: 1000 !important;
        }

        /* IE 6 doesn't support max-height
        * we use height instead, but this forces the menu to always be this tall
        */
        * html .ui-autocomplete {
            height: 250px;
        }

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

    @include('includes.errors')

    <div class="container">
        <!-- HEADER, FOOTER, CENTERED -->
        <div class="card">
            <div class="card-header">
                ADMIN PARKING MANAGE - IMPORT EXCEL
            </div>
            <div class="card-body">
                <h4 class="card-title"> IMPORT Excel Parking Data</h4>
                <p class="card-text">
                @if ( Session::has('success') )
                    <div class="alert alert-success alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{ Session::get('success') }}</strong>
                    </div>
                @endif

                @if ( Session::has('error') )
                    <div class="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{ Session::get('error') }}</strong>
                    </div>
                @endif

                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>
                        <div>
                            @foreach ($errors->all() as $error)
                                <p>{{ $error }}</p>
                            @endforeach
                        </div>
                    </div>
                @endif

                <form action="{{ route('import.excel') }}" method="POST" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    Choose your xls/csv File :
                    <input type="file" name="file" class="form-control">
                    <input type="submit" class="btn btn-primary btn-lg" style="margin-top: 3%" value="IMPORT">

                </form>
                </p>
                <div class="float-right">
                    <P>
                        <a href="{{ asset('importSmartParkingTemplate.xlsx') }}">The Template Excel Location to Fill
                            up</a>
                    </P>
                </div>
            </div>
            <div class="card-footer text-muted">
                END OF FORM
            </div>
        </div>

    </div>


@endsection

@section('scripts')
    <script>
        $(document).ready(function () {

        });
    </script>

@endsection

@section('scripts')

@endsection