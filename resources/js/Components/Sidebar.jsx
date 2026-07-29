import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";

import LogoN from "@/Pages/NCC/LogoN";

import {
    LayoutDashboard,
    Boxes,
    Package,
    GitBranch,
    Factory,
    Warehouse,
    FileText,
    Settings,
    LogOut,
    BriefcaseBusiness
} from "lucide-react";




export default function Sidebar(){


    const { url, props } = usePage();

    const user = props.auth?.user;


    const [openUser, setOpenUser] = useState(false);



    const menus = [

        {
            name:"Dashboard",
            icon:LayoutDashboard,
            url:"/ncc"
        },

        {
            name:"Material",
            icon:Boxes,
            url:"/material"
        },

        {
            name:"Product",
            icon:Package,
            url:"/products"
        },

        {
            name:"BOM",
            icon:GitBranch,
            url:"/boms"
        },

        {
            name:"Production",
            icon:Factory,
            url:"/production-orders"
        },

        {
            name:"Warehouse",
            icon:Warehouse,
            url:"/material-requests"
        },

        {
            name:"Report",
            icon:FileText,
            url:"#"
        },

        {
            name:"Settings",
            icon:Settings,
            url:"#"
        }

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
w-full
flex
items-center
justify-center
border-b
border-white/5
relative
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
menus.map((item)=>{


const Icon=item.icon;

const active=url.startsWith(item.url);



return (


<Link

key={item.name}

href={item.url}

className={`

relative
group
flex
items-center
gap-4
px-4
py-3
rounded-lg
text-sm
transition


${
active

?

`
bg-cyan-400/10
text-cyan-300
`

:

`

text-slate-400
hover:text-white
hover:bg-white/5

`

}

`}

>


{
active &&

<span

className="
absolute
left-0
top-2
bottom-2
w-[3px]
rounded-r
bg-cyan-400
shadow-[0_0_12px_#22d3ee]
"

/>

}



<Icon

size={19}

className={`

${
active

?

"text-cyan-400"

:

"text-slate-500 group-hover:text-cyan-300"

}

`}

/>


<span>

{item.name}

</span>



</Link>


)


})
}


</nav>







{/* USER */}

<div

className="
border-t
border-white/5
p-4
relative
"

>


<button

onClick={()=>setOpenUser(!openUser)}

className="
w-full
flex
items-center
justify-between
group
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





<div

className="
text-left
"

>

<p

className="
text-sm
text-white
"

>

{user?.name ?? "Neats Admin"}

</p>


<p

className="
text-xs
text-slate-500
"

>



</p>


</div>



</div>





<BriefcaseBusiness

size={22}

className={`

transition

${
openUser

?

"text-cyan-300 rotate-12"

:

"text-cyan-400"

}

`}

/>



</button>








{/* USER DETAIL */}

{
openUser &&

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
z-50
"

>


<div

className="
flex
items-center
gap-3
mb-4
"

>


<div

className="
w-10
h-10
rounded-full
bg-cyan-400/10
border
border-cyan-400/30
flex
items-center
justify-center
text-cyan-300
font-bold
"

>

{user?.name?.charAt(0) ?? "N"}

</div>



<div>

<p

className="
text-white
text-sm
font-semibold
"

>

{user?.name ?? "Neats Admin"}

</p>


<p

className="
text-xs
text-slate-500
"

>

Administrator

</p>


</div>


</div>





<button

onClick={()=>router.post('/logout')}

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

<LogOut size={16}/>

Logout

</button>



</div>

}


</div>





</aside>


)


}