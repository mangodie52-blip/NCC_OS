import { useEffect, useState } from "react";

export default function DashboardEntrance({ children }) {

    const [ready, setReady] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {

            setReady(true);

        }, 150);

        return () => clearTimeout(timer);

    }, []);

    return (

        <div
            className={`
                transition-all
                duration-700
                ease-out
                ${
                    ready
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                }
            `}
        >

            {children}

        </div>

    );

}