import LiveCurve from "./LiveCurve";
import ActivityCenter from "./ActivityCenter";
import MachineAINCC from "./MachineAINCC";
import Telemetry from "./Telemetry";

export default function FactoryMonitor({
    ai,
    factory,
    activity,
    telemetry,
}) {

    return (

        <div
            className="
                flex
                flex-col
                h-full
                gap-4
            "
        >

            {/* ===== TOP ===== */}

            <div
                className="
                    grid
                    grid-cols-10
                    gap-4
                "
            >

                <div className="col-span-7">

                    <LiveCurve
                        factory={factory}
                    />

                </div>

                <div className="col-span-3">

                    <ActivityCenter
                        activity={activity}
                    />

                </div>

            </div>


            {/* ===== MACHINE ===== */}

            <MachineAINCC
                factory={factory}
            />


            {/* ===== FACTORY PULSE ===== */}

            <Telemetry
                telemetry={telemetry}
            />

        </div>

    );

}