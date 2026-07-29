<?php

namespace App\Http\Controllers;

use App\Models\Production;
use App\Models\ProductionOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductionController extends Controller
{

    /**
     * NCC Operator Center
     */
    public function index()
    {


        $productions = ProductionOrder::with('product')
            ->latest()
            ->get();



        return Inertia::render(
            'OperatorCenter/Index',
            [

                'productions' => $productions

            ]
        );


    }






    /**
     * Create Production
     */
    public function store(Request $request)
    {


        $validated = $request->validate([


            'spk_no' => [
                'required',
                'string',
                'max:50'
            ],


            'po_id' => [
                'required',
                'string',
                'max:100'
            ],


            'po_date' => [
                'nullable',
                'date'
            ],


            'model' => [
                'required',
                'string',
                'max:100'
            ],


            'line' => [
                'required',
                'string',
                'max:50'
            ],


            'qty_awal' => [
                'required',
                'integer',
                'min:0'
            ],


            'qty_akhir' => [
                'nullable',
                'integer',
                'min:0'
            ],


            'deadline' => [
                'required',
                'date'
            ],


            'status' => [
                'required',
                'string'
            ],


        ]);




        Production::create($validated);




        return redirect()

            ->route('production.index')

            ->with(
                'success',
                'Production node created'
            );


    }







    /**
     * Update Production
     */
    public function update(
        Request $request,
        $id
    )
    {


        $production = Production::findOrFail($id);



        $validated = $request->validate([


            'spk_no' => 'required|string|max:50',

            'po_id' => 'required|string|max:100',

            'po_date' => 'nullable|date',

            'model' => 'required|string|max:100',

            'line' => 'required|string|max:50',

            'qty_awal' => 'required|integer|min:0',

            'qty_akhir' => 'nullable|integer|min:0',

            'deadline' => 'required|date',

            'status' => 'required|string',


        ]);





        $production->update($validated);





        return redirect()

            ->route('production.index');


    }







    /**
     * Delete Production
     */
    public function destroy($id)
    {


        $production = Production::findOrFail($id);



        $production->delete();




        return redirect()

            ->route('production.index');


    }



}