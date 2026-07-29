export default function DangerButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

            className="
                bg-red-500
                hover:bg-red-400
                text-white
                font-semibold
                px-3
                py-2
                rounded-lg
                transition
                shadow-lg
                shadow-red-500/20
            "

        >
            {children}

        </button>

    );

}