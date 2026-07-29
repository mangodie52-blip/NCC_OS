import { useEffect, useState } from "react";
import { bootMessages } from "./BootMessages";

export default function useBootSequence() {

    const [progress, setProgress] = useState(0);

    const [messageIndex, setMessageIndex] = useState(0);

    const [completed, setCompleted] = useState(false);

    useEffect(() => {

        const timer = setInterval(() => {

            setProgress((prev) => {

                const next = Math.min(prev + Math.floor(Math.random() * 6 + 2), 100);

                const index = Math.min(
                    Math.floor((next / 100) * bootMessages.length),
                    bootMessages.length - 1
                );

                setMessageIndex(index);

                if (next >= 100) {

                    clearInterval(timer);

                    setCompleted(true);

                }

                return next;

            });

        }, 180);

        return () => clearInterval(timer);

    }, []);

    return {

        progress,

        message: bootMessages[messageIndex],

        completed

    };

}