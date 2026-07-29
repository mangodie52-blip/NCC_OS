import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import Calculator from "@/Components/NCC/Utilities/Calculator/Calculator";
import TalkAA from "@/Components/NCC/Assistant/TalkAA";
import LogoN from "@/Pages/NCC/LogoN";
import {
    LayoutDashboard,
    Boxes,
    Package,
    GitBranch,
    Factory,
    Warehouse,
    Calculator as CalculatorIcon,
    Bot,
    LogOut,
    BriefcaseBusiness,
    UsersRound,
} from "lucide-react";

export default function Sidebar() {

    const { url, props } = usePage();

    const user = props.auth?.user;

    const [openUser, setOpenUser] = useState(false);

    const [openCalculator, setOpenCalculator] = useState(false);

    const [openAA, setOpenAA] = useState(false);

    const menus = [

        {
            name: "Dashboard",
            icon: LayoutDashboard,
            url: "/ncc",
        },

        {
            name: "Material",
            icon: Boxes,
            url: "/material",
        },

        {
            name: "Product",
            icon: Package,
            url: "/products",
        },

        {
            name: "BOM",
            icon: GitBranch,
            url: "/boms",
        },

        {
            name: "Production",
            icon: Factory,
            url: "/production-orders",
        },

    
        {
            name: "Warehouse",
            icon: Warehouse,
            url: "/material-requests",
        },

    {
    name: "Operator Center",
    icon: UsersRound,
    url: "/production-progresses",
},

        {
            name: "Talk To AA",
            icon: Bot,
            action: "talk-aa",
        },

        {
            name: "Calculator",
            icon: CalculatorIcon,
            action: "calculator",
        },

    ];

    return (

        <aside

            className="
            fixed
            left-0
            top-0
            h-screen
            w-[216px]
            bg-[#050C14]
            border-r
            border-cyan-400/10
            flex
            flex-col
            z-50
            "

        >

            {/* LOGO */}

            <div

                className="
                h-48
                flex
                items-center
                justify-center
                border-b
                border-white/5
                "

            >

                <LogoN />

            </div>

            {/* MENU */}

            <nav

                className="
                flex-1
                px-4
                py-6
                space-y-2
                "

            >

                {

                    menus.map((item) => {

                        const Icon = item.icon;

                        const active = item.url
                            ? url.startsWith(item.url)
                            : false;

                        // TALK TO AA
                        if (item.action === "talk-aa") {

                            return (

                                <button

                                    key={item.name}

                                    onClick={() => setOpenAA(true)}

                                    className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-4
                                    py-3
                                    rounded-lg
                                    text-sm
                                    text-slate-400
                                    hover:text-white
                                    hover:bg-white/5
                                    transition
                                    "

                                >

                                    <Icon

                                        size={19}

                                        className="
                                        text-slate-500
                                        group-hover:text-orange-300
                                        "

                                    />

                                    <span>

                                        {item.name}

                                    </span>

                                </button>

                            );

                        }

                        // CALCULATOR
                        if (item.action === "calculator") {

                            return (

                                <button

                                    key={item.name}

                                    onClick={() => setOpenCalculator(true)}

                                    className="
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-4
                                    py-3
                                    rounded-lg
                                    text-sm
                                    text-slate-400
                                    hover:text-white
                                    hover:bg-white/5
                                    transition
                                    "

                                >

                                    <Icon

                                        size={19}

                                        className="
                                        text-slate-500
                                        group-hover:text-cyan-300
                                        "

                                    />

                                    <span>

                                        {item.name}

                                    </span>

                                </button>

                            );

                        }

                        return (

                            <Link

                                key={item.name}

                                href={item.url}

                                className={`
                                relative
                                flex
                                items-center
                                gap-4
                                px-4
                                py-3
                                rounded-lg
                                text-sm
                                transition

                                ${active
                                    ? "bg-cyan-400/10 text-cyan-300"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }
                                `}

                            >

                                {

                                    active && (

                                        <span

                                            className="
                                            absolute
                                            left-0
                                            top-2
                                            bottom-2
                                            w-[3px]
                                            rounded-r
                                            bg-cyan-400
                                            "

                                        />

                                    )

                                }

                                <Icon

                                    size={19}

                                    className={
                                        active
                                            ? "text-cyan-400"
                                            : "text-slate-500"
                                    }

                                />

                                <span>

                                    {item.name}

                                </span>

                            </Link>

                        );

                    })

                }

            </nav>
            {/* USER PANEL */}

            <div

                className="
                border-t
                border-white/5
                p-4
                relative
                "

            >

                <button

                    onClick={() => setOpenUser(!openUser)}

                    className="
                    w-full
                    flex
                    items-center
                    justify-between
                    "

                >

                    <div

                        className="
                        flex
                        items-center
                        gap-3
                        "

                    >

                        <div

                            className="
                            w-9
                            h-9
                            rounded-full
                            bg-cyan-400/10
                            border
                            border-cyan-400/30
                            flex
                            items-center
                            justify-center
                            text-cyan-300
                            "

                        >

                            {user?.name?.charAt(0) ?? "N"}

                        </div>

                        <div>

                            <p className="text-sm text-white">

                                {user?.name ?? "Neats Admin"}

                            </p>

                            <p className="text-xs text-slate-500">

                                Administrator

                            </p>

                        </div>

                    </div>

                    <BriefcaseBusiness

                        size={20}

                        className="text-cyan-400"

                    />

                </button>

                {

                    openUser && (

                        <div

                            className="
                            absolute
                            bottom-20
                            left-4
                            right-4
                            bg-[#0b1320]
                            border
                            border-cyan-400/20
                            rounded-xl
                            p-4
                            shadow-2xl
                            "

                        >

                            <button

                                onClick={() => router.post("/logout")}

                                className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-2
                                rounded-lg
                                bg-red-500/10
                                text-red-400
                                hover:bg-red-500
                                hover:text-white
                                transition
                                "

                            >

                                <LogOut size={16} />

                                Logout

                            </button>

                        </div>

                    )

                }

            </div>

            {/* CALCULATOR */}

            {

                openCalculator && (

                    <div

                        className="
                        fixed
                        right-8
                        bottom-8
                        z-[100]
                        "

                    >

                        <Calculator />

                    </div>

                )

            }

            {/* TALK TO AA */}

            {

                openAA && (

                    <TalkAA

                        onMinimize={() => setOpenAA(false)}

                    />

                )

            }

        </aside>

    );

}