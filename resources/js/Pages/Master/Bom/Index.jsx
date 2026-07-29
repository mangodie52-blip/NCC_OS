import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import NCCLayout from "@/Layouts/NCCLayout";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";


export default function Index() {

    const { boms, products, materials } = usePage().props;

    // =========================
    // FORMAT ANGKA
    // =========================
    const formatNumber = (num) => {
        const value = parseFloat(num || 0);

        return value % 1 === 0
            ? value.toString()
            : value.toFixed(4).replace(/\.?0+$/, '');
    };

    // format 1000 => 1.000
    const formatRibuan = (value) => {

        if (!value) return '';

        return Number(value).toLocaleString('id-ID');
    };



    // =========================
    // STATE
    // =========================

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState({
        product_id: '',
        material_id: '',
        kebutuhan: '',
        satuan: '',
        waste: 0,
    });

    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {

        setData({
            product_id: '',
            material_id: '',
            kebutuhan: '',
            satuan: '',
            waste: 0,
        });

        
    };

    // =========================
    // SAVE BOM
    // =========================
    const submit = (e) => {

        e.preventDefault();

        router.post(route('boms.store'), data, {

            preserveScroll: true,

            onSuccess: () => {

                alert('✅ BOM berhasil disimpan');

                setShowModal(false);
                resetForm();
            },

            onError: (errors) => {

                console.log(errors);
                alert('❌ Gagal menyimpan BOM');
            },
        });
    };

    // =========================
    // HAPUS BOM
    // =========================
    const deleteBom = (id) => {

        if (!confirm('Yakin ingin menghapus BOM?')) return;

        router.delete(route('boms.destroy', id));
    };

    const formatSatuan = (satuan) => {
        switch (satuan) {
            case 'M':
                return 'Meter';
            case 'KG':
                return 'Kg';
            case 'PCS':
                return 'PCS';
            case 'ROLL':
                return 'Roll';
            case 'PACK':
                return 'Pack';
            case 'BOX':
                return 'Box';
            default:
                return satuan; // kalau ada satuan baru, tampil apa adanya
        }
    };


    return (

        <NCCLayout>

            <div className="p-6">

                {/* ================= HEADER NCC ================= */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-black tracking-wide text-white">

                            Master BOM

                        </h1>

                        <p className="text-slate-400 mt-2">

                            Kelola Bill Of Material untuk seluruh produk.

                        </p>

                    </div>


                    <PrimaryButton

                        onClick={() => {

                            resetForm();

                            setShowModal(true);

                        }}

                    >

                        + Tambah BOM

                    </PrimaryButton>


                </div>
                <div className="grid grid-cols-4 gap-5 mb-6">

                    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-5">

                        <p className="text-slate-400 text-sm">

                            Total BOM

                        </p>

                        <h2 className="text-3xl font-black text-white mt-2">

                            {boms.length}

                        </h2>

                    </div>

                    <div className="bg-blue-500/10 rounded-2xl border border-blue-500/30 p-5">

                        <p className="text-blue-300 text-sm">

                            Module

                        </p>

                        <h2 className="text-blue-300 text-2xl font-black mt-2">

                            BOM

                        </h2>

                    </div>

                </div>

                {/* TABEL BOM */}

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

                    <table className="w-full">

                        <thead
                            className="
bg-slate-950
border-b
border-slate-700
"
                        >

                            <tr>
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >No</th>
                                <th
                                    className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >

                                    Product

                                </th>
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >Material</th>
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >Satuan</th>
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >Kebutuhan / PCS</th>
                                
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >Waste (%)</th>
                                <th className="
p-4
text-center
text-xs
uppercase
tracking-wider
font-bold
text-slate-300
"
                                >Aksi</th>
                            </tr>

                        </thead>

                        <tbody>

                            {boms.length > 0 ? (

                                boms.map((bom, index) => {

                                    // =========================
                                    // KONVERSI KE METER
                                    // =========================

                                    let kebutuhanMeter = parseFloat(bom.kebutuhan || 0);

                                    if (bom.satuan === 'CM') {
                                        kebutuhanMeter = kebutuhanMeter / 100;
                                    }

                                    if (bom.satuan === 'MM') {
                                        kebutuhanMeter = kebutuhanMeter / 1000;
                                    }

                                    // =========================
                                    // TOTAL KEBUTUHAN PRODUKSI
                                    // =========================

                                    const totalKebutuhan =
                                        kebutuhanMeter *
                                        parseFloat(bom.qty_permintaan || 0) *
                                        (1 + parseFloat(bom.waste || 0) / 100);

                                    // =========================
                                    // JUMLAH KEMASAN (ROLL)
                                    // =========================

                                    const jumlahKemasan =
                                        totalKebutuhan / parseFloat(bom.isi_kemasan || 1);

                                    return (

                                        <tr

                                            key={bom.id}

                                            className="
border-b
border-slate-800
hover:bg-slate-800/60
transition
"

                                        >

                                            {/* NO */}

                                            <td className="
p-4
text-center
text-slate-300
">
                                                {index + 1}
                                            </td>

                                            {/* PRODUCT */}

                                            <td className="p-4
text-center
text-slate-300
">
                                                {bom.product?.nama}
                                            </td>

                                            {/* MATERIAL */}

                                            <td className="
p-4
text-center
text-slate-300
">
                                                {bom.material?.nama}
                                            </td>
                                                                                      

                                            {/* SATUAN PERMINTAAN */}

                                            <td className="
p-4
text-center
text-slate-300
">
                                                {formatSatuan(bom.satuan)}
                                            </td>

                                            {/* KEBUTUHAN / PCS */}

                                            <td className="
p-4
text-center
text-slate-300
">
                                                {formatNumber(bom.kebutuhan)}
                                            </td>


                                            

                                            {/* WASTE */}

                                            <td className="
p-4
text-center
text-slate-300
">
                                                {formatNumber(bom.waste || 0)} %
                                            </td>

                                            {/* AKSI */}

                                            <td className="
p-4
text-center
text-slate-300
">

                                                <DangerButton
                                                    onClick={() => deleteBom(bom.id)}
                                                >

                                                    🗑 Hapus

                                                </DangerButton>

                                            </td>

                                        </tr>
                                    );
                                })

                            ) : (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-8 text-gray-500"
                                    >
                                        Belum ada data BOM
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* ===========================
                MODAL TAMBAH BOM
            =========================== */}

            {showModal && (

                <div
                    className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        transition-all
        duration-300
    "
                >

                    <div
                        className="
w-[650px]
rounded-2xl
border
border-slate-700
bg-slate-950
shadow-2xl
p-8
"
                    >

                        <h2
                            className="
text-2xl
font-black
tracking-wide
text-white
mb-8
"
                        >
                            Tambah BOM
                        </h2>

                        <form onSubmit={submit} className="space-y-2">

                            {/* PRODUCT */}

                            <div className="space-y-2">

                                <label className="
p-4
text-center
text-slate-200
">
                                    Product
                                </label>

                                <select
                                    value={data.product_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            product_id: e.target.value,
                                        })
                                    }
                                    className="
w-full
rounded-xl
border
border-slate-700
bg-slate-900
text-white
px-4
py-3
mb-2
 focus:border-cyan-400
focus:ring-2
focus:ring-blue-500/40
outline-none
transition
"
                                    required
                                >

                                    <option value="">Pilih Product</option>

                                    {products.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.nama}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* MATERIAL */}

                            <div className="space-y-2">

                                <label className="
p-4
text-center
text-slate-200
">
                                    Material
                                </label>

                                <select
                                    value={data.material_id}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            material_id: e.target.value,
                                        })
                                    }
                                    className="
