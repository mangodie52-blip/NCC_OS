export default function PrimaryButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

            className="
                bg-cyan-500
                hover:bg-cyan-400
                text-slate-950
                font-semibold
                px-3
                py-2
                rounded-lg
                transition
                shadow-lg
                shadow-cyan-500/20
            "

        >
            {children}

        </button>

    );

}