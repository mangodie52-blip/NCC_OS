export default function NCCBackground(){

    return (

        <div className="absolute inset-0 overflow-hidden">


            {/* DARK BASE */}

            <div
                className="
                    absolute
                    inset-0
                    bg-[#040812]
                "
            />



            {/* CENTRAL DASHBOARD GLOW */}


            <div
                className="
                    absolute
                    top-1/2
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[700px]
                    h-[700px]
                    bg-cyan-500/10
                    rounded-full
                    blur-[150px]
                "
            />



            {/* CIRCUIT GRID */}


            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.12]

                    bg-[linear-gradient(90deg,rgba(0,255,255,.25)_1px,transparent_1px),
                    linear-gradient(rgba(0,255,255,.25)_1px,transparent_1px)]

                    bg-[size:60px_60px]
                "
            />


            {/* DASHBOARD PANELS */}
                              
        </div>

    )

}