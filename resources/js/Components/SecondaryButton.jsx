export default function SecondaryButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

            className="
                bg-slate-700
                hover:bg-slate-600
                text-slate-100
                px-3
                py-2
                rounded-lg
                border
                border-slate-600
                transition
            "

        >
            {children}

        </button>

    );

}