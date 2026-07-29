import React, { useEffect, useState } from "react";


export default function SystemBoot(){

    const [show,setShow] = useState(true);


    useEffect(()=>{

        const timer = setTimeout(()=>{

            setShow(false);

        },3500);


        return ()=>clearTimeout(timer);

    },[]);



    if(!show) return null;



    return (

        <div
            className="
                fixed
                inset-0
                z-50
                bg-[#070B12]/95
                backdrop-blur-sm
                flex
                items-center
                justify-center
            "
        >

            <div
                className="
                    text-center
                    text-cyan-300
                    tracking-widest
                "
            >


                {/* NCC Core Logo */}
                <div
                    className="
                        text-6xl
                        font-black
                        mb-6
                        animate-pulse
                        text-cyan-200
                        drop-shadow-[0_0_25px_rgba(34,211,238,0.8)]
                    "
                >
                    N
                </div>


                <div
                    className="
                        w-32
                        h-[1px]
                        bg-cyan-400/40
                        mx-auto
                        mb-6
                    "
                />



                <div className="space-y-3 text-sm">


                    <div>
                        INITIALIZING NCC...
                    </div>


                    <div>
                        CONNECTING PLANET LINK...
                    </div>


                    <div>
                        EARTH MONITOR ONLINE
                    </div>


                    <div
                        className="
                            text-green-400
                        "
                    >
                        SYSTEM READY
                    </div>


                </div>


            </div>


        </div>

    );

}