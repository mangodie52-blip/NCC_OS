import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';



export default function Detail() {

    const { mr, flash = {} } = usePage().props;


    // =========================
    // FORMAT ANGKA DECIMAL
    // =========================
    const formatNumber = (num) => {

        const value = parseFloat(num || 0);

        return value % 1 === 0
            ? value.toString()
            : value.toFixed(4).replace(/\.?0+$/, '');

    };


    // =========================
    // CEK STOK KURANG
    // =========================
    const shortageItems = (mr.details || []).filter((d) => {

        const stok = Number(d.material?.stok || 0);
        const request = Number(d.qty_request || 0);

        return stok < request;

    });



    // =========================
    // APPROVE MR
    // =========================
    const approve = (id) => {

        const detailText = (mr.details || [])
            .map((d, i) =>
                `${i + 1}. ${d.material?.nama || '-'}\n   ${formatNumber(d.qty_request)} ${d.satuan}`
            )
            .join('\n\n');


        if (!confirm(
            `Approve Material Request ${mr.nomor_mr}?\n\n` +
            detailText +
            `\n\nStok gudang akan langsung berkurang.`
        )) {
            return;
        }


        router.post(
            route('material-requests.approve', id),
            {},
            {
                onSuccess: () => {

                    alert(
                        '✅ Material Request berhasil di approve.'
                    );

                },
            }
        );

    };



    return (

        <AppLayout>

            <div
                className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-6
        "
            >

                <div
                    className="
            bg-slate-900
            border
            border-slate-700
            rounded-3xl
            shadow-2xl
            w-full
            max-w-7xl
            max-h-[92vh]
            overflow-y-auto
            p-8
            "
                >

                    {/* FLASH MESSAGE */}

                    {flash.error && (

                        <div
                            className="
                    mb-5
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-500/15
                    text-red-400
                    px-5
                    py-4
                    font-semibold
                    "
                        >

                            {flash.error}

                        </div>

                    )}

                    {flash.success && (

                        <div
                            className="
                    mb-5
                    rounded-xl
                    border
                    border-green-500/30
                    bg-green-500/15
                    text-green-400
                    px-5
                    py-4
                    font-semibold
                    "
                        >

                            {flash.success}

                        </div>

                    )}

                    {/* WARNING */}

                    {shortageItems.length > 0 && (

                        <div
                            className="
                    mb-6
                    rounded-xl
                    border
                    border-yellow-500/30
                    bg-yellow-500/15
                    text-yellow-300
                    px-5
                    py-4
                    "
                        >

                            <div className="font-bold text-lg mb-3">

                                ⚠ Material Stock Warning

                            </div>

                            <ul className="list-disc pl-5">

                                {shortageItems.map((item) => (

                                    <li key={item.id}>

                                        <b>{item.material?.nama}</b>

                                        {" "}
                                        Kurang{" "}

                                        {formatNumber(
                                            Number(item.qty_request) -
                                            Number(item.material?.stok || 0)
                                        )}

                                        {" "}

                                        {item.satuan}

                                    </li>

                                ))}

                            </ul>

                        </div>

                    )}

                    {/* HEADER */}

                    <div className="border-b border-slate-700 pb-5 mb-8">

                        <h1 className="text-3xl font-black tracking-wide text-white">

                            Material Request

                        </h1>

                        <p className="text-slate-400 mt-2">

                            Detail permintaan material produksi dan monitoring material yang akan digunakan.

                        </p>

                    </div>

                    {/* INFO MR */}

                    <div className="grid md:grid-cols-5 gap-5 mb-8">

                        <div
                            className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    hover:border-cyan-500/40
                    transition
                    rounded-xl
                    p-4
                    "
                        >

                            <div className="text-xs text-slate-500">

                                No MR

                            </div>

                            <div className="mt-2 text-white font-bold">

                                {mr.nomor_mr}

                            </div>

                        </div>

                        <div
                            className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    hover:border-cyan-500/40
                    transition
                    rounded-xl
                    p-4
                    "
                        >

                            <div className="text-xs text-slate-500">

                                No SPK

                            </div>

                            <div className="mt-2 text-cyan-400 font-bold">

                                {mr.production_order?.nomor_spk}

                            </div>

                        </div>

                        <div
                            className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    hover:border-cyan-500/40
                    transition
                    rounded-xl
                    p-4
                    "
                        >

                            <div className="text-xs text-slate-500">

                                Product

                            </div>

                            <div className="mt-2 text-white font-semibold">

                                {mr.production_order?.product?.nama}

                            </div>

                        </div>

                        <div
                            className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    hover:border-cyan-500/40
                    transition
                    rounded-xl
                    p-4
                    "
                        >

                            <div className="text-xs text-slate-500">

                                Tanggal

                            </div>

                            <div className="mt-2 text-white">

                                {mr.tanggal}

                            </div>

                        </div>

                        <div
                            className="
                    bg-slate-800/80
                    border
                    border-slate-700
                    hover:border-cyan-500/40
                    transition
                    rounded-xl
                    p-4
                    "
                        >

                            <div className="text-xs text-slate-500">

                                Status

                            </div>

                            <div className="mt-2">

                                <span className="
                            bg-green-500/20
                            text-green-400
                            rounded-full
                            px-3
                            py-1
                            font-bold
                            inline-block
                        ">

                                    {mr.status}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* =========================
                TABEL MATERIAL
            ========================= */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-700">

                        <table className="w-full">

                            <thead className="bg-cyan-500/10 border-b border-slate-700">
    <tr>
        <th className="p-4 text-left text-slate-300 font-semibold">
            Material
        </th>

        <th className="p-4 text-center text-slate-300 font-semibold">
            Qty Request
        </th>

        <th className="p-4 text-center text-slate-300 font-semibold">
            Satuan
        </th>

        <th className="p-4 text-center text-slate-300 font-semibold">
            Qty Approved
        </th>

        <th className="p-4 text-center text-slate-300 font-semibold">
            Status
        </th>
    </tr>
</thead>

                            <tbody>

{(mr.details || []).map((detail) => (

<tr
    key={detail.id}
    className="
        border-b
        border-slate-800
        hover:bg-slate-800/60
        transition
    "
>

<td className="p-4 text-white font-semibold">
    {detail.material?.nama}
</td>

<td className="p-4 text-center text-white">
    {formatNumber(detail.qty_request)}
</td>

<td className="p-4 text-center">
    <span
        className="
        inline-block
        bg-cyan-500/20
        text-cyan-300
        rounded-full
        px-3
        py-1
        font-bold
        "
    >
        {detail.satuan}
    </span>
</td>

<td className="p-4 text-center">

    {Number(detail.qty_approved) > 0 ? (

        <span
            className="
            inline-block
            bg-green-500/20
            text-green-400
            rounded-full
            px-3
            py-1
            font-bold
            "
        >

            {formatNumber(detail.qty_approved)}

        </span>

    ) : (

        "-"

    )}

</td>

<td className="p-4 text-center">

    <span
        className={`

        inline-block
        px-3
        py-1
        rounded-full
        text-xs
        font-bold

        ${
            Number(detail.qty_approved) > 0
            ? "bg-green-500/20 text-green-400"
            : "bg-yellow-500/20 text-yellow-400"
        }

        `}
    >

        {
            Number(detail.qty_approved) > 0
            ? "APPROVED"
            : "WAITING"
        }

    </span>

</td>

</tr>

))}

</tbody>

                        </table>

                    </div>

                    {/* CATATAN */}

                    <div className="mt-8">

                        <label className="text-slate-300 font-semibold">

                            Catatan

                        </label>

                        <textarea

                            rows="3"

                            placeholder="Tambahkan catatan..."

                            className="
        mt-3
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
        focus:border-cyan-400
        focus:ring-2
        focus:ring-cyan-500/30
        "

                        />

                    </div>

                    {/* BUTTON */}

                    <div className="mt-8 flex justify-end gap-3 flex-wrap">

                        {(mr.status === 'Waiting Approval' ||
                            mr.status === 'Pending') && (

                                <button

                                    onClick={() => approve(mr.id)}

                                    className="
            px-5
            py-2.5
            rounded-xl
            bg-green-600
            hover:bg-green-500
            text-white
            font-semibold
            transition
            "

                                >

                                    ✅ Approve

                                </button>

                            )}

                        {mr.status === 'Waiting Approval' && (

                            <button

                                onClick={() => {

                                    const reason = prompt(
                                        'Alasan reject material request:'
                                    );

                                    if (reason && reason.trim() !== '') {

                                        router.post(
                                            route('material-requests.reject', mr.id),
                                            { reason }
                                        );

                                    }

                                }}

                                className="
            px-5
            py-2.5
            rounded-xl
            bg-red-600
            hover:bg-red-500
            text-white
            font-semibold
            transition
            "

                            >

                                ❌ Reject

                            </button>

                        )}

                        {(mr.status === 'Approved' ||
                            mr.status === 'Partial') && (

                                <button

                                    onClick={() => {

                                        if (
                                            confirm(
                                                'Keluarkan material dari gudang?'
                                            )
                                        ) {

                                            router.post(
                                                route('material-issues.store', mr.id)
                                            );

                                        }

                                    }}

                                    className="
            px-5
            py-2.5
            rounded-xl
            bg-purple-600
            hover:bg-purple-500
            text-white
            font-semibold
            transition
            "

                                >

                                    📦 Keluarkan Material

                                </button>

                            )}

                        <a

                            href={route(
                                'material-requests.print',
                                mr.id
                            )}

                            target="_blank"

                            rel="noreferrer"

                            className="
        px-5
        py-2.5
        rounded-xl
        bg-slate-700
        hover:bg-slate-600
        text-white
        font-semibold
        transition
        "

                        >

                            🖨 Print

                        </a>

                        <Link

                            href={route(
                                'material-requests.index'
                            )}

                            className="
        px-5
        py-2.5
        rounded-xl
        bg-cyan-600
        hover:bg-cyan-500
        text-white
        font-semibold
        transition
        "

                        >

                            Close

                        </Link>

                    </div>

                </div>

            </div>

        </AppLayout>

    );

}