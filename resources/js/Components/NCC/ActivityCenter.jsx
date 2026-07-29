import NCCPanel from "./NCCPanel";

export default function ActivityCenter({ activity }) {

    return (

        <NCCPanel
            title="LIVE ACTIVITY"
        >

            <div
                className="
                    h-full
                    flex
                    flex-col
                    gap-3
                    overflow-hidden
                "
            >

                {/* Activity Stream */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        pr-2
                        space-y-3
                    "
                >

                    <div className="flex items-start gap-3">

                        <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>

                        <div>

                            <p className="text-white text-sm">

                                SPK-001 Started

                            </p>

                            <span className="text-xs text-slate-500">

                                09:15

                            </span>

                        </div>

                    </div>


                    <div className="flex items-start gap-3">

                        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>

                        <div>

                            <p className="text-white text-sm">

                                Material Request Approved

                            </p>

                            <span className="text-xs text-slate-500">

                                09:18

                            </span>

                        </div>

                    </div>


                    <div className="flex items-start gap-3">

                        <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>

                        <div>

                            <p className="text-white text-sm">

                                AI Detected Delay

                            </p>

                            <span className="text-xs text-slate-500">

                                09:22

                            </span>

                        </div>

                    </div>


                    <div className="flex items-start gap-3">

                        <div className="w-2 h-2 rounded-full bg-red-400 mt-2"></div>

                        <div>

                            <p className="text-white text-sm">

                                Line 03 Stopped

                            </p>

                            <span className="text-xs text-slate-500">

                                09:28

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </NCCPanel>

    );

}