export default function FactoryMonitor({ data }) {

    const health = data?.health ?? 100;

    return (

        <div
            className="
                rounded-xl
                border
                border-cyan-500/10
                bg-slate-950/60
                p-5
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <h2
                        className="
                            text-sm
                            tracking-[0.25em]
                            text-cyan-300
                        "
                    >
                        FACTORY MONITOR
                    </h2>

                    <p
                        className="
                            text-xs
                            text-slate-500
                            mt-1
                        "
                    >
                        REALTIME FACTORY HEALTH
                    </p>

                </div>

                <div
                    className="
                        text-4xl
                        font-bold
                        text-cyan-300
                    "
                >
                    {health}%
                </div>

            </div>



            <div
                className="
                    mt-6
                    h-2
                    rounded-full
                    bg-slate-800
                    overflow-hidden
                "
            >

                <div

                    className="
                        h-full
                        bg-cyan-400
                        rounded-full
                        transition-all
                        duration-700
                    "

                    style={{

                        width: `${health}%`

                    }}

                />

            </div>



            <div
                className="
                    grid
                    grid-cols-3
                    gap-4
                    mt-6
                "
            >

                <Item

                    title="Production"

                    value={data?.running ?? 0}

                    suffix="Running"

                />

                <Item

                    title="Material"

                    value={data?.material ?? 0}

                    suffix="Items"

                />

                <Item

                    title="Warehouse"

                    value={data?.waiting ?? 0}

                    suffix="Waiting"

                />

            </div>



            <div
                className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-green-400
                    text-xs
                    tracking-widest
                "
            >

                <div
                    className="
                        h-2
                        w-2
                        rounded-full
                        bg-green-400
                        animate-pulse
                    "
                />

                SYSTEM ONLINE

            </div>

        </div>

    );

}



function Item({

    title,

    value,

    suffix

}) {

    return (

        <div
            className="
                rounded-lg
                border
                border-slate-800
                bg-[#0B1320]
                p-4
            "
        >

            <p
                className="
                    text-[10px]
                    text-slate-500
                    tracking-[0.2em]
                "
            >
                {title}
            </p>

            <h3
                className="
                    mt-2
                    text-xl
                    text-cyan-300
                    font-semibold
                "
            >
                {value}
            </h3>

            <p
                className="
                    text-[10px]
                    text-slate-500
                    mt-1
                "
            >
                {suffix}
            </p>

        </div>

    );

}