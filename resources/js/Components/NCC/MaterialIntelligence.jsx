import React from "react";


export default function MaterialIntelligence({

    material = {}

}) {


    const data = [

        {
            label: "TOTAL MATERIAL",
            value: material.total ?? 0,
            status: "REGISTERED",
            color: "text-cyan-300"
        },


        {
            label: "READY STOCK",
            value: material.ready ?? 0,
            status: "AVAILABLE",
            color: "text-green-400"
        },


        {
            label: "LOW STOCK",
            value: material.warning ?? 0,
            status: "WARNING",
            color: "text-yellow-400"
        },


        {
            label: "OUT OF STOCK",
            value: material.critical ?? 0,
            status: "CRITICAL",
            color: "text-red-400"
        }

    ];



    return (

        <div
            className="
                rounded-2xl
                border
                border-cyan-400/20
                bg-slate-900/50
                backdrop-blur-md
                p-6
                hover:border-cyan-300/40
                transition
            "
        >



            <div
                className="
                    text-cyan-200
                    font-bold
                    tracking-widest
                    text-sm
                    mb-5
                "
            >
                MATERIAL INTELLIGENCE
            </div>




            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                "
            >



                {data.map((item,index)=>(


                    <div
                        key={index}
                        className="
                            rounded-xl
                            border
                            border-slate-700/50
                            bg-slate-950/40
                            p-4
                            hover:border-cyan-400/30
                            transition
                        "
                    >



                        <div
                            className="
                                text-xs
                                text-slate-400
                            "
                        >
                            {item.label}
                        </div>




                        <div
                            className="
                                mt-2
                                text-3xl
                                font-black
                                text-white
                            "
                        >
                            {item.value}
                        </div>




                        <div
                            className={`
                                mt-2
                                text-xs
                                ${item.color}
                                flex
                                items-center
                                gap-2
                            `}
                        >


                            <span
                                className={`
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-current
                                    ${
                                        item.status === "CRITICAL"
                                        ? "animate-pulse"
                                        : ""
                                    }
                                `}
                            />


                            {item.status}


                        </div>



                    </div>


                ))}


            </div>


        </div>

    );

}