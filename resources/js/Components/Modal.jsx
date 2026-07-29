import { useEffect } from "react";

export default function Modal({
    children,
    show = false,
    onClose = () => {},
}) {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (show) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-slate-950/70
                backdrop-blur-sm
                p-4
            "
            onClick={onClose}
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full
                    max-w-3xl

                    rounded-2xl

                    border
                    border-cyan-500/20

                    bg-gradient-to-b
                    from-slate-900
                    to-slate-950

                    shadow-2xl
                    shadow-cyan-900/20

                    overflow-hidden

                    animate-in
                    fade-in
                    zoom-in-95
                    duration-200
                "
            >

                {children}

            </div>

        </div>
    );
}