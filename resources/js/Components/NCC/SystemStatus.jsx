import React from "react";

export default function SystemStatus(){

    return (

        <div
            className="
                absolute
                top-8
                right-8
                z-30
                flex
                flex-col
                gap-2
                text-xs
                tracking-widest
                text-slate-400
            "
        >


            <div
                className="
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

                SYSTEM ONLINE

            </div>



            <div
                className="
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
                        bg-green-400
                    "
                />

                PRODUCTION ACTIVE

            </div>



            <div
                className="
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
                        bg-cyan-300
                    "
                />

                DATABASE CONNECTED

            </div>


        </div>

    );

}