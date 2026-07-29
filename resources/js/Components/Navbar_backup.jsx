import { Link, usePage } from "@inertiajs/react";
import { FaSearch, FaBars, FaCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import LogoN from "@/Pages/NCC/LogoN";


export default function Navbar() {

    const { auth } = usePage().props;

    const [now, setNow] = useState(new Date());


    useEffect(() => {

        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);


        return () => clearInterval(timer);

    }, []);


    const time = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });


    const date = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });


    return (

    <nav
        className="
            relative
            h-[72px]
            bg-[#0B1320]
            px-6
            flex
            items-center
            justify-between
        "
    >

        {/* Glow Line */}
       <div
    className="
        absolute
        bottom-0
        left-[56%]
        -translate-x-1/2
        w-80
        h-[2px]
        rounded-full
        bg-gradient-to-r
        from-transparent
        via-cyan-400/70
        to-transparent
    "
/>

        {/* Left */}
        <div className="flex items-center gap-5">

            <FaBars className="text-slate-400 text-xl cursor-pointer hover:text-cyan-400 transition" />

            <div className="flex items-center gap-3">

                <LogoN />

                <div>

                    <div
                        className="
                            text-xl
                            font-black
                            tracking-[3px]
                            text-white
                        "
                    >
                        NCC
                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-[10px]
                            uppercase
                            tracking-[3px]
                            text-cyan-400
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

                        Command Center

                    </div>

                </div>

            </div>

        </div>

        {/* Center */}
        <div className="w-[420px]">

            <div className="relative">

                <FaSearch className="absolute left-4 top-3.5 text-slate-500" />

                <input
                    type="text"
                    placeholder="Search Production, Material, SPK..."
                    className="
                        w-full
                        bg-[#111827]
                        border
                        border-[#223047]
                        rounded-xl
                        py-2.5
                        pl-11
                        pr-4
                        text-slate-200
                        placeholder:text-slate-500
                        focus:outline-none
                        focus:border-blue-500
                        transition
                    "
                />

            </div>

        </div>

        {/* Right */}
        <div className="hidden md:block text-right">

    <div className="flex items-center justify-end gap-2 mb-1">

        <FaCircle className="text-green-400 text-[8px] animate-pulse" />

        <span
            className="
                text-[10px]
                uppercase
                tracking-[2px]
                text-green-400
                font-semibold
            "
        >
            Factory Online
        </span>

    </div>

    <div className="text-white font-bold text-xl">
        {time}
    </div>

    <div className="text-xs text-slate-500 capitalize">
        {date}
    </div>

</div>

    </nav>

);

}