import AppLayout from '@/Layouts/AppLayout';
import { router, usePage, Link } from '@inertiajs/react';


export default function Show() {

    const statusClass = {
        'Waiting Approval': 'bg-blue-100 text-blue-700',
        'Pending': 'bg-yellow-100 text-yellow-700',
        'Partial': 'bg-orange-100 text-orange-700',
        'Approved': 'bg-green-100 text-green-700',
        'Rejected': 'bg-red-100 text-red-700',
        'Expired': 'bg-gray-100 text-gray-700',
    };

    const { materialRequest } = usePage().props;

    return (

        <AppLayout>

            <div className="p-6">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h1 className="text-3xl font-black tracking-wide text-white">
                            Detail Material Request
                        </h1>

                        <p className="text-slate-400 mt-1">
                            Detail permintaan material dari bagian produksi.
                        </p>
                    </div>

                    <Link
                        href={route('material-requests.index')}
                        className="
        bg-slate-700
        hover:bg-slate-600
        text-white
        px-5
        py-2
        rounded-xl
        transition
        "
                    >
                        ← Kembali
                    </Link>

                </div>
                {/* HEADER INFO */}
                <div
                    className="
bg-slate-900
border
border-slate-700
rounded-2xl
shadow-2xl
p-6
mb-6
"
                >

                    <div className="grid grid-cols-2 gap-6 text-sm">

                        <div>
                            <p className="text-slate-400 text-sm">No MR</p>
                            <p className="
font-black
text-lg
text-white
">
                                {materialRequest.nomor_mr}
                            </p>
                        </div>

                        <div>
                            <p className="mt-2">
                                <span className="
    bg-cyan-500/20
    text-cyan-400
    px-3
    py-1
    rounded-full
    font-bold
    ">
                                    {materialRequest.status}
                                </span>
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Tanggal Kirim</p>
                            <p className="
font-bold
text-white
">
                                {new Date(materialRequest.tanggal).toLocaleDateString('id-ID')}
                            </p>
                        </div>

                        <div>
                            <p className="text-slate-400 text-sm">Jam Kirim</p>
                            <p className="
font-bold
text-white
">
                                {new Date(materialRequest.created_at).toLocaleTimeString('id-ID', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>

                    </div>

                </div>

                {/* DETAIL MATERIAL */}
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

                    <div
                        className="
    p-5
    border-b
    border-slate-700
    "
                    >
                        <h2 className="
text-lg
font-black
text-white
tracking-wide
">
                            Detail Material
                        </h2>
                    </div>

                    <div
                        className="
bg-slate-900
border
border-slate-700
rounded-2xl
shadow-2xl
overflow-hidden
">

                        <table className="w-full">
                            <thead
                                className="
bg-cyan-500/10
border-b
border-slate-700
"
                            >

                                <tr>

                                    <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                        Material
                                    </th>

                                    <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                        Qty
                                    </th>

                                    <th className="
p-4
text-center
text-slate-300
font-semibold
">
                                        Satuan
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-slate-800">

                                {materialRequest.details?.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="
border-b
border-slate-800
hover:bg-slate-800/50
transition
"
                                    >

                                        <td className="
p-4
text-white
font-semibold
">
                                            {item.material?.nama}
                                        </td>

                                        <td className="
p-4
text-center
text-cyan-400
font-bold
">
                                            {item.qty_request}
                                        </td>

                                        <td className="
p-4
text-center
text-slate-300
"
                                        >
                                            {item.satuan}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>


                    {/* ACTION */}
                    <div className="flex justify-end gap-3 mt-6 border-t pt-5">

                        {/* Hanya tampil saat Pending / Waiting Approval */}
                        {(materialRequest.status === 'Pending' ||
                            materialRequest.status === 'Waiting Approval') && (
                                <>

                                    {/* APPROVE */}
                                    <button
                                        onClick={() =>
                                            router.post(
                                                route('material-requests.approve', materialRequest.id)
                                            )
                                        }
                                        className="
px-5
py-2
bg-cyan-500
hover:bg-cyan-400
text-slate-950
rounded-xl
font-black
transition
shadow-lg
"
                                    >
                                        ✓ Approve
                                    </button>

                                    {/* DELETE / CANCEL */}
                                    <button
                                        onClick={() => {
                                            if (confirm('Yakin ingin membatalkan Material Request ini?')) {
                                                router.post(
                                                    route('material-requests.cancel', materialRequest.id)
                                                );
                                            }
                                        }}
                                        className="
px-5
py-2
bg-red-500/20
hover:bg-red-500/30
text-red-400
border
border-red-500/30
rounded-xl
font-black
transition
"
                                    >
                                        🗑 Delete
                                    </button>

                                </>
                            )}

                        {/* Kalau sudah Approved */}
                        {materialRequest.status === 'Approved' && (
                            <div className="
bg-green-500/20
text-green-400
px-4
py-2
rounded-full
font-bold
">
                                ⚙️ Sedang Diproses Gudang
                            </div>
                        )}

                        {/* Kalau sudah Rejected */}
                        {materialRequest.status === 'Rejected' && (
                            <div className="
bg-red-500/20
text-red-400
px-4
py-2
rounded-full
font-bold
">
                                ❌ Material Request Ditolak
                            </div>
                        )}

                        {/* Kalau sudah Cancelled */}
                        {materialRequest.status === 'Cancelled' && (
                            <div className="
bg-slate-700
text-slate-300
px-4
py-2
rounded-full
font-bold
">
                                🗑 Material Request Dibatalkan
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </AppLayout>
    );
}