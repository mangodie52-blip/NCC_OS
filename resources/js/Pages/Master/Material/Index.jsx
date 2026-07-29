import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import NCCLayout from "@/Layouts/NCCLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";



export default function Index({ materials }) {


    const [editMode,setEditMode] = useState(false);
    const [selectedId,setSelectedId] = useState(null);
    const [showModal,setShowModal] = useState(false);
    const [search,setSearch] = useState("");
const formatNumber = (value) => {
    return Number(value).toString();
};


    const filteredMaterials = materials.filter((m)=>

        (m.nama || "")
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        (m.kode || "")
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        (m.kategori || "")
        .toLowerCase()
        .includes(search.toLowerCase())

    );





    const {
    data,
    setData,
    post,
    put,
    processing,
    reset

} = useForm({

    kode: "",
    nama: "",
    kategori: "",
    satuan: "",
    isi_kemasan: 1,
       stok_awal: "0",
    keterangan: "",

});







    const submit=(e)=>{

        e.preventDefault();


        if(editMode){


            put(`/material/${selectedId}`,{

                onSuccess:()=>{

                    reset();
                    setShowModal(false);
                    setEditMode(false);

                }

            });


        }else{


            post("/material",{

                onSuccess:()=>{

                    reset();
                    setShowModal(false);

                }

            });


        }


    };









    const editMaterial = (item) => {

    setEditMode(true);
    setSelectedId(item.id);

    setData({

        kode: item.kode,
        nama: item.nama,
        kategori: item.kategori,
        satuan: item.satuan,
        isi_kemasan: item.isi_kemasan,
        stok: item.stok,
        stok_awal: item.stok,
        keterangan: item.keterangan,

    });

    setShowModal(true);

};




    const deleteMaterial=(id)=>{


        if(confirm("Delete material node?")){

            router.delete(`/material/${id}`);

        }


    };









return (

<NCCLayout>


<div
className="
text-slate-100
"
>




{/* HEADER */}

<div
className="
flex
justify-between
items-center

border-slate-800
pb-5
mb-8
"
>


<div>


<div
className="
text-xs
tracking-[0.5em]
text-cyan-400
"
>
NCC INVENTORY CORE
</div>



<h1
className="
text-3xl
font-bold
tracking-widest
mt-2
"
>
MATERIAL CONTROL
</h1>



<p
className="
text-xs
text-slate-500
tracking-widest
mt-2
"
>
REALTIME RESOURCE DATABASE SYSTEM
</p>


</div>





<PrimaryButton
onClick={()=>setShowModal(true)}
>

+ NEW MATERIAL NODE

</PrimaryButton>



</div>









{/* TELEMETRY */}


<div
className="
grid
grid-cols-3
gap-5
mb-8
"
>

<TelemetryCard
    title="TOTAL NODE"
    value={materials.length}
    color="cyan"
/>


<TelemetryCard
    title="LOW STOCK"
    value={
        materials.filter(
            m =>
                Number(m.stok) > 0 &&
                Number(m.stok) <= Number(m.stok_minimum)
        ).length
    }
    color="cyan"
/>


<TelemetryCard
    title="OUT OF STOCK"
    value={
        materials.filter(
            m => Number(m.stok) === 0
        ).length
    }
    color="cyan"
/>


</div>









{/* SEARCH */}


<input

type="text"

placeholder="SEARCH RESOURCE NODE..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
mb-5
rounded-xl
bg-[#08111d]

border-cyan-900/40
px-5
py-3
text-sm
text-white
placeholder:text-slate-600
outline-none
focus:border-cyan-400
"

/>











{/* TABLE */}


<div
className="
rounded-xl
overflow-hidden
border
border-cyan-900/40
bg-[#08111d]/80
backdrop-blur-xl
"
>




<div
className="
flex
justify-between
px-5
py-4
border-b
border-slate-800
"
>


<span
className="
text-xs
tracking-[0.4em]
text-cyan-400
"
>
MATERIAL INVENTORY STREAM
</span>



<span
className="
text-xs
text-slate-500
"
>
{filteredMaterials.length} ACTIVE NODE
</span>



</div>









<table
className="
w-full
text-sm
"
>


<thead
className="
bg-[#0b1320]
"
>


<tr>


{

[
"NODE",
"RESOURCE",
"CLASS",
"UNIT",
"PACK",
"STOCK",
"STATE",
"COMMAND"

].map(head=>(


<th

key={head}

className="
p-4
text-[10px]
tracking-widest
text-slate-500
"

>

{head}

</th>


))

}


</tr>


</thead>







<tbody
className="
text-center
"
>


{


filteredMaterials.length > 0 ?


filteredMaterials.map(material=>(



<tr

key={material.id}

className="
border-t
border-slate-800
hover:bg-cyan-400/5
transition
"

>



<td
className="
p-4
font-mono
text-cyan-300
"
>
{material.kode}
</td>





<td
className="
p-4
text-slate-200
"
>
{material.nama}
</td>





<td
className="
p-4
text-slate-400
"
>
{material.kategori}
</td>





<td
className="
p-4
"
>

<span
className="
px-3
py-1
rounded
bg-cyan-400/10
border
border-cyan-400/20
text-cyan-300
text-xs
"
>

{material.satuan}

</span>

</td>

<td
className="
p-4
font-mono
text-slate-300
"
>

{formatNumber(material.isi_kemasan)}

</td>




<td
className="
p-4
font-mono
"
>
{material.stok}
</td>







<td
className="
p-4
"
>



{

Number(material.stok)
<=
Number(material.stok_minimum)


?


<span
className="
px-3
py-1
rounded-full
bg-red-400/10
border
border-red-400/20
text-red-400
text-xs
"
>
CRITICAL
</span>



:



<span
className="
px-3
py-1
rounded-full
bg-green-400/10
border
border-green-400/20
text-green-400
text-xs
"
>
NORMAL
</span>


}



</td>









<td
className="
p-4
text-center
"
>


<div
className="
flex
justify-center
items-center
gap-2
w-full
"
>


<SecondaryButton

onClick={()=>editMaterial(material)}

>

MODIFY

</SecondaryButton>




<DangerButton

onClick={()=>deleteMaterial(material.id)}

>

REMOVE

</DangerButton>



</div>


</td>





</tr>



))



:


<tr>

<td

colSpan="7"

className="
text-center
p-10
text-slate-500
"

>

NO RESOURCE DATA

</td>

</tr>



}



</tbody>


</table>



</div>









{/* MODAL */}

<Modal
                show={showModal}
                onClose={() => setShowModal(false)}
            >

                <form onSubmit={submit}>

                    <div className="p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Tambah Material
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
KODE MATERIAL
</label>


<input

value={data.kode}

placeholder="ENTER MATERIAL CODE..."

onChange={(e)=>setData("kode",e.target.value)}

className="
w-full
bg-[#0b1320]/40
border
border-slate-700/50
rounded-lg
px-4
py-3
text-sm
text-slate-100
placeholder:text-slate-600
placeholder:italic
outline-none
focus:border-cyan-400
focus:ring-1
focus:ring-cyan-400/30
"

/>

</div>

                            <div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
NAMA MATERIAL
</label>


<input

value={data.nama}

placeholder="ENTER MATERIAL NAME..."

onChange={(e)=>setData("nama",e.target.value)}

className="
w-full
bg-[#0b1320]/40
border
border-slate-700/50
rounded-lg
px-4
py-3
text-sm
text-slate-100
placeholder:text-slate-600
placeholder:italic
outline-none
focus:border-cyan-400
focus:ring-1
focus:ring-cyan-400/30
"

/>


</div>

<div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
KATEGORI
</label>

<select

value={data.kategori}

onChange={(e)=>setData("kategori",e.target.value)}

className="
w-full
rounded-xl
border
border-slate-700
bg-slate-900
text-white
px-4
py-3
transition
outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

>

<option value="">
PILIH KATEGORI
</option>

<option value="Kain">
Kain
</option>

<option value="Webbing">
Webbing
</option>

<option value="Benang">
Benang
</option>

<option value="Resleting">
Resleting
</option>

<option value="Busa">
Busa
</option>

<option value="Velcro">
Velcro
</option>

<option value="Label">
Label
</option>

<option value="Aksesoris">
Aksesoris
</option>

<option value="Packing">
Packing
</option>

<option value="Hardware">
Hardware
</option>

<option value="Kimia">
Kimia
</option>

<option value="Lainnya">
Lainnya
</option>

</select>

</div>

                            <div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
UNIT
</label>



<select

    value={data.satuan}

    onChange={(e)=>setData("satuan",e.target.value)}

    className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        text-white
        px-4
        py-3
        transition
        outline-none
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/30
    "

>

<option value="" disabled>
    SATUAN
</option>


<option value="PCS">
    PCS
</option>


<option value="Meter">
    Meter
</option>


<option value="Roll">
    Roll
</option>


<option value="Kg">
    Kg
</option>


</select>


</div>


<div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
ISI KEMASAN
</label>

<input

type="number"

min="1"

step="any"

value={
    data.isi_kemasan
    ? Number(data.isi_kemasan).toString()
    : ""
}

placeholder="CONTOH : 100"

onChange={(e)=>setData("isi_kemasan",e.target.value)}

className="
w-full
bg-[#0b1320]/40
border
border-slate-700/50
rounded-lg
px-4
py-3
text-sm
text-slate-100
placeholder:text-slate-600
placeholder:italic
outline-none
focus:border-cyan-400
focus:ring-1
focus:ring-cyan-400/30
"

/>

</div>
                            
                            <div>

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
STOK AWAL
</label>



<input

type="number"

value={data.stok_minimum}

placeholder="INPUT INITIAL STOCK..."

onChange={(e)=>setData("stok_awal",e.target.value)}

className="
w-full
bg-[#0b1320]/40
border
border-slate-700/50
rounded-lg
px-4
py-3
text-sm
text-slate-100
placeholder:text-slate-600
placeholder:italic
outline-none
focus:border-cyan-400
focus:ring-1
focus:ring-cyan-400/30
"

/>


</div>

                            <div className="col-span-2">

<label
className="
block
text-[10px]
tracking-[0.3em]
text-slate-500
mb-2
"
>
REFERENCE / NOTE
</label>


<textarea

value={data.keterangan}

placeholder="ENTER PURCHASE NOTE / SUPPLIER / DESCRIPTION..."

onChange={(e)=>setData("keterangan",e.target.value)}

className="
w-full
h-24
bg-[#0b1320]/40
border
border-slate-700/50
rounded-lg
px-4
py-3
text-sm
text-slate-100
placeholder:text-slate-600
placeholder:italic
outline-none
resize-none
focus:border-cyan-400
focus:ring-1
focus:ring-cyan-400/30
"

/>

</div>

                        </div>

                        <div
className="
flex
justify-end
gap-3
mt-8
border-t
border-slate-800
pt-5
"
>


<button

type="button"

onClick={()=>setShowModal(false)}

className="
px-5
py-2
rounded-lg
border
border-slate-700
bg-slate-900/40
text-slate-400
text-xs
tracking-widest
transition
duration-300
hover:text-slate-200
hover:border-slate-500
hover:bg-slate-800/60
hover:-translate-y-0.5
"

>

CANCEL COMMAND

</button>





<button

type="submit"

disabled={processing}

className="
px-5
py-2
rounded-lg
border
border-cyan-400/30
bg-cyan-400/10
text-cyan-300
text-xs
tracking-widest
transition
duration-300
hover:bg-cyan-400/20
hover:border-cyan-300
hover:text-cyan-200
hover:-translate-y-0.5
hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]
disabled:opacity-50
"

>

{
processing
?
"PROCESSING..."
:
"SAVE NODE"
}


</button>


</div>

                    </div>

                </form>

            </Modal>







</div>


</NCCLayout>

);

}









function TelemetryCard({title,value,color}){


const styles = {

cyan:
"border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.08)]",


orange:
"border-orange-400/30 text-orange-300 shadow-[0_0_15px_rgba(251,146,60,0.08)]",


red:
"border-red-400/30 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.08)]",


green:
"border-green-400/30 text-green-400"

};



return (

<div
className={`
bg-[#08111d]/80
border
${styles[color]}
rounded-xl
p-5
transition
hover:bg-[#0b1320]
`}
>


<div
className="
text-[10px]
tracking-[0.4em]
text-slate-500
"
>

{title}

</div>



<div
className="
text-3xl
font-bold
mt-3
"
>

{value}

</div>



</div>

)





return (

<div
className={`
bg-[#08111d]/80
border
${styles[color]}
rounded-xl
p-5
`}
>


<div
className="
text-[10px]
tracking-[0.4em]
text-slate-500
"
>

{title}

</div>



<div
className="
text-3xl
font-bold
mt-3
"
>

{value}

</div>



</div>


)


}