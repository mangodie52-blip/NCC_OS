<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Production;
use App\Models\ProductionOrder;
use App\Models\MaterialRequest;
use App\Models\ActivityLog;
use Inertia\Inertia;

class NCCController extends Controller
{
    public function index()
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

        $materialPanel = [

            'total'  => $totalMaterial,

            'low'    => $lowMaterial,

            'health' => $materialHealth,

        ];


        /*
        |--------------------------------------------------------------------------
        | PRODUCTION
        |--------------------------------------------------------------------------
        */

        $productionRunning = ProductionOrder::where(
            'status',
            'Running'
        )->count();

        $productionFinished = ProductionOrder::where(
            'status',
            'Finished'
        )->count();

        $productionPending = ProductionOrder::where(
            'status',
            'Draft'
        )->count();

        $productionPanel = [

            'running'  => $productionRunning,

            'finished' => $productionFinished,

            'pending'  => $productionPending,

        ];


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
        | WAREHOUSE
        |--------------------------------------------------------------------------
        */

        $warehouseActive = MaterialRequest::count();

        $warehouseWaiting = MaterialRequest::where(
            'status',
            'Waiting Approval'
        )->count();

        $warehouseApproved = MaterialRequest::where(
            'status',
            'Approved'
        )->count();

        $warehousePartial = MaterialRequest::where(
            'status',
            'Partial'
        )->count();

        $warehousePanel = [

            'active' => $warehouseActive,

            'waiting' => $warehouseWaiting,

            'approved' => $warehouseApproved,

            'partial' => $warehousePartial,

        ];


        /*
        |--------------------------------------------------------------------------
        | AI MONITOR
        |--------------------------------------------------------------------------
        */

        $ai = [

            'status' =>

                ($lowMaterial > 0 || $warehouseWaiting > 0)

                ? 'ATTENTION'

                : 'NORMAL',

            'message' =>

                $warehouseWaiting > 0

                ? $warehouseWaiting . ' material request waiting approval'

                : (

                    $lowMaterial > 0

                    ? $lowMaterial . ' material below minimum stock'

                    : 'Factory operating normally'

                ),

            'health' => $materialHealth,

            'running' => $productionRunning,

            'waiting' => $warehouseWaiting,

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

            /*
            |--------------------------------------------------------------------------
            | KPI
            |--------------------------------------------------------------------------
            */

            'material' => $materialHealth . "%",

            'production' => $productionRunning . " RUNNING",

            'order' => ProductionOrder::count(),

            'efficiency' =>

                $productionCurve->count()

                    ? round(
                        $productionCurve->avg('value')
                    ) . "%"

                    : "0%",


            /*
            |--------------------------------------------------------------------------
            | PANELS
            |--------------------------------------------------------------------------
            */

            'materialInfo' => $materialPanel,

            'productionInfo' => $productionPanel,

            'warehouse' => $warehousePanel,

            'ai' => $ai,

            'activities' => $activities,


            /*
            |--------------------------------------------------------------------------
            | GRAPH
            |--------------------------------------------------------------------------
            */

            'productionCurve' => $productionCurve,

        ];


        return Inertia::render(

            'NCC/Index',

            [

                'data' => $data,

            ]

        );
    }


    public function activity()
    {
        return response()->json(

            ActivityLog::with('user')

                ->latest()

                ->take(20)

                ->get()

        );
    }
}