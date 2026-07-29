import {
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";



export default function ProductionCurve({ data }) {



    const chartData = data ?? [];



    const latestOutput =

        chartData.length > 0

        ?

        chartData[chartData.length - 1].value

        :

        0;





    const totalOutput = chartData.reduce(

        (total,item)=>

            total + Number(item.value || 0),

        0

    );






    return (


        <div

        className="
            rounded-xl
            border
            border-slate-800
            bg-slate-950/50
            p-4
        "

        >





            {/* HEADER */}

            <div

            className="
                flex
                justify-between
                items-center
                mb-4
            "

            >



                <div>


                    <h3

                    className="
                        text-xs
                        tracking-[0.3em]
                        text-slate-400
                    "

                    >

                        PRODUCTION PERFORMANCE

                    </h3>



                    <p

                    className="
                        text-[10px]
                        text-slate-600
                        mt-1
                    "

                    >

                        REALTIME OUTPUT MONITOR

                    </p>


                </div>






                <div

                className="
                    flex
                    items-center
                    gap-3
                "

                >



                    <div

                    className="
                        text-right
                    "

                    >


                        <p

                        className="
                            text-[10px]
                            text-slate-500
                        "

                        >

                            OUTPUT

                        </p>



                        <p

                        className="
                            text-sm
                            font-bold
                            text-cyan-300
                        "

                        >

                            {latestOutput} PCS

                        </p>


                    </div>





                    <div

                    className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-green-400
                    "

                    >


                        <span

                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-green-400
                            animate-pulse
                        "

                        />


                        LIVE


                    </div>



                </div>




            </div>








            {/* CHART */}

            <div

            className="
                h-64
            "

            >



                <ResponsiveContainer

                    width="100%"

                    height="100%"

                >


                    <LineChart

                        data={chartData}

                    >



                        <CartesianGrid

                            strokeDasharray="3 3"

                            stroke="#1e293b"

                        />





                        <XAxis

                            dataKey="time"

                            tick={{

                                fill:"#64748b",

                                fontSize:10

                            }}

                            axisLine={false}

                        />





                        <YAxis


                            tick={{

                                fill:"#64748b",

                                fontSize:10

                            }}


                            axisLine={false}


                        />






                        <Tooltip


                            contentStyle={{

                                background:"#0B1320",

                                border:
                                "1px solid rgba(34,211,238,.2)",

                                borderRadius:"10px",

                                color:"#67e8f9"

                            }}


                        />







                        <Line


                            type="monotone"


                            dataKey="value"


                            stroke="#22d3ee"


                            strokeWidth={3}


                            dot={false}


                            activeDot={{

                                r:6

                            }}



                        />





                    </LineChart>




                </ResponsiveContainer>



            </div>








            {/* FOOTER STATUS */}

            <div

            className="
                mt-4
                pt-3
                border-t
                border-slate-800
                flex
                justify-between
                text-xs
                text-slate-500
            "

            >


                <span>

                    TOTAL OUTPUT

                </span>



                <span

                className="
                    text-cyan-300
                    font-semibold
                "

                >

                    {totalOutput} PCS

                </span>


            </div>






        </div>


    );

}