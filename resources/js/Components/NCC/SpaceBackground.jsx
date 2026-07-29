import React from "react";
import StarField from "./StarField";
import Globe from "./Globe";

export default function SpaceBackground() {

    return (

        <div
            className="
                fixed
                inset-0
                overflow-hidden
                bg-[#070B12]
                -z-10
            "
        >

            {/* Deep Space Gradient */}
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-cyan-900/20
                    via-transparent
                    to-blue-900/20
                "
            />


            {/* Stars */}
            <StarField />


            {/* Planet System */}
            <Globe />


        </div>

    );
}