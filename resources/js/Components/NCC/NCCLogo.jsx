export default function NCCLogo(){

    return (

        <div className="flex flex-col items-center">


            <div
                className="
                    relative
                    w-24
                    h-24
                    flex
                    items-center
                    justify-center
                "
            >


                <div
                    className="
                        absolute
                        inset-0
                        rounded-3xl
                        bg-cyan-400/20
                        blur-xl
                        animate-pulse
                    "
                />


                <div
                    className="
                        relative
                        text-5xl
                        font-black
                        text-cyan-400
                        tracking-widest
                    "
                >
                    N

                </div>


            </div>


            <div
                className="
                    mt-3
                    text-xl
                    font-bold
                    tracking-[0.35em]
                    text-white
                "
            >
                NCC OS
            </div>


            <div
                className="
                    text-xs
                    text-cyan-400
                    mt-1
                    tracking-widest
                "
            >
                NEATS CONTROL CENTER
            </div>


        </div>

    )

}