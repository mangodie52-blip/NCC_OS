export default function BagIcon(){

    return (

        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="
                text-cyan-400
                group-hover:scale-110
                transition
                duration-300
            "
        >

            <path
                d="
                M7 8V6.5
                C7 5.67 7.67 5 8.5 5
                H15.5
                C16.33 5 17 5.67 17 6.5
                V8
                "
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />


            <rect
                x="4"
                y="8"
                width="16"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
            />


            <path
                d="
                M4 12H20
                "
                stroke="currentColor"
                strokeWidth="1.8"
            />


            <path
                d="
                M10 12V14
                H14
                V12
                "
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />


        </svg>

    )

}