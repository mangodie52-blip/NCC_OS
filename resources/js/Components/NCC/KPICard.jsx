export default function KPICard({
    title,
    value,
    status
}) {


    return (

        <div
            className="
                relative
                overflow-hidden
                rounded-xl
                border
                border-slate-800
                bg-slate-950/50
                p-4
                transition
                hover:border-cyan-400/30
            "
        >


            {/* TOP */}

            <div
                className="
                    flex
                    justify-between
                    items-start
                "
            >


                <p
                    className="
                        text-[10px]
                        tracking-[0.3em]
                        text-slate-500
                    "
                >
                    {title}
                </p>


                <span
                    className="
                        w-2
                        h-2
                        rounded-full
                        bg-cyan-400
                        shadow-lg
                        shadow-cyan-400/50
                    "
                />

            </div>







            {/* VALUE */}

            <div
                className="
                    mt-4
                "
            >

                <h2
                    className="
                        text-3xl
                        font-semibold
                        tracking-wider
                        text-cyan-300
                    "
                >
                    {value}
                </h2>


            </div>








            {/* BAR */}

            <div
                className="
                    mt-4
                    h-1.5
                    rounded-full
                    bg-slate-800
                    overflow-hidden
                "
            >

                <div
                    className="
                        h-full
                        rounded-full
                        bg-cyan-400
                        shadow-lg
                        shadow-cyan-400/40
                    "
                    style={{
                        width:
                            typeof value === "string" &&
                            value.includes("%")
                            ?
                            value
                            :
                            "65%"
                    }}
                />

            </div>









            {/* STATUS */}

            <div
                className="
                    mt-3
                    flex
                    items-center
                    gap-2
                "
            >

                <span
                    className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-green-400
                    "
                />


                <span
                    className="
                        text-[10px]
                        tracking-widest
                        text-slate-400
                    "
                >
                    {status}
                </span>


            </div>








            {/* BACKGROUND EFFECT */}

            <div
                className="
                    absolute
                    -right-8
                    -bottom-8
                    w-24
                    h-24
                    rounded-full
                    bg-cyan-400/5
                    blur-2xl
                "
            />


        </div>

    );

}