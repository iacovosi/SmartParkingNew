@extends('layouts.app')

@section('styles')
    <style>

    </style>
@stop

@section('content')

    @include('includes.errors')

    <div class="panel panel-default">
        <div class="panel-heading">
            OPERATOR USER KEYS
        </div>
        <div class="panel-body">
            <table id="report" class="table table-bordered" style="font-size: 10px; ">
                <thead>
                @if(count($columns) > 0)
                    @foreach($columns as $column)
                        <th>
                            {{  $column }}
                        </th>
                    @endforeach
                @endif
                </thead>

                <tbody id="tablecontents">
                @if(count($data) > 0)
                    @foreach($data as $key=>$datatas)
                        <tr class="row1" data-id="{{ $key }}">

                            @if(count($columns) > 0)
                                @foreach($columns as $column)
                                    <td>
                                        {{  $datatas[$column] }}
                                    </td>
                                @endforeach
                            @endif

                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="10" class="text-center">No Data</th>
                    </tr>
                @endif
                </tbody>
            </table>
        </div>
    </div>


@endsection

@section('scripts')
    <script>

        $(document).ready(function () {
            $('#report').DataTable();
        });


    </script>

@endsection

@section('scripts')

@endsection