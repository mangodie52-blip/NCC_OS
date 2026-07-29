export default function BootProgress({ progress }) {

    return (

        <div>

            <div className="h-2 rounded-full overflow-hidden bg-slate-800">

                <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

            <div className="mt-3 flex justify-between text-xs">

                <span className="text-slate-500">

                    Boot Progress

                </span>

                <span className="text-cyan-300">

                    {progress}%

                </span>

            </div>

        </div>

    );

}