export default function LiveCurve(){

    return (

        <svg
            viewBox="0 0 500 120"
            className="
                absolute
                bottom-0
                left-0
                w-full
                opacity-40
            "
        >

            <path
                d="
                M0 80
                C60 20,
                120 100,
                180 50
                S300 20,
                360 70
                S450 100,
                500 30
                "
                fill="none"
                stroke="cyan"
                strokeWidth="2"
            />

        </svg>

    )

}