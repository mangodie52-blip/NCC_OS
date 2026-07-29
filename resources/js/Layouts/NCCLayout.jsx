import Sidebar from "@/Components/Sidebar";

export default function NCCLayout({ children }) {

    return (

        <div
            className="
                h-screen
                bg-[#070B12]
                overflow-hidden
            "
        >

            <Sidebar />

            <main
                className="
                    ml-[216px]
                    h-screen
                    overflow-y-auto
                    bg-[#070B12]
                    p-6
                "
            >

                {children}

            </main>

        </div>

    );

}