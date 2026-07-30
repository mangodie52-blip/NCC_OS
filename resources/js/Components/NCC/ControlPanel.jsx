import KPICard from "./KPICard";


export default function ControlPanel({ data }) {
function Row({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{label}</span>
            <span className="text-cyan-300">{value}</span>
        </div>
    );
}

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
            flex
            items-center
            justify-between
            mb-5
        "
    >

        <span
            className="
                text-xs
                tracking-[0.4em]
                text-cyan-400
            "
        >
            PERFORMANCE MONITOR
        </span>

        <span
            className="
                text-[10px]
                text-slate-500
                tracking-[0.3em]
            "
        >
            LIVE
        </span>

    </div>

    <div
        className="
            relative
            h-44
            overflow-hidden
            rounded-xl
            border
            border-cyan-500/10
            bg-slate-950/40
        "
    >

        {/* GRID */}

   

    <div
        className="
            absolute
            inset-0
            opacity-20
            bg-[linear-gradient(to_right,#164e63_1px,transparent_1px),linear-gradient(to_bottom,#164e63_1px,transparent_1px)]
            bg-[size:40px_40px]
        "
    />

    {/* GLOW */}

    <div
        className="
            absolute
            inset-0
            bg-gradient-to-t
            from-cyan-500/5
            to-transparent
        "
    />

    {/* CENTER LINE */}

    <div
        className="
            absolute
            inset-x-0
            top-1/2
            h-px
            bg-cyan-400/10
        "
    />

    <svg
        viewBox="0 0 900 220"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
    >

        <defs>

            <linearGradient
                id="performanceCurve"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
            >

                <stop offset="0%" stopColor="#06b6d4" />

                <stop offset="50%" stopColor="#22d3ee" />

                <stop offset="100%" stopColor="#67e8f9" />

            </linearGradient>

        </defs>

        {/* HIT AREA */}

<path
    d="
    M0 180
    C80 165 140 120 220 135
    S360 200 460 110
    S620 20 720 95
    S830 170 900 60
    "
    fill="none"
    stroke="transparent"
    strokeWidth="24"
    style={{ cursor: "pointer" }}
    onMouseMove={(e) => {

        console.log("Hover Curve");

        // nanti tooltip disini

    }}
    onMouseLeave={() => {

        console.log("Leave Curve");

    }}
/>

{/* CURVE */}

<path
    d="
    M0 180
    C80 165 140 120 220 135
    S360 200 460 110
    S620 20 720 95
    S830 170 900 60
    "
    fill="none"
    stroke="url(#performanceCurve)"
    strokeWidth="4"
    strokeLinecap="round"
>

    <animate
        attributeName="stroke-dasharray"
        values="0,1500;1500,0"
        dur="4s"
        repeatCount="indefinite"
    />

</path>

        {/* MOVING DOT */}

        <circle
            r="5"
            fill="#22d3ee"
        >

            <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="
                M0 180
                C80 165 140 120 220 135
                S360 200 460 110
                S620 20 720 95
                S830 170 900 60
                "
            />

        </circle>

    </svg>

    {/* LABEL */}

    <div
        className="
            absolute
            bottom-3
            right-4
            text-[10px]
            tracking-[0.35em]
            text-cyan-300/70
        "
    >
        LIVE TELEMETRY
    </div>

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