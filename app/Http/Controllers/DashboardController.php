<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Material;
use App\Models\Production;
use App\Models\ProductionOrder;
use App\Models\User;
use App\Models\ActivityLog;
use App\Models\MaterialRequest;

use Inertia\Inertia;


class DashboardController extends Controller
{

    public function index(Request $request)
    {


        /*
        |--------------------------------------------------------------------------
        | MATERIAL MONITOR
        |--------------------------------------------------------------------------
        */


        $totalMaterial = Material::count();


        $lowMaterial = Material::whereColumn(
            'stok',
            '<=',
            'stok_minimum'
        )->count();



        $materialHealth = $totalMaterial > 0

            ? round(
                (($totalMaterial - $lowMaterial) / $totalMaterial) * 100
            )

            : 100;



        /*
        |--------------------------------------------------------------------------
        | PRODUCTION CURVE
        |--------------------------------------------------------------------------
        */


        $productionCurve = Production::latest()
            ->take(20)
            ->get()
            ->reverse()
            ->map(function ($item) {


                $progress = 0;


                if ($item->qty_awal > 0) {

                    $progress = round(
                        ($item->qty_akhir / $item->qty_awal) * 100
                    );

                }



                return [

                    'label' => $item->spk_no,

                    'value' => $progress,

                ];

            });



        /*
        |--------------------------------------------------------------------------
        | REALTIME STATUS
        |--------------------------------------------------------------------------
        */


        $realtime = [


            'operator' => User::count(),



            'production_running' =>

                ProductionOrder::where(
                    'status',
                    'Running'
                )->count(),




            'material_request' =>

                MaterialRequest::whereIn(
                    'status',
                    [
                        'Waiting Approval',
                        'Approved',
                        'Partial'
                    ]
                )->count(),




            'stock_alert' => $lowMaterial,


        ];





        /*
        |--------------------------------------------------------------------------
        | AI NCC INSIGHT
        |--------------------------------------------------------------------------
        */


        $ai = [

            'material_warning' => $lowMaterial,


            'message' => $lowMaterial > 0

                ? $lowMaterial .
                    " material below minimum stock"

                : "Material stock condition healthy",


            'status' => $lowMaterial > 0

                ? "WARNING"

                : "NORMAL",

        ];






        /*
        |--------------------------------------------------------------------------
        | LIVE ACTIVITY
        |--------------------------------------------------------------------------
        */


        $activities = ActivityLog::with('user')

            ->latest()

            ->take(10)

            ->get();






        /*
        |--------------------------------------------------------------------------
        | NCC DATA
        |--------------------------------------------------------------------------
        */


        $data = [



            'material' => $materialHealth . "%",



            'production' =>

                ProductionOrder::where(
                    'status',
                    'Running'
                )
                ->count() . " RUNNING",




            'order' =>

                ProductionOrder::count(),




            'efficiency' =>

                $productionCurve->count()
                    ? round(
                        $productionCurve
                            ->avg('value')
                    ) . "%"

                    : "0%",




            'materialInfo' => [

                'total' => $totalMaterial,

                'low' => $lowMaterial,

            ],




            'productionCurve' => $productionCurve,



            'ai' => $ai,



            'realtime' => $realtime,



            'activities' => $activities,


        ];

        /*
|--------------------------------------------------------------------------
| NCC DATA
|--------------------------------------------------------------------------
*/

$data = [

    'material' => $materialHealth . "%",


    'production' => 
        ProductionOrder::where(
            'status',
            'Running'
        )->count() . " RUNNING",



    'order' =>
        ProductionOrder::count(),



    'efficiency' =>
        $productionCurve->count()
            ? round(
                $productionCurve->avg('value')
            ) . "%"

            : "0%",



    'materialInfo' => [

        'total' => $totalMaterial,

        'low' => $lowMaterial,

    ],



    'productionCurve' => $productionCurve,



    'ai' => $ai,



    'realtime' => $realtime,



    'activities' => $activities,

];





        return Inertia::render(
            'NCC/Index',
            [

                'data' => $data,


            ]
        );


    }

}