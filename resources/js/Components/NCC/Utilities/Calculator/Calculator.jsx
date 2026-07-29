import { useState } from "react";

import {
    Calculator as CalculatorIcon,
    Minus,
    X
} from "lucide-react";


export default function Calculator(){


    const [open,setOpen] = useState(true);


    const [display,setDisplay] = useState("0");



    const [position,setPosition] = useState({
        x:100,
        y:100
    });


    const [dragging,setDragging] = useState(false);


    const [offset,setOffset] = useState({
        x:0,
        y:0
    });





    const startDrag=(e)=>{

        setDragging(true);

        setOffset({

            x:e.clientX-position.x,

            y:e.clientY-position.y

        });

    };



    const onDrag=(e)=>{

        if(!dragging) return;


        setPosition({

            x:e.clientX-offset.x,

            y:e.clientY-offset.y

        });

    };



    const stopDrag=()=>{

        setDragging(false);

    };





    const press=(value)=>{


        if(value==="C"){

            setDisplay("0");
            return;

        }



        if(value==="⌫"){

            setDisplay(

                display.length > 1
                ? display.slice(0,-1)
                : "0"

            );

            return;

        }



        if(value==="="){

            try{

                // kalkulasi sederhana
                const result = Function(
                    "return " + display
                )();


                setDisplay(
                    String(result)
                );


            }catch{

                setDisplay("Error");

            }


            return;

        }




        if(display==="0"){

            setDisplay(value);

        }else{

            setDisplay(
                display + value
            );

        }

    };





    if(!open){

        return (

            <button

            onClick={()=>setOpen(true)}

            className="
            fixed
            bottom-8
            right-8
            w-12
            h-12
            rounded-full
            bg-cyan-400/20
           border
border-orange-400/30
            text-cyan-300
            flex
            items-center
            justify-center
            shadow-lg
            "

            >

            <CalculatorIcon size={22}/>

            </button>

        );

    }





return (

<div

style={{

left:position.x,
top:position.y

}}

onMouseMove={onDrag}
onMouseUp={stopDrag}


className="
fixed
w-[340px]
bg-[#0b1320]
border
border-orange-400/30
rounded-xl
shadow-2xl
overflow-hidden
z-[999]
"
>



{/* HEADER */}

<div

onMouseDown={startDrag}

className="
h-12
px-4
flex
items-center
justify-between
bg-[#111c2d]
cursor-grab
active:cursor-grabbing
"

>


<div className="
flex
items-center
gap-2
text-cyan-300
">

<CalculatorIcon size={18}/>

<span>
NCC Calculator
</span>

</div>



<div className="
flex
gap-2
">


<button

onClick={()=>setOpen(false)}

className="text-slate-400 hover:text-white"

>

<Minus size={17}/>

</button>



<button

onClick={()=>setOpen(false)}

className="text-slate-400 hover:text-red-400"

>

<X size={18}/>

</button>


</div>


</div>





{/* DISPLAY */}

<div className="p-5">


<div

className="
h-16
rounded-lg
bg-black/30
border
border-white/10
flex
items-center
justify-end
px-4
text-3xl
text-white
mb-4
overflow-hidden
"

>

{display}

</div>





{/* KEYPAD */}

<div className="grid grid-cols-4 gap-2">


{

[

"C","⌫","/","*",

"7","8","9","-",

"4","5","6","+",

"1","2","3","=",

"0","."

].map((key)=>(


<button

key={key}

onClick={()=>press(key)}

className="
h-12
rounded-lg
bg-white/5
hover:bg-cyan-400/20
text-slate-200
text-lg
"

>

{key}

</button>


))

}


</div>


</div>



</div>


)

}