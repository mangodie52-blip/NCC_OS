import Sidebar from "@/Components/Sidebar";
import GudangNotificationListener from "@/Components/GudangNotificationListener";

export default function AppLayout({ children }) {

    return (

        <div
            className="
                flex
                h-screen
                overflow-hidden
                bg-[#05070A]
                text-slate-100
            "
        >

            {/* Global Notification */}
            <GudangNotificationListener />

            {/* Sidebar */}
            <Sidebar />

            {/* Content Area */}
            <div
                className="
                    flex-1
                    flex
                    flex-col
                    overflow-hidden
                "
            >
       
                {/* Main Content */}
                <main
                    className="
                        relative
                        flex-1
                        overflow-y-auto
                        bg-gradient-to-br
                        from-[#05070A]
                        via-[#09111B]
                        to-[#05070A]
                        px-6
                        py-6
                    "
                >

                    {/* Ambient Glow */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                absolute
                                -top-32
                                left-1/2
                                h-96
                                w-96
                                -translate-x-1/2
                                rounded-full
                                bg-cyan-500/5
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-0
                                right-0
                                h-80
                                w-80
                                rounded-full
                                bg-blue-500/5
                                blur-3xl
                            "
                        />
                    </div>

                    {/* Dashboard Content */}
                    <div className="relative z-10">

                        {children}

                    </div>

                </main>

            </div>

        </div>

    );

}