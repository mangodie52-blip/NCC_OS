export default function WelcomeScreen() {
    return (
        <div
            className="
                absolute
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-[#070B12]/95
                backdrop-blur-md
                animate-fadeIn
            "
        >
            <div className="text-center">

                <h1
                    className="
                        text-6xl
                        font-black
                        tracking-[0.35em]
                        text-cyan-300
                        drop-shadow-[0_0_30px_rgba(34,211,238,.5)]
                    "
                >
                    WELCOME
                </h1>

                <div
                    className="
                        mt-6
                        text-2xl
                        tracking-[0.4em]
                        text-slate-300
                    "
                >
                    TO NCC OS
                </div>

                <div
                    className="
                        mt-8
                        text-sm
                        tracking-[0.25em]
                        uppercase
                        text-cyan-400
                    "
                >
                    Observe • Analyze • Assist
                </div>

            </div>
        </div>
    );
}