import React from "react";
import PlanetHUD from "./PlanetHUD";


export default function Globe() {

    return (

        <div
            className="
                absolute
                right-16
                top-20
                w-80
                h-80
            "
        >

            <div
                className="
                    relative
                    w-full
                    h-full
                "
            >


                {/* HUD Above Planet */}
                <div
                    className="
                        absolute
                        -top-24
                        left-1/2
                        -translate-x-1/2
                        z-30
                    "
                >
                    <PlanetHUD />
                </div>



                {/* Atmospheric Glow */}
                <div
                    className="
                        absolute
                        inset-[-25px]
                        rounded-full
                        bg-cyan-400/10
                        blur-3xl
                    "
                />



                {/* Planet Surface */}
                <div
                    className="
                        absolute
                        inset-0
                        rounded-full
                        overflow-hidden
                        border
                        border-cyan-300/30
                        shadow-[0_0_80px_rgba(34,211,238,0.25)]
                    "
                >

                    {/* Earth */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-cover
                            bg-center
                            animate-earth
                        "
                        style={{
                            backgroundImage:
                            "url('/images/ncc/earth.jpg')"
                        }}
                    />


                    {/* Cloud */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-cover
                            opacity-30
                            animate-cloud
                        "
                        style={{
                            backgroundImage:
                            "url('/images/ncc/clouds.png')"
                        }}
                    />


                    {/* Night Side */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-transparent
                            via-transparent
                            to-black/70
                        "
                    />



                    {/* Communication Signal */}
                    <div
                        className="
                            absolute
                            right-20
                            top-24
                        "
                    >

                        <div
                            className="
                                w-2
                                h-2
                                bg-cyan-300
                                rounded-full
                            "
                        />


                        <div
                            className="
                                absolute
                                inset-[-8px]
                                rounded-full
                                border
                                border-cyan-300/50
                                animate-ping
                            "
                        />

                    </div>


                </div>



                {/* Atmosphere Rim */}
                <div
                    className="
                        absolute
                        inset-[-6px]
                        rounded-full
                        border
                        border-cyan-300/40
                        shadow-[0_0_40px_rgba(34,211,238,0.35)]
                        pointer-events-none
                    "
                />



                {/* Satellite Orbit */}
                <div
                    className="
                        absolute
                        inset-[-45px]
                        rounded-full
                        border
                        border-cyan-400/20
                        animate-spin
                        z-20
                    "
                    style={{
                        animationDuration:"90s"
                    }}
                >

                    <div
                        className="
                            absolute
                            top-0
                            left-1/2
                            w-2
                            h-2
                            rounded-full
                            bg-cyan-300
                            shadow-[0_0_15px_rgba(34,211,238,0.8)]
                        "
                    />

                </div>



                {/* Outer Orbit */}
                <div
                    className="
                        absolute
                        inset-[-35px]
                        rounded-full
                        border
                        border-cyan-400/10
                    "
                />


            </div>

        </div>

    );
}