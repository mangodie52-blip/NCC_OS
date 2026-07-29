import NCCPanel from "./NCCPanel";

export default function MachineAINCC({ factory }) {

    const lines = [
        { name: "LINE 01", progress: 100, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 02", progress: 92, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 03", progress: 15, status: "STOPPED", color: "bg-red-400" },
        { name: "LINE 04", progress: 78, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 05", progress: 65, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 06", progress: 0, status: "OFFLINE", color: "bg-slate-500" },
        { name: "LINE 07", progress: 83, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 08", progress: 97, status: "RUNNING", color: "bg-green-400" },
        { name: "LINE 09", progress: 55, status: "RUNNING", color: "bg-yellow-400" },
        { name: "LINE 10", progress: 100, status: "OVERTIME", color: "bg-cyan-400" },
    ];

    return (

        <NCCPanel title="MACHINE AINCC">

            <div
                className="
                    h-full
                    grid
                    grid-cols-2
                    gap-4
                "
            >

                {lines.map((line) => (

                    <div
                        key={line.name}
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >

                        {/* Status Lamp */}

                        <div
                            className={`
                                w-3
                                h-3
                                rounded-full
                                ${line.color}
                            `}
                        />

                        {/* Line */}

                        <div className="flex-1">

                            <div className="flex justify-between text-xs mb-1">

                                <span className="text-white">

                                    {line.name}

                                </span>

                                <span className="text-slate-400">

                                    {line.status}

                                </span>

                            </div>

                            <div
                                className="
                                    h-2
                                    rounded-full
                                    bg-slate-800
                                    overflow-hidden
                                "
                            >

                                <div
                                    className={`
                                        h-full
                                        ${line.color}
                                    `}
                                    style={{
                                        width: `${line.progress}%`
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </NCCPanel>

    );

}