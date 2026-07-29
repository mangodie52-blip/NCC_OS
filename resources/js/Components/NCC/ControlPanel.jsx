import KPICard from "./KPICard";


export default function ControlPanel({ data }) {


    return (

        <div
            className="
                relative
                text-slate-100
            "
        >


            {/* COMMAND AREA */}

            <div
                className="
                    grid
                    grid-cols-12
                    gap-5
                "
            >





                {/* SYSTEM STATUS */}


                <div
                    className="
                        col-span-4
                        bg-[#08111d]/80
                        backdrop-blur-xl
                        border
                        border-cyan-900/40
                        rounded-xl
                        p-5
                    "
                >


                    <div
                        className="
                            text-xs
                            tracking-[0.4em]
                            text-cyan-400
                            mb-5
                        "
                    >
                        SYSTEM STATUS
                    </div>




                    <SystemItem

                        label="CORE ENGINE"

                        value="ONLINE"

                    />



                    <SystemItem

                        label="DATABASE"

                        value="CONNECTED"

                    />



                    <SystemItem

                        label="PRODUCTION"

                        value="RUNNING"

                    />



                    <SystemItem

                        label="NETWORK"

                        value="STABLE"

                    />


                </div>








                {/* PERFORMANCE MONITOR */}


                <div
                    className="
                        col-span-8
                        bg-[#08111d]/80
                        backdrop-blur-xl
                        border
                        border-cyan-900/40
                        rounded-xl
                        p-5
                    "
                >


                    <div
                        className="
                            text-xs
                            tracking-[0.4em]
                            text-cyan-400
                        "
                    >
                        PERFORMANCE MONITOR
                    </div>




                    <div
                        className="
                            mt-8
                            h-40
                            flex
                            items-center
                            justify-center
                            text-slate-600
                            tracking-widest
                        "
                    >

                        REALTIME GRAPH MODULE


                    </div>


                </div>










                {/* KPI MODULE */}


                <div
                    className="
                        col-span-12
                        grid
                        grid-cols-4
                        gap-5
                    "
                >



                    <KPICard

                        title="PRODUCTION LOAD"

                        value={
                            data?.production ?? "0 RUNNING"
                        }

                        status="RUNNING"

                    />




                    <KPICard

                        title="MATERIAL FLOW"

                        value={
                            data?.material ?? "0%"
                        }

                        status="HEALTHY"

                    />





                    <KPICard

                        title="ACTIVE ORDER"

                        value={
                            data?.order ?? "0"
                        }

                        status="PROCESSING"

                    />





                    <KPICard

                        title="EFFICIENCY"

                        value={
                            data?.efficiency ?? "0%"
                        }

                        status="OPTIMAL"

                    />



                </div>



            </div>


        </div>

    );

}









function SystemItem({

    label,

    value

}){


    return (


        <div

            className="
                flex
                justify-between
                items-center
                py-3
                border-b
                border-slate-800
            "

        >


            <span

                className="
                    text-xs
                    text-slate-500
                    tracking-widest
                "

            >

                {label}


            </span>





            <span

                className="
                    text-xs
                    text-cyan-300
                    flex
                    items-center
                    gap-2
                "

            >


                <span

                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-cyan-400
                        animate-pulse
                    "

                />



                {value}


            </span>



        </div>


    )


}