w-full
rounded-xl
border
border-slate-700
bg-slate-900
text-white
px-4
py-3
 focus:border-cyan-400
focus:ring-2
focus:ring-blue-500/40
outline-none
transition
"
                                    required
                                >

                                    <option value="">Pilih Material</option>

                                    {materials.map((material) => (
                                        <option
                                            key={material.id}
                                            value={material.id}
                                        >
                                            {material.nama}
                                        </option>
                                    ))}

                                </select>

                            </div>


                            {/* SATUAN PERMINTAAN BOM */}

                            <div className="mb-5">

                                <label
                                    className="
            block
            mb-2
            text-sm
            font-semibold
            tracking-wide
            text-slate-300
        "
                                >
                                    Satuan Permintaan BOM
                                </label>

                                <select
                                    value={data.satuan || ""}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            satuan: e.target.value,
                                        }))
                                    }
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
                                    required
                                >

                                    <option value="" className="bg-slate-900 text-slate-400">
                                        Pilih Satuan
                                    </option>

                                    {/* ===== BERAT ===== */}

                                    <optgroup
                                        label="⚖️ Berat"
                                        className="bg-slate-800 text-cyan-300"
                                    >
                                        <option value="KG">Kilogram (KG)</option>
                                        <option value="GR">Gram (GR)</option>
                                        <option value="TON">Ton (TON)</option>
                                    </optgroup>

                                    {/* ===== VOLUME ===== */}

                                    <optgroup
                                        label="🧪 Volume"
                                        className="bg-slate-800 text-cyan-300"
                                    >
                                        <option value="L">Liter (L)</option>
                                        <option value="ML">Mililiter (ML)</option>
                                    </optgroup>

                                    {/* ===== PANJANG ===== */}

                                    <optgroup
                                        label="📏 Panjang"
                                        className="bg-slate-800 text-cyan-300"
                                    >
                                        <option value="M">Meter (M)</option>
                                        <option value="CM">Centimeter (CM)</option>
                                        <option value="MM">Milimeter (MM)</option>
                                        <option value="YD">Yard (YD)</option>
                                    </optgroup>

                                    {/* ===== JUMLAH ===== */}

                                    <optgroup
                                        label="📦 Jumlah"
                                        className="bg-slate-800 text-cyan-300"
                                    >
                                        <option value="PCS">Pieces (PCS)</option>
                                        <option value="SET">Set (SET)</option>
                                        <option value="PAIR">Pair / Pasang (PAIR)</option>
                                        <option value="LUSIN">Lusin (12 PCS)</option>
                                    </optgroup>

                                    {/* ===== KEMASAN ===== */}

                                    <optgroup
                                        label="📦 Kemasan"
                                        className="bg-slate-800 text-cyan-300"
                                    >
                                        <option value="PACK">Pack</option>
                                        <option value="BOX">Box</option>
                                        <option value="ROLL">Roll</option>
                                        <option value="CONE">Cone</option>
                                        <option value="KARUNG">Karung</option>
                                        <option value="DRUM">Drum</option>
                                        <option value="PALLET">Pallet</option>
                                    </optgroup>

                                </select>

                                <p
                                    className="
            mt-2
            text-xs
            text-slate-500
        "
                                >
                                    Pilih satuan kebutuhan material untuk setiap 1 PCS produk.
                                </p>

                            </div>

                            {/* KEBUTUHAN */}

                            <div className="space-y-2">
                                <label className="
