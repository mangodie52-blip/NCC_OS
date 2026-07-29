import { useForm, router } from "@inertiajs/react";
import { useState } from 'react';
import NCCLayout from "@/Layouts/NCCLayout";
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Index({
    orders,
    progresses,
    range,
}) {

    const { data, setData, post, processing } = useForm({

        production_order_id: '',
        tanggal: new Date().toISOString().slice(0, 10),
        line: '',
        operator: '',
        qty_selesai: '',
        keterangan: '',

    });

    const [search, setSearch] = useState('');

    const [sort, setSort] = useState({
        field: 'tanggal',
        direction: 'desc'
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('production-progresses.store'), {
            onSuccess: () => {
                setData({
                    production_order_id: '',
                    tanggal: new Date().toISOString().slice(0, 10),
                    line: '',
                    operator: '',
                    qty_selesai: '',
                    keterangan: '',
                });
            },
        });
    };


    // cari SPK yang dipilih
    const selectedOrder = orders.find(
        order => order.id == data.production_order_id
    );


    // sort
    const changeSort = (field) => {

        setSort({

            field,

            direction:
                sort.field === field &&
                    sort.direction === 'asc'
                    ?
                    'desc'
                    :
                    'asc'

        });

    };



    const filteredProgresses = progresses

        .filter(p => {


            const keyword = search.toLowerCase();


            return (

                p.production_order?.nomor_spk
                    ?.toLowerCase()
                    .includes(keyword)


                ||

                p.production_order?.product?.nama
                    ?.toLowerCase()
                    .includes(keyword)


                ||

                p.operator
                    ?.toLowerCase()
                    .includes(keyword)

            );


        })


        .sort((a, b) => {


            let x;
            let y;


            if (sort.field === 'nomor_spk') {


                x = a.production_order?.nomor_spk || '';

                y = b.production_order?.nomor_spk || '';


            }
            else if (sort.field === 'operator') {


                x = a.operator || '';

                y = b.operator || '';


            }
            else if (sort.field === 'qty') {


                x = a.qty_selesai;

                y = b.qty_selesai;


            }
            else {


                x = a[sort.field];

                y = b[sort.field];


            }



            if (sort.direction === 'asc') {

                return x > y ? 1 : -1;

            }


            return x < y ? 1 : -1;


        });




    return (

        <NCCLayout>

            <div className="p-6">


                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h1 className="text-3xl font-black tracking-wide text-white">
                            Progress Produksi
                        </h1>

                        <p className="text-slate-400 mt-1">
                            Monitoring hasil produksi harian setiap line.
                        </p>
                    </div>


                    <div className="flex gap-2">

                        <a
                            href={route("production-progresses.export-csv")}
                            className="
inline-flex
items-center
gap-2
px-5
py-3
rounded-xl
bg-emerald-600
hover:bg-emerald-500
text-white
font-semibold
shadow-lg
shadow-emerald-500/20
transition
duration-300
hover:scale-105
"
                        >

                            📊 Export Excel

                        </a>

                    </div>

                </div>
                <div className="
w-full
border
rounded-lg
p-3
">

                    <input

                        type="text"

                        placeholder="Cari SPK / Produk / Operator..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                    />

                </div>





                <form
                    onSubmit={submit}
                    className="
                   bg-slate-900
border
border-slate-700
rounded-2xl
shadow-2xl
                    "
                >


                    <select

                        value={data.production_order_id}

                        onChange={(e) =>
                            setData(
                                'production_order_id',
                                e.target.value
                            )
                        }

                        className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
px-4
py-3
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                        required

                    >

                        <option value="">
                            Pilih SPK
                        </option>


                        {
                            orders.map(order => (

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
                                p-4
                                rounded-lg
                                "
                            >

                                <p className="text-slate-300">
                                    <span className="text-cyan-400 font-semibold">
                                        SPK :
                                    </span>{" "}
                                    {selectedOrder.nomor_spk}
                                </p>

                                <p className="text-slate-300">
                                    <span className="text-cyan-400 font-semibold">
                                        Produk :
                                    </span>{" "}
                                    {selectedOrder.product?.nama}
                                </p>

                                <p className="text-slate-300">
                                    <span className="text-cyan-400 font-semibold">
                                        Target :
                                    </span>{" "}
                                    {selectedOrder.qty} PCS
                                </p>


                            </div>

                        )
                    }

                    <div className="grid grid-cols-2 gap-4">


                        <input

                            type="date"

                            value={data.tanggal}

                            onChange={(e) =>
                                setData(
                                    'tanggal',
                                    e.target.value
                                )
                            }

                            className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                            required

                        />



                        <input

                            type="number"

                            placeholder="Qty selesai hari ini"

                            value={data.qty_selesai}

                            onChange={(e) =>
                                setData(
                                    'qty_selesai',
                                    e.target.value
                                )
                            }

                            className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                            required

                        />


                    </div>





                    <div className="grid grid-cols-2 gap-4">


                        <input

                            type="text"

                            placeholder="Line"

                            value={data.line}

                            onChange={(e) =>
                                setData(
                                    'line',
                                    e.target.value
                                )
                            }

                            className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                        />



                        <input

                            type="text"

                            placeholder="Operator"

                            value={data.operator}

                            onChange={(e) =>
                                setData(
                                    'operator',
                                    e.target.value
                                )
                            }

                            className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                        />


                    </div>





                    <textarea

                        placeholder="Keterangan"

                        value={data.keterangan}

                        onChange={(e) =>
                            setData(
                                'keterangan',
                                e.target.value
                            )
                        }

                        className="
w-full
rounded-xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-500
px-4
py-3
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"

                    />

                    <PrimaryButton
                        type="submit"
                        disabled={processing}
                    >
                        💾 Simpan Progress
                    </PrimaryButton>

                </form>

                <div
                    className="
                   bg-slate-900
border
border-slate-700
rounded-2xl
shadow-2xl
overflow-hidden
                    "
                >


                    <table className="w-full">


                        <thead className="
rounded-xl
border
border-cyan-500/20
bg-cyan-500/10
p-5
">


                            <tr>

                                <th className="
p-4
text-center
text-slate-300
font-semibold
">

                                    <button

                                    >

                                        Tanggal
                                    </button>

                                </th>


                                <th className="
p-4
text-center
text-slate-300
font-semibold
">

                                    <button

                                    >

                                        SPK
                                    </button>

                                </th>


                                <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                    Nama Produk
                                </th>


                                <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                    Line
                                </th>


                                <th className="
p-4
text-center
text-slate-300
font-semibold
">

                                    <button

                                    >

                                        Operator

                                    </button>

                                </th>


                                <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                    Qty
                                </th>


                            </tr>


                        </thead>



                        <tbody>


                            {
                                progresses.length > 0 ?


                                    filteredProgresses.map(p => (


                                        <tr
                                            key={p.id}
                                            className="
border-b
border-slate-800
hover:bg-slate-800/60
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
text-slate-300
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
text-slate-300
"
                                            >

                                                {p.qty_selesai}

                                            </td>


                                        </tr>


                                    ))


                                    :


                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="p-5 text-center text-gray-500"
                                        >

                                            Belum ada progress produksi

                                        </td>

                                    </tr>


                            }


                        </tbody>


                    </table>


                </div>


            </div>


        </NCCLayout >

    );

}