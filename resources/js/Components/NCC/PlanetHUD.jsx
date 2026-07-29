import React from "react";

export default function PlanetHUD() {

    return (

        <div
            className="
                w-44
                rounded-xl
                border
                border-cyan-400/20
                bg-slate-950/60
                backdrop-blur-md
                p-4
                text-xs
                text-cyan-300
                tracking-widest
                shadow-[0_0_30px_rgba(34,211,238,0.15)]
            "
        >

            <div
                className="
                    text-cyan-200
                    font-bold
                    mb-3
                "
            >
                EARTH MONITOR
            </div>


            <div
                className="
                    space-y-2
                    text-slate-400
                "
            >

                <div>
                    STATUS:
                    <span
                        className="
                            text-green-400
                            ml-2
                        "
                    >
                        ONLINE
                    </span>
                </div>


                <div>
                    LINK:
                    <span
                        className="
                            text-cyan-300
                            ml-2
                        "
                    >
                        ACTIVE
                    </span>
                </div>


                <div>
                    SIGNAL:
                    <span
                        className="
                            text-cyan-300
                            ml-2
                        "
                    >
                        98%
                    </span>
                </div>


            </div>

        </div>

    );

}