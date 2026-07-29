import { useEffect, useState } from "react";

export default function FadeItem({

    children,

    delay = 0

}) {

    const [show, setShow] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {

            setShow(true);

        }, delay);

        return () => clearTimeout(timer);

    }, [delay]);

    return (

        <div
            className={`
                transition-all
                duration-700
                ${
                    show
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                }
            `}
        >

            {children}

        </div>

    );

}