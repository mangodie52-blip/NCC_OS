import { useEffect, useState } from "react";

import SpaceBackground from "@/Components/NCC/SpaceBackground";

import BootLogo from "./BootLogo";
import BootStatus from "./BootStatus";
import BootProgress from "./BootProgress";
import WelcomeScreen from "./WelcomeScreen";
import TransitionOverlay from "./TransitionOverlay";
import useBootSequence from "./BootSequence";

export default function BootScreen() {

    const {
        progress,
        message,
        completed,
    } = useBootSequence();

    const [showWelcome, setShowWelcome] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Boot Finished
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!completed) return;

        setShowWelcome(true);

        const welcomeTimer = setTimeout(() => {

            setFadeOut(true);

        }, 1800);

        return () => clearTimeout(welcomeTimer);

    }, [completed]);

    /*
    |--------------------------------------------------------------------------
    | Redirect after Fade
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!fadeOut) return;

        const redirectTimer = setTimeout(() => {

            // sementara pakai ini dulu
            window.location.href = "/dashboard";

            // nanti kita ganti:
            // router.visit(route("dashboard"));

        }, 1000);

        return () => clearTimeout(redirectTimer);

    }, [fadeOut]);

    return (

        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#070B12]
                text-slate-100
            "
        >

            {/* Background */}
            <SpaceBackground />

            {/* Boot Panel */}
            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-6
                "
            >

                <div
                    className="
                        w-full
                        max-w-xl
                        rounded-2xl
                        border
                        border-cyan-400/20
                        bg-slate-950/70
                        backdrop-blur-xl
                        p-10
                        shadow-[0_0_60px_rgba(34,211,238,.15)]
                    "
                >

                    <BootLogo />

                    <div className="mt-10">

                        <BootStatus
                            message={
                                completed
                                    ? "WELCOME TO NCC OS"
                                    : message
                            }
                        />

                    </div>

                    <div className="mt-8">

                        <BootProgress
                            progress={progress}
                        />

                    </div>

                </div>

            </div>

            {/* Welcome Screen */}
            {showWelcome && (
                <WelcomeScreen />
            )}

            {/* Fade Overlay */}
            <TransitionOverlay
                active={fadeOut}
            />

        </div>

    );

}