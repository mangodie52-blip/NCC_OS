export default function KPICard({
    title,
    value,
    status,
    color="cyan"
}) {


const theme = {

    cyan:{
        border:"border-cyan-400/30",
        dot:"bg-cyan-400",
        text:"text-cyan-300",
        bar:"bg-cyan-400",
        glow:"shadow-cyan-400/40"
    },


    orange:{
        border:"border-orange-400/40",
        dot:"bg-orange-400",
        text:"text-orange-300",
        bar:"bg-orange-400",
        glow:"shadow-orange-400/40"
    },


    red:{
        border:"border-red-400/40",
        dot:"bg-red-400",
        text:"text-red-300",
        bar:"bg-red-400",
        glow:"shadow-red-400/40"
    }

};


const current = theme[color] || theme.cyan;



return (

<div
className={`
relative
overflow-hidden
rounded-xl
border
${current.border}
bg-slate-950/50
p-4
transition
hover:border-cyan-400/50
`}
>


{/* TOP */}

<div
className="
flex
justify-between
items-start
"
>


<p
className="
text-[10px]
tracking-[0.3em]
text-slate-500
"
>
{title}
</p>



<span
className={`
w-2
h-2
rounded-full
${current.dot}
shadow-lg
${current.glow}
`}
/>


</div>





{/* VALUE */}

<div
className="
mt-4
"
>

<h2
className={`
text-3xl
font-semibold
tracking-wider
${current.text}
`}
>
{value}
</h2>


</div>





{/* BAR */}

<div
className="
mt-4
h-1.5
rounded-full
bg-slate-800
overflow-hidden
"
>

<div

className={`
h-full
rounded-full
${current.bar}
shadow-lg
${current.glow}
`}

style={{
width:
typeof value === "string" &&
value.includes("%")
?
value
:
"65%"
}}

/>

</div>






{/* STATUS */}

<div
className="
mt-3
flex
items-center
gap-2
"
>


<span
className="
w-1.5
h-1.5
rounded-full
bg-green-400
"
/>


<span
className="
text-[10px]
tracking-widest
text-slate-400
"
>
{status}
</span>


</div>





{/* BACKGROUND EFFECT */}

<div
className={`
absolute
-right-8
-bottom-8
w-24
h-24
rounded-full
blur-2xl
${color==="orange"
?
"bg-orange-400/5"
:
color==="red"
?
"bg-red-400/5"
:
"bg-cyan-400/5"
}
`}
/>


</div>

);

}