import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import NCCLayout from "@/Layouts/NCCLayout";

export default function Index({ requests }) {

    const [openMaterials, setOpenMaterials] = useState(null);
    const [selectedMr, setSelectedMr] = useState(null);
    const popupRef = useRef(null);

    // DEBUG (hapus nanti kalau sudah normal)
    console.log(requests.find(r => r.nomor_mr === 'MR-260722-005'));

    const openStatusDetail = (mr) => {
        setSelectedMr(mr);
    };

    const closeStatusDetail = () => {
        setSelectedMr(null);
    };

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                setOpenMaterials(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    return (

        <NCCLayout>

            <div className="p-6">

                <div className="mb-6">

                    <h1 className="text-3xl font-black text-white">
                        Material Request
                    </h1>

                    <p className="text-slate-400">
                        Monitoring permintaan material dari produksi ke gudang.
                    </p>

                </div>

                <div
                    className="
        bg-slate-900
    rounded-2xl
    shadow-xl
    overflow-hidden
"
                >

                    <table className="w-full table-fixed border-collapse">


                        <thead
                            className="
bg-cyan-500/10
border-b
border-slate-800
sticky
top-0
z-10
">

                            <tr>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    No MR
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    No SPK
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    Produk
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    Jumlah Item / Material
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    Status
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    Tanggal
                                </th>

                                <th className="
px-4
py-3
text-center
text-slate-300
font-semibold
">
                                    Aksi
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {requests.map((mr) => (

                                <tr
                                    key={mr.id}
                                    className="
border-b
border-slate-800
hover:bg-slate-800/60
transition
"
                                >

                                    {/* NO MR */}
<td className="p-3 text-center font-semibold whitespace-nowrap text-cyan-300">
    {mr.nomor_mr}
</td>

{/* NO SPK */}
<td className="p-3 text-center font-semibold whitespace-nowrap text-slate-200">
    {mr.production_order?.nomor_spk ||
     mr.productionOrder?.nomor_spk ||
     "-"}
</td>

{/* PRODUK */}
<td className="p-3 text-center font-semibold whitespace-nowrap text-white">
    {mr.production_order?.product?.nama ||
     mr.productionOrder?.product?.nama ||
     "-"}
</td>

                                    {/* JUMLAH ITEM / MATERIAL */}
                                    <td className="p-3 text-center relative">

                                        {['Approved', 'Issued'].includes(mr.status) ? (

                                            <>

                                                <button
                                                    onClick={() =>
                                                        setOpenMaterials(
                                                            openMaterials === mr.id ? null : mr.id
                                                        )
                                                    }
                                                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-green-200 transition"
                                                >
                                                    {mr.details_count} Material
                                                </button>


                                                {openMaterials === mr.id && (
                                                    <div
                                                        ref={popupRef}
                                                        className="
absolute
z-50
mt-3
left-1/2
-translate-x-1/2
w-96
rounded-2xl
border
border-cyan-500/20
bg-slate-900/95
backdrop-blur-xl
shadow-2xl
shadow-cyan-500/10
p-5
text-left
"
                                                    >

                                                        <div className="flex items-center justify-between mb-3">
                                                            <h3 className="text-cyan-400 font-bold tracking-wide">
                                                                📦 Material Disiapkan
                                                            </h3>

                                                            <span className="text-xs text-slate-500">
                                                                {mr.details.length} Item
                                                            </span>
                                                        </div>

                                                        <div className="
border-t
border-slate-700
pt-3
max-h-72
overflow-y-auto
space-y-2
">

                                                            {mr.details.map((d) => (
                                                                <div
                                                                    key={d.id}
                                                                    className="
flex
justify-between
items-center
rounded-lg
bg-slate-800/60
border
border-slate-700
px-3
py-2
hover:border-cyan-500/30
transition
"
                                                                >

                                                                    <span className="text-slate-200 font-medium">
                                                                        {d.material?.nama}
                                                                    </span>

                                                                    <span className="
text-cyan-400
font-bold
">
                                                                        {Number(d.qty_approved || 0).toLocaleString("id-ID")} {d.satuan}
                                                                    </span>




                                                                </div>
                                                            ))}

                                                        </div>

                                                    </div>
                                                )}

                                            </>

                                        ) : mr.status === 'Partial' ? (

                                            <button
                                                onClick={() =>
                                                    setOpenMaterials(
                                                        openMaterials === mr.id ? null : mr.id
                                                    )
                                                }
                                                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
                                            >
                                                {mr.material_ready_count} Material
                                            </button>

                                        ) : (

                                            <span className="text-gray-300 font-semibold">—</span>

                                        )}

                                    </td>

                                    {/* STATUS */}
                                    <td className="p-3 text-center align-middle">

                                        <button
                                            onClick={() => openStatusDetail(mr)}
                                            className="inline-flex items-center justify-center hover:scale-105 transition"
                                        >

                                            {mr.status === 'Waiting Approval' && (
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Waiting Approval
                                                </span>
                                            )}

                                            {mr.status === 'Pending' && (
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Pending
                                                </span>
                                            )}

                                            {mr.status === 'Partial' && (
                                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Partial
                                                </span>
                                            )}

                                            {mr.status === 'Approved' && (
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Proses
                                                </span>
                                            )}

                                            {mr.status === 'Rejected' && (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Rejected
                                                </span>
                                            )}
                                            {mr.status === 'Issued' && (
                                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Issued
                                                </span>
                                            )}

                                        </button>

                                    </td>

                                    {/* TANGGAL */}
                                    <td className="p-3 text-center whitespace-nowrap">

                                        <div className="font-semibold text-slate-200">
                                            {new Date(mr.created_at).toLocaleDateString('id-ID', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </div>

                                        <div className="text-xs text-slate-500 mt-1">
                                            {new Date(mr.created_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>

                                    </td>

                                    {/* AKSI */}
                                    <td className="p-3 text-center">

                                        <Link
                                            href={route('material-requests.show', mr.id)}
                                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-sm"
                                        >
                                            👁 Detail
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* MODAL DETAIL STATUS */}
            {selectedMr && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div
                        className="
    bg-slate-900
    border
    border-slate-700
    rounded-2xl
    shadow-2xl
    p-6
    "
                    >

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="
text-lg
font-black
tracking-wide
text-white
">
                                Detail Status MR
                            </h2>

                            <button
                                onClick={closeStatusDetail}
                                className="text-gray-400 hover:text-red-500 text-xl"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="
    border-t
    border-slate-800
    pt-4
    space-y-2
    text-sm
">

                            <div className="flex justify-between">
                                <span className="
p-4
text-center
font-bold
text-cyan-300
">No MR</span>
                                <span className="font-semibold">{selectedMr.nomor_mr}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Status</span>
                                <span className="font-semibold">{selectedMr.status}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Dibuat</span>
                                <span>
                                    {new Date(selectedMr.created_at).toLocaleString('id-ID')}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </NCCLayout>
    );
}