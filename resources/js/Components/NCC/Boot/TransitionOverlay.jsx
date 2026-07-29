export default function TransitionOverlay({ active }) {

    return (

        <div
            className={`
                fixed
                inset-0
                z-[999]
                bg-[#070B12]
                transition-opacity
                duration-1000
                ${active ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
        />

    );

}