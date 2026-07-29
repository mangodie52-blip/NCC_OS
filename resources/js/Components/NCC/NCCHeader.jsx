import { useEffect, useState } from "react";

export default function NCCHeader() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const day = time.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const date = time.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).toUpperCase();

    const clock = time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    return (

        <header
            className="
                flex
                items-start
                justify-between
                mb-6
            "
        >

            {/* LEFT */}

            <div>

                <p
                    className="
                        text-cyan-400
                        text-xs
                        tracking-[0.35em]
                        font-bold
                        uppercase
                        mb-3
                    "
                >
                    AINCC
                </p>

                <h1
                    className="
                        text-4xl
                        font-black
                        tracking-wide
                        text-white
                    "
                >
                    NEATS CONTROL CENTER
                </h1>

                <p
                    className="
                        mt-2
                        text-sm
                        tracking-wide
                        text-slate-400
                    "
                >
                    Simple Technology, Real Impact
                </p>

            </div>

            {/* RIGHT */}

            <div className="text-right">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        text-slate-500
                    "
                >
                    {day}
                </p>

                <h2
                    className="
                        mt-2
                        text-5xl
                        font-black
                        font-mono
                        tracking-wider
                        text-white
                    "
                >
                    {clock}
                </h2>

                <p
                    className="
                        mt-2
                        text-sm
                        uppercase
                        tracking-[0.35em]
                        text-cyan-300
                    "
                >
                    {date}
                </p>

                <div
                    className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-emerald-400/20
                        bg-emerald-400/10
                        px-3
                        py-1
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-emerald-400
                    "
                >
                    <span
                        className="
                            h-2
                            w-2
                            rounded-full
                            bg-emerald-400
                            animate-pulse
                        "
                    />

                    SYSTEM ONLINE

                </div>

            </div>

        </header>

    );

}