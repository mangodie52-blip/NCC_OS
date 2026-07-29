export default function MaterialPanel({ data }) {

    const health = data?.health ?? 0;

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

                    <h2
                        className="
                            text-sm
                            tracking-[0.25em]
                            text-cyan-300
                        "
                    >
                        MATERIAL
                    </h2>

                    <p
                        className="
                            text-xs
                            text-slate-500
                            mt-1
                        "
                    >
                        INVENTORY HEALTH
                    </p>

                </div>

                <span
                    className="
                        text-3xl
                        font-bold
                        text-cyan-300
                    "
                >
                    {health}%
                </span>

            </div>



            <div className="mt-5">

                <div
                    className="
                        h-2
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
                            transition-all
                            duration-700
                        "

                        style={{

                            width: `${health}%`

                        }}

                    />

                </div>

            </div>



            <div
                className="
                    grid
                    grid-cols-2
                    gap-4
                    mt-6
                "
            >

                <MiniCard

                    title="TOTAL"

                    value={data?.total ?? 0}

                />

                <MiniCard

                    title="LOW STOCK"

                    value={data?.low ?? 0}

                />

            </div>

        </div>

    );

}



function MiniCard({ title, value }) {

    return (

        <div
            className="
                rounded-lg
                bg-[#0D1522]
                border
                border-slate-800
                p-4
            "
        >

            <p
                className="
                    text-[10px]
                    tracking-[0.2em]
                    text-slate-500
                "
            >
                {title}
            </p>

            <h3
                className="
                    text-2xl
                    mt-2
                    text-cyan-300
                    font-semibold
                "
            >
                {value}
            </h3>

        </div>

    );

}