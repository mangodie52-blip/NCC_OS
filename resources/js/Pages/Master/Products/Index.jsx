import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import NCCLayout from "@/Layouts/NCCLayout";


export default function Index() {
const formatDateTime = (date) => {

    if (!date) return "-";

    const d = new Date(date);

    return `${d
        .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    } • ${
        d.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }`;

};

    const { products } = usePage().props;


    // ===========================
    // STATE
    // ===========================

    const [showModal, setShowModal] = useState(false);


    const [editingId, setEditingId] = useState(null);



    const [data, setData] = useState({

        kode: "",
        nama: "",
        customer: "",
        warna: "",
        ukuran: "",
        kategori: "",
        keterangan: "",

    });



    const placeholders = {

        kode: "KODE PRODUCT",
        nama: "NAMA PRODUK TAS",
        customer: "CUSTOMER",
        warna: "WARNA",
        ukuran: "UKURAN",
        kategori: "KATEGORI",
        keterangan: "KETERANGAN",

    };



    // ===========================
    // RESET
    // ===========================


    const resetForm = () => {

        setData({

            kode: "",
            nama: "",
            customer: "",
            warna: "",
            ukuran: "",
            kategori: "",
            keterangan: "",

        });


        setEditingId(null);

    };




    // ===========================
    // SIMPAN / UPDATE
    // ===========================


    const submit = (e) => {


        e.preventDefault();



        if (editingId) {


            router.put(

                route(
                    "products.update",
                    editingId
                ),

                data,

                {

                    preserveScroll: true,


                    onSuccess: () => {

                        setShowModal(false);
                        resetForm();

                    }

                }

            );


        } else {


            router.post(

                route("products.store"),

                data,

                {

                    preserveScroll: true,


                    onSuccess: () => {

                        setShowModal(false);
                        resetForm();

                    }

                }

            );


        }



    };





    // ===========================
    // EDIT MODAL
    // ===========================


    const editProduct = (product) => {


        setData({

            kode: product.kode ?? "",
            nama: product.nama ?? "",
            customer: product.customer ?? "",
            warna: product.warna ?? "",
            ukuran: product.ukuran ?? "",
            kategori: product.kategori ?? "",
            keterangan: product.keterangan ?? "",

        });


        setEditingId(product.id);


        setShowModal(true);


    };





    // ===========================
    // DELETE
    // ===========================


    const deleteProduct = (id) => {


        if (confirm("Yakin hapus product?")) {


            router.delete(

                route(
                    "products.destroy",
                    id
                ),

                {

                    preserveScroll: true

                }

            );


        }


    };




    return (


        <NCCLayout>


            <div className="p-6">


                {/* HEADER */}

                <div className="
flex
justify-between
items-center
mb-8
">


                    <div>


                        <h1 className="
text-3xl
font-black
text-white
tracking-wide
">

                            MASTER PRODUCT

                        </h1>


                        <p className="
text-slate-400
mt-2
">

                            Kelola seluruh data produk NEATS ERP.

                        </p>


                    </div>



                    <PrimaryButton

                        onClick={() => {

                            resetForm();

                            setShowModal(true);

                        }}

                    >

                        + Tambah Product

                    </PrimaryButton>



                </div>
                {/* TABLE */}


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


                    <table
                        className="
        w-full
        border-collapse
    "
                    >


                        <thead
                            className="
        bg-slate-950
    "
                        >


                            <tr>


                                {
                                    [
                                        "Kode",
                                        "Nama Product",
                                        "Customer",
                                        "Warna",
                                        "Ukuran",
                                        "Kategori",
                                        "Keterangan",
                                        "Dibuat",
                                        "Update",
                                        "Action"

                                    ].map((head) => (


                                        <th
                                            key={head}
                                            className="
        p-4
        text-center
        text-xs
        uppercase
        text-slate-300
        font-bold
        tracking-wider
    "
                                        >

                                            {head}

                                        </th>


                                    ))


                                }


                            </tr>


                        </thead>





                        <tbody>


                            {

                                products.map((product) => (


                                    <tr

                                        key={product.id}

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

                                            {product.kode}

                                        </td>




                                        <td className="
p-4
text-center
text-slate-200
">

                                            {product.nama}

                                        </td>





                                        <td className="
p-4
text-center
text-slate-300
">

                                            {product.customer}

                                        </td>





                                        <td className="
p-4
text-center
text-slate-300
">

                                            {product.warna}

                                        </td>





                                        <td className="
p-4
text-center
text-slate-300
">

                                            {product.ukuran}

                                        </td>





                                        <td className="
p-4
text-center
">

                                            <span
                                                className="
px-3
py-1
rounded-full
bg-blue-500/20
text-blue-300
text-xs
font-bold
"
                                            >

                                                {product.kategori}

                                            </span>


                                        </td>





                                        <td className="
p-4
text-center
text-slate-300
">

                                            {product.keterangan}

                                        </td>





                                        <td className="
p-4
text-center
text-xs
text-slate-400
">

                                            {formatDateTime(product.created_at)}

                                        </td>





                                        <td className="
p-4
text-center
text-xs
text-slate-400
">

                                            {formatDateTime(product.updated_at)}

                                        </td>





                                        <td className="
p-4
text-center
">

                                            <div
                                                className="
flex
justify-center
gap-2
"
                                            >


                                                <button

                                                    onClick={() => editProduct(product)}

                                                    className="
bg-yellow-500
hover:bg-yellow-400
text-black
px-3
py-1
rounded-lg
text-xs
font-bold
"

                                                >

                                                    ✏ Edit

                                                </button>





                                                <button

                                                    onClick={() => deleteProduct(product.id)}

                                                    className="
bg-red-600
hover:bg-red-500
text-white
px-3
py-1
rounded-lg
text-xs
font-bold
"

                                                >

                                                    🗑 Hapus

                                                </button>



                                            </div>


                                        </td>



                                    </tr>



                                ))


                            }



                        </tbody>


                    </table>


                </div>
                {
                    showModal &&

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
w-[550px]
rounded-2xl
border
border-slate-700
bg-slate-900
p-6
shadow-2xl
"
                        >


                            <h2
                                className="
text-xl
font-black
text-white
mb-6
"
                            >

                                {
                                    editingId
                                        ?
                                        "Edit Product"
                                        :
                                        "Tambah Product"
                                }

                            </h2>

<form onSubmit={submit}>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {[
            "kode",
            "nama",
            "customer",
            "warna",
            "ukuran",
            "kategori",
        ].map((field) => (

            <div key={field}>

                <label
                    className="
                        block
                        mb-2
                        text-sm
                        font-medium
                        text-slate-400
                        tracking-wide
                    "
                >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                <input
                    type="text"
                    value={data[field]}
                    placeholder={placeholders[field]}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [field]: e.target.value,
                        })
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        border-[#2A3648]
                        bg-[#111827]
                        px-4
                        py-3
                        text-slate-200
                        placeholder:text-slate-500
                        focus:border-cyan-500
                        focus:ring-1
                        focus:ring-cyan-500/30
                        transition-all
                        duration-200
                        outline-none
                    "
                />

            </div>

        ))}

    </div>

    {/* Keterangan */}
    <div className="mt-5">

        <label
            className="
                block
                mb-2
                text-sm
                font-medium
                text-slate-400
                tracking-wide
            "
        >
            Keterangan
        </label>

        <textarea
            rows={3}
            value={data.keterangan}
            placeholder={placeholders.keterangan}
            onChange={(e) =>
                setData({
                    ...data,
                    keterangan: e.target.value,
                })
            }
            className="
                w-full
                rounded-xl
                border
                border-[#2A3648]
                bg-[#111827]
                px-4
                py-3
                text-slate-200
                placeholder:text-slate-500
                focus:border-cyan-500
                focus:ring-1
                focus:ring-cyan-500/30
                transition-all
                duration-200
                outline-none
                resize-none
            "
        />

    </div>

    {/* Footer */}
    <div
        className="
            flex
            justify-end
            gap-3
            mt-6
            pt-5
            border-t
            border-[#223047]
        "
    >

        <button
            type="button"
            onClick={() => {
                setShowModal(false);
                resetForm();
            }}
            className="
                px-5
                py-2.5
                rounded-xl
                border
                border-[#2A3648]
                bg-[#1A2433]
                text-slate-300
                hover:bg-[#243244]
                hover:text-white
                transition-all
                duration-200
            "
        >
            Batal
        </button>

        <PrimaryButton
            type="submit"
            className="px-6 py-2.5"
        >
            💾 Simpan Product
        </PrimaryButton>

    </div>

</form>

                            


                        </div>


                    </div>


                }

            </div>

        </NCCLayout>

    );

}
