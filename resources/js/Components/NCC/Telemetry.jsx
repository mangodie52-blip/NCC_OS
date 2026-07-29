export default function Telemetry({ telemetry }) {


    const items = [

        {
            name:"DATABASE",
            value: telemetry?.database
        },

        {
            name:"QUEUE WORKER",
            value: telemetry?.queue
        },

        {
            name:"CACHE",
            value: telemetry?.cache
        },

        {
            name:"SERVER",
            value: telemetry?.server
        },

    ];


    return (

        <div className="
            rounded-xl
            border
            border-cyan-400/20
            bg-slate-900/60
            p-5
        ">


            <h2 className="
                text-sm
                tracking-widest
                text-cyan-400
                mb-5
            ">
                SYSTEM TELEMETRY
            </h2>



            <div className="space-y-4">

                {items.map((item,index)=>(

                    <div key={index}>

                        <div className="
                            flex
                            justify-between
                            text-xs
                            text-slate-400
                        ">

                            <span>
                                {item.name}
                            </span>


                            <span className="
                                text-green-400
                            ">
                                ● {item.value}
                            </span>

                        </div>


                    </div>

                ))}

            </div>


        </div>

    );

}