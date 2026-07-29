import React, { useMemo } from "react";


export default function StarField() {


    const stars = useMemo(()=>{

        return Array.from({ length: 45 }).map(()=>({

            top: `${Math.random() * 100}%`,

            left:
            `${Math.random() * 100}%`,

            duration:
            `${3 + Math.random() * 5}s`,

            opacity:
            0.2 + Math.random() * 0.8

        }));

    },[]);



    return (

        <div
            className="
                absolute
                inset-0
                overflow-hidden
                pointer-events-none
            "
        >


            {stars.map((star,i)=>(

                <span
                    key={i}

                    className="
                        absolute
                        w-1
                        h-1
                        bg-cyan-200
                        rounded-full
                        animate-pulse
                    "

                    style={{

                        top: star.top,

                        left: star.left,

                        animationDuration:
                        star.duration,

                        opacity:
                        star.opacity

                    }}

                />

            ))}


        </div>

    );

}