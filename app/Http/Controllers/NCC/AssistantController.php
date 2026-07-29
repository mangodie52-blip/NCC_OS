<?php

namespace App\Http\Controllers\NCC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\AI\AAEngine;
use App\Models\AAChat;


class AssistantController extends Controller
{

    public function ask(
    Request $request,
    AAEngine $aa
)
{


    $request->validate([

        'message'=>'required|string'

    ]);



    // simpan pesan user

    AAChat::create([

        'user_id'=>auth()->id(),

        'role'=>'user',

        'message'=>$request->message

    ]);



    $reply = $aa->respond(
        $request->message
    );



    // simpan jawaban AA

    AAChat::create([

        'user_id'=>auth()->id(),

        'role'=>'aa',

        'message'=>$reply

    ]);



    return response()->json([

        'reply'=>$reply

    ]);


}


}