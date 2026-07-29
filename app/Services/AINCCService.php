<?php

namespace App\Services;


class AINCCService
{

    public function status()
    {

        return [

            'name' => 'AINCC',

            'status' => 'ONLINE',

            'message' => 'AI NCC System Ready',

        ];

    }



    public function insight($kpi)
    {

        $insight = [];


        // MATERIAL ANALYSIS

        if($kpi['material_status'] >= 90)
        {

            $insight[] = [

                'type' => 'success',

                'message' =>
                'Material availability is optimal'

            ];

        }
        else
        {

            $insight[] = [

                'type' => 'warning',

                'message' =>
                'Material stock requires attention'

            ];

        }



        // PRODUCTION ANALYSIS

        if($kpi['production_today'] > 0)
        {

            $insight[] = [

                'type' => 'success',

                'message' =>
                'Production activity detected today'

            ];

        }
        else
        {

            $insight[] = [

                'type' => 'info',

                'message' =>
                'No production output recorded today'

            ];

        }



        // TASK ANALYSIS

        if($kpi['pending_action'] > 0)
        {

            $insight[] = [

                'type' => 'warning',

                'message' =>
                'Pending action requires attention'

            ];

        }
        else
        {

            $insight[] = [

                'type' => 'success',

                'message' =>
                'No pending action detected'

            ];

        }



        return $insight;

    }

}