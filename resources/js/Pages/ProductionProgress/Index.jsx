import { useForm } from "@inertiajs/react";
import { useState } from "react";

import NCCLayout from "@/Layouts/NCCLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";


export default function Index({
    orders,
    progresses,
}) {


    const [showModal,setShowModal] = useState(false);


    const [search,setSearch] = useState("");



    const {
        data,
        setData,
        post,
        processing,
        reset

    } = useForm({

        production_order_id:"",
        tanggal:new Date()
            .toISOString()
            .slice(0,10),

        line:"",
        operator:"",
        qty_selesai:"",
        keterangan:"",

    });




    const submit = (e)=>{

        e.preventDefault();


        post(
            route("production-progresses.store"),
            {

                onSuccess:()=>{

                    reset();

                    setShowModal(false);

                }

            }
        );

    };





    const selectedOrder = orders.find(
        order =>
        order.id == data.production_order_id
    );





    const filteredProgresses = progresses.filter(p=>{


        const keyword =
        search.toLowerCase();



        return (

            p.production_order
            ?.nomor_spk
            ?.toLowerCase()
            .includes(keyword)



            ||

            p.production_order
            ?.product
            ?.nama
            ?.toLowerCase()
            .includes(keyword)



            ||

            p.operator
            ?.toLowerCase()
            .includes(keyword)

        );


    });







return (

<NCCLayout>


<div className="
p-6
space-y-6
">





{/* HEADER */}

<div className="
flex
justify-between
items-center
">


<div>


<h1 className="
text-3xl
font-black
tracking-wide
text-white
">

PRODUCTION OPERATOR CENTER

</h1>



<p className="
text-slate-400
mt-1
">

Monitoring progress produksi setiap line operator.

</p>


</div>





<div className="
flex
gap-3
">


<a

href={
route(
"production-progresses.export-csv"
)
}

className="
px-5
py-3
rounded-xl
bg-emerald-600
hover:bg-emerald-500
text-white
font-semibold
transition
shadow-lg
"

>

📊 Export


</a>




<PrimaryButton

onClick={()=>
setShowModal(true)
}

>

+ ADD PROGRESS

</PrimaryButton>



</div>


</div>








{/* SEARCH */}


<div className="
bg-slate-900/70
border
border-cyan-400/20
rounded-2xl
p-4
shadow-xl
">


<input

type="text"

placeholder="
Cari SPK / Produk / Operator...
"

value={search}

onChange={
e=>setSearch(e.target.value)
}


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3

focus:border-cyan-400
focus:ring
focus:ring-cyan-400/20

outline-none
"

/>


</div>









{/* MODAL ADD PROGRESS */}



{

showModal && (


<div

className="
fixed
inset-0
bg-black/70
backdrop-blur-sm
flex
items-center
justify-center
z-[100]
"

>



<div

className="
w-full
max-w-2xl

bg-[#08111d]

border
border-cyan-400/30

rounded-2xl

shadow-2xl
shadow-cyan-500/20

p-6

"

>



<div className="
flex
justify-between
items-center
mb-6
">


<div>


<h2 className="
text-xl
font-bold
text-white
">

ADD PRODUCTION PROGRESS

</h2>


<p className="
text-xs
text-slate-500
tracking-widest
">

OPERATOR TELEMETRY INPUT

</p>


</div>




<button

onClick={()=>
setShowModal(false)
}

className="
text-slate-400
hover:text-white
"

>

✕


</button>


</div>






<form

onSubmit={submit}

className="
space-y-4
"

>





<select

value={
data.production_order_id
}


onChange={
e=>
setData(
"production_order_id",
e.target.value
)
}


required


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3

focus:border-cyan-400
outline-none
"

>


<option value="">

Pilih SPK

</option>


{

orders.map(order=>(


<option

key={order.id}

value={order.id}

>


{order.nomor_spk}
-
{order.product?.nama}


</option>


))


}



</select>





{
selectedOrder && (


<div

className="
bg-slate-950
border
border-cyan-400/20
rounded-xl
p-4
"

>


<p className="text-slate-300">

<span className="text-cyan-400">

SPK :

</span>

{" "}
{selectedOrder.nomor_spk}

</p>



<p className="text-slate-300">

<span className="text-cyan-400">

Produk :

</span>

{" "}
{selectedOrder.product?.nama}

</p>



<p className="text-slate-300">

<span className="text-cyan-400">

Target :

</span>

{" "}
{selectedOrder.qty} PCS

</p>


</div>


)

}






<div className="
grid
grid-cols-2
gap-4
">


<input

type="date"

value={data.tanggal}

onChange={
e=>
setData(
"tanggal",
e.target.value
)
}


className="
input-ncc
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3
"

/>



<input

type="number"

placeholder="Qty selesai"

value={data.qty_selesai}

onChange={
e=>
setData(
"qty_selesai",
e.target.value
)
}


required


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3
"

/>


</div>
// LANJUTAN MODAL


<div className="
grid
grid-cols-2
gap-4
">


<input

type="text"

placeholder="Line"

value={data.line}

onChange={
e=>
setData(
"line",
e.target.value
)
}


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3
focus:border-cyan-400
outline-none
"

/>




<input

type="text"

placeholder="Operator"

value={data.operator}

onChange={
e=>
setData(
"operator",
e.target.value
)
}


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3
focus:border-cyan-400
outline-none
"

/>



</div>







<textarea

placeholder="Keterangan"

value={data.keterangan}

onChange={
e=>
setData(
"keterangan",
e.target.value
)
}


className="
w-full
rounded-xl
bg-slate-950
border
border-slate-700
text-white
px-4
py-3
focus:border-cyan-400
outline-none
"


/>






<div className="
flex
justify-end
gap-3
pt-4
">


<SecondaryButton

onClick={()=>
setShowModal(false)
}

>

Cancel

</SecondaryButton>



<PrimaryButton

type="submit"

disabled={processing}

>

💾 SIMPAN PROGRESS

</PrimaryButton>



</div>




</form>


</div>


</div>


)

}









{/* TABLE */}



<div

className="
bg-slate-900/80

border
border-cyan-400/20

rounded-2xl

overflow-hidden

shadow-xl

"

>



<table

className="
w-full
"

>


<thead

className="
bg-cyan-400/10
border-b
border-cyan-400/20
"

>


<tr>


<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

TANGGAL

</th>



<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

SPK

</th>



<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

PRODUCT

</th>



<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

LINE

</th>



<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

OPERATOR

</th>



<th className="
p-4
text-center
text-xs
tracking-wider
text-cyan-300
">

QTY

</th>


</tr>


</thead>






<tbody>


{

filteredProgresses.length > 0 ?



filteredProgresses.map(
p=>(


<tr

key={p.id}

className="
border-b
border-slate-800
hover:bg-cyan-400/5
transition
"


>



<td className="
p-4
text-center
text-slate-300
">

{p.tanggal}

</td>




<td className="
p-4
text-center
text-slate-300
">

{p.production_order?.nomor_spk}

</td>




<td className="
p-4
text-center
text-slate-300
">

{p.production_order?.product?.nama}

</td>




<td className="
p-4
text-center
text-cyan-300
font-semibold
">

{p.line}

</td>




<td className="
p-4
text-center
text-slate-300
">

{p.operator}

</td>




<td className="
p-4
text-center
font-mono
text-white
"

>

{p.qty_selesai}

</td>




</tr>


)

)

:



<tr>


<td

colSpan="6"

className="
p-6
text-center
text-slate-500
"

>

Belum ada progress produksi

</td>


</tr>



}


</tbody>


</table>


</div>





</div>


</NCCLayout>


);

}