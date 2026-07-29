import React from "react";

import KPICard from "./KPICard";


export default function KPICommand({

    ncc = {}

}) {


    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-4
            "
        >



            <KPICard

                title="PRODUCTION"

                value={
                    ncc.production ?? 0
                }

                status="ACTIVE"

                icon="🏭"

            />





            <KPICard

                title="MATERIAL"

                value={
                    ncc.material ?? 0
                }

                status="STABLE"

                icon="📦"

            />






            <KPICard

                title="RUNNING"

                value={
                    ncc.running ?? 0
                }

                status="PROCESS"

                icon="⚙️"

            />







            <KPICard

                title="FINISHED"

                value={
                    ncc.finished ?? 0
                }

                status="DONE"

                icon="✓"

            />




        </div>

    );

}