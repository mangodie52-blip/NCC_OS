export default function WarehousePanel({ data }) {

    return (

        <div
            className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900/40
                p-5
                min-h-[260px]
            "
        >

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-5
                "
            >

                <h2
                    className="
                        text-xs
                        tracking-[0.3em]
                        text-cyan-300
                    "
                >
                    WAREHOUSE STATUS
                </h2>


                <span
                    className="
                        text-[10px]
                        text-slate-500
                        tracking-widest
                    "
                >
                    LIVE
                </span>


            </div>



            <div className="space-y-4">


                <div
                    className="
                        flex
                        justify-between
                        items-center
                        rounded-lg
                        bg-slate-800/40
                        p-3
                    "
                >

                    <span className="text-xs text-slate-400">
                        WAITING REQUEST
                    </span>

                    <span className="text-cyan-300 font-bold">
                        {data?.waiting ?? 0}
                    </span>

                </div>



                <div
                    className="
                        flex
                        justify-between
                        items-center
                        rounded-lg
                        bg-slate-800/40
                        p-3
                    "
                >

                    <span className="text-xs text-slate-400">
                        READY MATERIAL
                    </span>

                    <span className="text-green-400 font-bold">
                        {data?.ready ?? 0}
                    </span>

                </div>



                <div
                    className="
                        flex
                        justify-between
                        items-center
                        rounded-lg
                        bg-slate-800/40
                        p-3
                    "
                >

                    <span className="text-xs text-slate-400">
                        TOTAL STOCK
                    </span>

                    <span className="text-white font-bold">
                        {data?.total ?? 0}
                    </span>

                </div>


            </div>


        </div>

    );

}