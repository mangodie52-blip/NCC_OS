export default function BootStatus({ message }) {

    return (

        <div className="space-y-3">

            <div className="text-cyan-300 font-medium">

                {message}

            </div>

            <div className="text-sm text-slate-500">

                Preparing NCC OS...

            </div>

        </div>

    );

}