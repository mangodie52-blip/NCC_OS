export default function AIMonitor({ data }) {

    return (

        <div
            className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900/50
                p-5
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-sm tracking-[0.25em] text-cyan-300">
                        AI MONITOR
                    </h2>

                    <p className="text-xs text-slate-500 mt-1">
                        FACTORY INTELLIGENCE
                    </p>

                </div>

                <span
                    className={
                        data?.status === "NORMAL"
                            ? "text-green-400"
                            : "text-yellow-400"
                    }
                >
                    {data?.status}
                </span>

            </div>

            <div
                className="
                    mt-5
                    rounded-lg
                    bg-[#0B1320]
                    border
                    border-slate-800
                    p-4
                "
            >

                <p className="text-sm text-slate-300">
                    {data?.message}
                </p>

            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">

                <Mini
                    title="HEALTH"
                    value={`${data?.health ?? 0}%`}
                />

                <Mini
                    title="RUNNING"
                    value={data?.running ?? 0}
                />

                <Mini
                    title="WAITING"
                    value={data?.waiting ?? 0}
                />

            </div>

        </div>

    );

}

function Mini({ title, value }) {

    return (

        <div
            className="
                rounded-lg
                bg-[#0B1320]
                border
                border-slate-800
                p-3
            "
        >

            <p className="text-[10px] tracking-widest text-slate-500">
                {title}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-cyan-300">
                {value}
            </h3>

        </div>

    );

}