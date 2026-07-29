import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ProductionForm({
    show,
    products,
    order,
    onClose
}) {

    const [data, setData] = useState({
        nomor_spk: "",
        product_id: "",
        qty: "",
        tanggal: "",
        status: "Draft",
        send_to_gudang: true,
    });

    const initialState = {
        nomor_spk: "",
        product_id: "",
        qty: "",
        tanggal: "", // kosong
        status: "Draft",
        send_to_gudang: true,
    };
    const resetForm = () => setData(initialState);

    // isi form saat edit
    useEffect(() => {

        if (show) {

            if (order) {

                setData({
                    nomor_spk: order.nomor_spk || "",
                    product_id: order.product_id || "",
                    qty: order.qty || "",
                    tanggal: order.tanggal || "",
                    status: order.status || "Draft",
                    send_to_gudang: true,
                });

            } else {

                resetForm(); // kosong + tanggal hari ini

            }
        }

    }, [show, order]);

    if (!show) return null;

    // simpan / update
    const submit = (e) => {

        e.preventDefault();

        if (order) {

            router.put(
                route("production-orders.update", order.id),
                data,
                {
                    onSuccess: () => onClose(),
                }
            );

        } else {

            router.post(
                route("production-orders.store"),
                data,
                {
                    onSuccess: () => onClose(),
                }
            );

        }

    };


    return (

        <div
            className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
backdrop-blur-sm
"
        >
            <div
                className="
w-[620px]
rounded-2xl
border
border-slate-700
bg-slate-900
shadow-2xl
p-7
"
            >


                <h2
                    className="
text-2xl
font-black
tracking-wide
text-white
mb-7
"
                >
                    {order ? "EDIT SPK" : "TAMBAH SPK"}
                </h2>


                <form onSubmit={submit} className="
block
mb-2
text-sm
font-semibold
tracking-wide
text-slate-300
"
                >

                    <div className="space-y-2">

                        <label className="
        block
        text-sm
        font-semibold
        text-slate-300
    ">
                            Nomor SPK
                        </label>

                        <input
                            type="text"
                            value={data.nomor_spk}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nomor_spk: e.target.value
                                })
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
            outline-none
        "
                            placeholder="SPK-00001"
                            required
                        />

                    </div>

                    {/* Product */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Product
                        </label>

                        <select
                            value={data.product_id}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    product_id: e.target.value
                                })
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
placeholder:text-slate-500
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"
                            required
                        >

                            <option value="">
                                Pilih Product
                            </option>

                            {products.map((p) => (

                                <option key={p.id} value={p.id}>
                                    {p.nama}
                                </option>

                            ))}

                        </select>
                    </div>

                    {/* Qty */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Qty Produksi
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={data.qty}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    qty: e.target.value
                                })
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
placeholder:text-slate-500
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"
                            placeholder="100"
                            required
                        />
                    </div>

                    {/* Tanggal */}
                    <div>
                        <label className="block font-semibold mb-2">
                            Tanggal
                        </label>

                        <input
                            type="date"
                            value={data.tanggal}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    tanggal: e.target.value
                                })
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
placeholder:text-slate-500
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"
                            required
                        />
                    </div>

                    {/* Status saat edit */}
                    {order && (
                        <div>
                            <label className="block font-semibold mb-2">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        status: e.target.value
                                    })
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
placeholder:text-slate-500
outline-none
transition
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30
"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Planning">Planning</option>
                                <option value="Produksi">Produksi</option>
                                <option value="Selesai">Selesai</option>
                                <option value="Cancel">Cancel</option>
                            </select>
                        </div>
                    )}

                    {/* Auto MR */}
                    {!order && (
                        <div
                            className="
rounded-xl
border
border-cyan-500/30
bg-cyan-500/10
p-4
"
                        >
                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={data.send_to_gudang}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            send_to_gudang: e.target.checked
                                        })
                                    }
                                />

                                <span
                                    className="
font-semibold
text-cyan-300
"
                                >
                                    Langsung buat Material Request ke Gudang
                                </span>

                            </label>
                        </div>
                    )}
                                      

                    {/* Button */}
                    <div className="flex justify-end gap-3 pt-3">

                        <SecondaryButton
                            type="button"
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                        >
                            Batal
                        </SecondaryButton>

                        <PrimaryButton
                            type="submit"
                        >
                            {order ? "💾 Update SPK" : "💾 Simpan SPK"}
                        </PrimaryButton>

                    </div>

                </form>

            </div>

        </div >

    );
}