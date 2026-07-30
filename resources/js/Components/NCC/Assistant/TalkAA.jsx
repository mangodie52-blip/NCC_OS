import { useState, useEffect, useRef } from "react";

import {
    Bot,
    Minus,
    Send
} from "lucide-react";



export default function TalkAA({
    onMinimize
}){


    const [position,setPosition] = useState({

        x:120,
        y:120

    });



    const [dragging,setDragging] = useState(false);



    const [offset,setOffset] = useState({

        x:0,
        y:0

    });



    const [message,setMessage] = useState("");





    const [chat,setChat] = useState([

        {
            from:"aa",
            text:
            "Selamat datang di NCC OS.\nSaya AA, Neats Assistant.\nAda yang bisa saya bantu?"
        }

    ]);





    // =========================
    // AUTO SCROLL CHAT
    // =========================

    const chatEndRef = useRef(null);



    useEffect(()=>{


        chatEndRef.current?.scrollIntoView({

            behavior:"smooth"

        });



    },[chat]);









    const startDrag=(e)=>{

        setDragging(true);


        setOffset({

            x:e.clientX-position.x,

            y:e.clientY-position.y

        });

    };









    const moveDrag=(e)=>{

        if(!dragging) return;



        setPosition({

            x:e.clientX-offset.x,

            y:e.clientY-offset.y

        });



    };








    const stopDrag=()=>{

        setDragging(false);

    };












    const sendMessage = async()=>{


        const text = message.trim();



        if(!text) return;





        setChat(prev=>[

            ...prev,

            {

                from:"user",

                text:text

            }

        ]);




        setMessage("");







        try{


            const token = document

            .querySelector('meta[name="csrf-token"]')

            ?.getAttribute("content");






            const response = await fetch("/ncc/talk-aa", {


                method:"POST",


                credentials:"same-origin",


                headers:{


                    "Content-Type":"application/json",

                    "Accept":"application/json",

                    "X-CSRF-TOKEN":token,

                    "X-Requested-With":"XMLHttpRequest",

                },



                body:JSON.stringify({

                    message:text

                })



            });






            const data = await response.json();








            setChat(prev=>[

                ...prev,


                {

                    from:"aa",

                    text:data.reply

                }



            ]);






        }



        catch(error){



            console.error(error);




            setChat(prev=>[


                ...prev,


                {


                    from:"aa",


                    text:
                    "AA sedang mengalami gangguan koneksi."


                }



            ]);



        }



    };












return (

<div


style={{

    left:position.x,

    top:position.y

}}



onMouseMove={moveDrag}

onMouseUp={stopDrag}



className="
fixed
w-[380px]
h-[520px]
bg-[#070f1c]
border
border-orange-400/40
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
cursor-move
select-none
"


>



<div

className="
flex
items-center
gap-2
text-orange-300
"

>


<Bot size={18}/>



<span className="text-sm font-semibold">

Talk To AA

</span>



</div>








<button

onClick={onMinimize}

className="
text-slate-400
hover:text-orange-300
transition
"

>

<Minus size={18}/>

</button>



</div>









{/* CHAT AREA */}



<div


className="
h-[410px]
p-4
overflow-y-auto
space-y-3
no-scrollbar
"


>



{

chat.map((item,index)=>(


<div

key={index}


className={`

flex

${
item.from==="user"

?

"justify-end"

:

"justify-start"

}

`}

>


<div



className={`

max-w-[80%]

px-3

py-2

rounded-lg

text-sm

whitespace-pre-line


${
item.from==="user"

?

"bg-cyan-400/20 text-cyan-100"

:

"bg-orange-400/10 text-orange-200 border border-orange-400/20"

}


`}


>


{item.text}



</div>


</div>


))


}



{/* TARGET AUTO SCROLL */}

<div ref={chatEndRef}/>



</div>









{/* INPUT */}



<div


className="
absolute
bottom-0
left-0
right-0
p-3
bg-[#0b1320]
border-t
border-white/10
flex
gap-2
"


>



<input


value={message}



onChange={(e)=>setMessage(e.target.value)}




onKeyDown={(e)=>{


    if(e.key==="Enter"){

        sendMessage();

    }


}}




placeholder="Tanya AA..."



className="
flex-1
bg-black/30
border
border-white/10
rounded-lg
px-3
py-2
text-sm
text-white
outline-none
"



/>








<button


onClick={sendMessage}



className="
w-10
rounded-lg
bg-orange-400/20
border
border-orange-400/30
text-orange-300
flex
items-center
justify-center
hover:bg-orange-400/30
"


>


<Send size={17}/>


</button>







</div>







</div>


)


}