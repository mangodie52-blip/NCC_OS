export default function NCCPanel({
    title,
    children,
    right = null,
}) {

    return (

        <div
            className="
                h-full
                rounded-xl
                bg-slate-900/30
                border
                border-cyan-400/10
                backdrop-blur-md
                overflow-hidden
            "
        >

            {/* Header */}

            <div
                className="
                    h-10
                    px-4

                    flex
                    items-center
                    justify-between

                    border-b
                    border-cyan-400/10
                "
            >

                <h2
                    className="
                        text-xs
                        uppercase
                        tracking-[0.35em]
                        font-semibold
                        text-cyan-300
                    "
                >

                    {title}

                </h2>

                {right}

            </div>

            {/* Body */}

            <div
                className="
                    h-[calc(100%-40px)]
                    p-4
                "
            >

                {children}

            </div>

        </div>

    );

}