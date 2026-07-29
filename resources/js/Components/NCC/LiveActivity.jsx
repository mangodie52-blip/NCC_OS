export default function LiveActivity() {


    const activities = [

        {
            time: "14:32:10",
            icon: "🏭",
            type: "PRODUCTION",
            message: "SPK-2401 production started"
        },


        {
            time: "14:33:42",
            icon: "📦",
            type: "WAREHOUSE",
            message: "Material request approved"
        },


        {
            time: "14:35:10",
            icon: "🤖",
            type: "AI NCC",
            message: "Production efficiency stable"
        },


        {
            time: "14:36:25",
            icon: "⚙",
            type: "SYSTEM",
            message: "Machine monitoring active"
        }

    ];





    return (

        <div
            className="
                rounded-xl
                border
                border-slate-800
                bg-slate-950/50
                p-5
                h-full
            "
        >





            {/* HEADER */}

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-5
                "
            >

                <div>

                    <h3
                        className="
                            text-xs
                            tracking-[0.3em]
                            text-slate-300
                        "
                    >
                        LIVE ACTIVITY
                    </h3>


                    <p
                        className="
                            text-[10px]
                            text-slate-600
                            mt-1
                        "
                    >
                        FACTORY EVENT STREAM
                    </p>


                </div>




                <div
                    className="
                        flex
                        items-center
                        gap-2
                        text-green-400
                        text-xs
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








            {/* EVENTS */}

            <div
                className="
                    space-y-3
                "
            >


                {
                    activities.map((item,index)=>(


                        <div
                            key={index}
                            className="
                                flex
                                gap-3
                                items-start
                                pb-3
                                border-b
                                border-slate-800/70
                                transition
                                hover:bg-slate-900/50
                                rounded-lg
                                px-2
                                py-2
                            "
                        >


                            {/* ICON */}

                            <div
                                className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    bg-slate-900
                                    border
                                    border-slate-800
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {item.icon}

                            </div>





                            <div
                                className="
                                    flex-1
                                "
                            >

                                <div
                                    className="
                                        flex
                                        justify-between
                                    "
                                >

                                    <span
                                        className="
                                            text-[10px]
                                            tracking-widest
                                            text-cyan-300
                                        "
                                    >
                                        {item.type}
                                    </span>



                                    <span
                                        className="
                                            text-[10px]
                                            text-slate-600
                                        "
                                    >
                                        {item.time}
                                    </span>


                                </div>




                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-slate-300
                                    "
                                >
                                    {item.message}
                                </p>


                            </div>




                        </div>


                    ))
                }


            </div>







        </div>

    );

}