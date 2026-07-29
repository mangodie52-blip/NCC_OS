import NCCBackground from "@/Components/NCC/NCCBackground";


export default function GuestLayout({children}){


    return (

        <div
            className="
                min-h-screen
                bg-[#040812]
                text-white
                overflow-hidden
                relative
            "
        >


            <NCCBackground />



            <div
                className="
                    relative
                    z-10
                    min-h-screen
                    flex
                    items-center
                    justify-center
                "
            >

                {children}

            </div>



        </div>

    )

}