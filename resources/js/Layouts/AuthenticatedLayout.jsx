import Sidebar from "@/Components/Sidebar";

export default function AuthenticatedLayout({ children }) {

    return (

        <div
            className="
                h-screen
                overflow-hidden
                bg-[#070B12]
                text-slate-100
            "
        >

            <Sidebar />


            <main
                className="
                    ml-20
                    h-screen
                    overflow-hidden
                    p-4
                "
            >

                {children}

            </main>


        </div>

    );

}