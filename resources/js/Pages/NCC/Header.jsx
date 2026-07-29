import { useEffect, useState } from "react";
import LogoN from "./LogoN";

export default function Header({ user }) {

    const [time, setTime] = useState(new Date());

    useEffect(() => {

        const interval = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div
            className="
                rounded-3xl
                border
                border-cyan-500/20
                bg-slate-900/70
                backdrop-blur-xl
                shadow-[0_0_35px_rgba(0,216,255,.08)]
                px-8
                py-5
                flex
                items-center
                justify-between
            "
        >

            {/* LEFT */}

            <div className="flex items-center gap-6">

                <LogoN />

                <div>

                    <div
                        className="
                            text-xs
                            tracking-[0.45em]
                            uppercase
                            text-cyan-400
                        "
                    >
                        NCC OS V2
                    </div>

                    <h1
                        className="
                            mt-1
                            text-3xl
                            font-black
                            tracking-wider
                            text-white
                        "
                    >
                        NEATS
                        <span className="text-cyan-400">
                            {" "}CONTROL CENTER
                        </span>
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Manufacturing Operating System
                    </p>

                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            gap-2
                            text-[11px]
                        "
                    >
                        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-green-400">
                            ● SYSTEM ONLINE
                        </span>

                        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-cyan-400">
                            AI CONNECTED
                        </span>

                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-400">
                            NCC COMMAND MODE
                        </span>
                    </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="text-right">

                <div
                    className="
                        text-5xl
                        font-black
                        tracking-widest
                        text-cyan-400
                    "
                >
                    {time.toLocaleTimeString("id-ID")}
                </div>

                <div
                    className="
                        mt-2
                        text-sm
                        tracking-widest
                        uppercase
                        text-slate-400
                    "
                >
                    {time.toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                </div>

                <div className="mt-4 border-t border-slate-700 pt-3">

                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        Operator
                    </div>

                    <div className="mt-1 text-lg font-bold text-white">
                        {user.name}
                    </div>

                    <div className="text-sm text-cyan-400">
                        Manufacturing Control
                    </div>

                </div>

            </div>

        </div>

    );

}