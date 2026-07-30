import DataTable from '@/Components/DataTable';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';

export default function ProductionTable({ orders, onEdit }) {

    const sendToGudang = (order) => {

        if (!confirm(`Kirim ${order.nomor_spk} ke Gudang?`)) return;

        console.log('SEND TO GUDANG =>', order);

        router.post(route('material-requests.store'), {
            production_order_id: order.id,
            product_id: order.product_id,
            qty_produksi: order.qty,
            boms: order.product?.boms?.map(bom => ({
                material_id: bom.material_id,
                qty_request: bom.kebutuhan * order.qty,
                satuan: bom.satuan,
            })) || [],
        });
    };

    

    return (
        <div
            className="
overflow-hidden
rounded-2xl
border
border-slate-700
bg-slate-900
shadow-2xl
"
        >

            <table className="w-full border-collapse">
                <thead className="bg-slate-950">
                    <tr>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">No SPK</th>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">Product</th>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">Qty</th>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">Tanggal</th>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">Status</th>
                        <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.map((order) => (
                            <tr
                                key={order.id}
                                className="
border-t
border-slate-800
hover:bg-slate-800/70
transition
"
                            >
                                <td className="
p-4
text-center
font-bold
text-white
">
                                    {order.nomor_spk}
                                </td>

                                <td className="
p-4
text-center
font-bold
text-white
">
                                    {order.product?.nama ?? '-'}
                                </td>

                                <td className="
p-4
text-center
font-bold
text-white
">
                                    {order.qty}
                                </td>

                                <td className="
p-4
text-center
font-bold
text-white
">
                                    {order.tanggal}
                                </td>

                                <td className="
p-4
text-center
font-bold
text-white
">
                                    <span
                                        className={`
px-3
py-1
rounded-full
text-xs
font-bold

${order.status === "Draft"
                                                ? "bg-yellow-500/20 text-yellow-300"
                                                : ""}

${order.status === "Planning"
                                                ? "bg-cyan-500/20 text-cyan-300"
                                                : ""}

${order.status === "Produksi"
                                                ? "bg-green-500/20 text-green-300"
                                                : ""}

${order.status === "Selesai"
                                                ? "bg-blue-500/20 text-blue-300"
                                                : ""}

${order.status === "Cancel"
                                                ? "bg-red-500/20 text-red-300"
                                                : ""}
`}
                                    >

                                        {order.status}

                                    </span>
                                </td>


                                {/* SEND TO GUDANG */}


                                <td className="px-3 py-2">
                                    <div className="flex justify-center flex-wrap gap-2">

                                        <button
                                             onClick={() => sendToGudang(order)}
                                            className="
rounded-lg
bg-cyan-600
hover:bg-cyan-500
text-white
font-bold
px-4
py-2
transition
"
                                        >
                                            📦 Send To Gudang
                                        </button>



                                        {/* EDIT */}
                                        <SecondaryButton onClick={() => onEdit(order)}>
                                            Edit
                                        </SecondaryButton>

                                        {/* HAPUS */}
                                        <DangerButton
                                            onClick={() => {
                                                if (confirm('Hapus SPK ini?')) {
                                                    router.delete(`/production-orders/${order.id}`);
                                                }
                                            }}
                                        >
                                            Hapus
                                        </DangerButton>

                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="
py-12
text-center
text-slate-500
"
                            >
                                📂 Belum ada SPK Produksi
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}