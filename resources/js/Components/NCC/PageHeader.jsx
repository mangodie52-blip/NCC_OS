export default function PageHeader({ ai }) {

    return (

        <div className="
            flex
            justify-between
            items-center
            mb-8
        ">

            <div>

                <h1 className="
                    text-3xl
                    font-bold
                    tracking-widest
                    text-cyan-400
                ">
                    NEATS CONTROL CENTER
                </h1>


                <p className="
                    text-sm
                    text-slate-400
                    mt-2
                ">
                    Manufacturing Intelligence System
                </p>

            </div>


            <div className="
                rounded-xl
                border
                border-cyan-400/20
                bg-slate-900/50
                px-5
                py-3
                text-right
            ">

                <div className="text-xs text-slate-400">
                    AI ENGINE
                </div>


                <div className="text-cyan-400 font-bold">
                    ● {ai?.status}
                </div>

            </div>


        </div>

    );

}