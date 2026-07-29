<?php

namespace App\Services;

use App\Models\Material;
use App\Models\ProductionOrder;
use App\Models\MaterialRequest;
use App\Models\ProductionProgress;
use App\Models\ActivityLog;
use App\Models\ProductionOperation;



class NCCMonitoringService
{


    public function kpi()
    {

        return [

            'production_today' => ProductionProgress::whereDate(
                'tanggal',
                today()
            )
                ->sum('qty_selesai'),


            'active_order' => ProductionOrder::where(
                'status',
                '!=',
                'draft'
            )
                ->count(),


            'material_status' => $this->materialStatus(),


            'pending_action' => MaterialRequest::whereIn(
                'status',
                [
                    'Waiting Approval',
                    'Pending'
                ]
            )
                ->count(),

        ];
    }



    private function materialStatus()
    {

        $total = Material::count();


        if ($total == 0) {

            return 0;
        }


        $safe = Material::whereColumn(
            'stok',
            '>=',
            'stok_minimum'
        )
            ->count();



        return round(
            ($safe / $total) * 100
        );
    }



    public function activity()
    {

        return ActivityLog::latest()
            ->limit(10)
            ->get()
            ->map(function ($log) {

                return [

                    'type' => $log->module,

                    'message' => $log->activity,

                    'detail' => $log->description,

                    'time' => $log->created_at
                        ? $log->created_at->format('H:i')
                        : null,

                    'status' => 'info',

                ];
            });
    }

    public function factory()
{

    $operations = ProductionOperation::with(
        [
            'operation',
            'productionOrder'
        ]
    )
    ->latest()
    ->limit(5)
    ->get()
    ->map(function($item){

        return [

            'process' => $item->operation?->nama_operation ?? 'UNKNOWN',

            'status' => $item->status,

            'target' => $item->qty_target,

            'good' => $item->qty_good,

            'reject' => $item->qty_reject,

            'operator' => $item->operator,

        ];

    });


    return [

        'status' => 'ONLINE',

        'operations' => $operations,

    ];

}
}