block
mb-2
text-sm
font-semibold
text-slate-300
tracking-wide
">
                                    Kebutuhan / PCS
                                </label>

                                <input
                                    type="number"
                                    step="0.0001"
                                    value={data.kebutuhan}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            kebutuhan: e.target.value,
                                        })
                                    }
                                    className="
w-full
rounded-xl
border
border-slate-700
bg-slate-900
text-white
px-4
py-3
 focus:border-cyan-400
focus:ring-2
focus:ring-blue-500/40
outline-none
transition
"
                                    placeholder="0.5"
                                    required
                                />

                                <p className="text-xs text-gray-500 mt-1">
                                    Sistem akan otomatis mengkonversi satuan stok material
                                    ke satuan permintaan BOM.
                                </p>

                            </div>

                            {/* QTY PERMINTAAN */}

                            

                            {/* WASTE */}

                            <div className="mb-6">

                                <label className="
block
mb-2
text-sm
font-semibold
text-slate-300
tracking-wide
">
                                    Waste (%)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.waste}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            waste: e.target.value,
                                        })
                                    }
                                    className="
w-full
rounded-xl
border
border-slate-700
bg-slate-900
text-white
px-4
py-3
 focus:border-cyan-400
focus:ring-2
focus:ring-blue-500/40
outline-none
transition
"
                                    placeholder="contoh: 5"
                                    required
                                />

                            </div>

                            {/* BUTTON */}

                            <div className="flex justify-end gap-3">

                                <SecondaryButton
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                >
                                    Batal
                                </SecondaryButton>

                                <PrimaryButton
                                    type="submit"
                                >

                                    💾 Simpan BOM

                                </PrimaryButton>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </NCCLayout>
    );
}