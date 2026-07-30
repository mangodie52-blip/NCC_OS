import { useState } from "react";
import { usePage } from "@inertiajs/react";
import NCCLayout from "@/Layouts/NCCLayout";
import ProductionTable from "./ProductionTable";
import ProductionForm from "./ProductionForm";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index() {

    const { orders, products } = usePage().props;

    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const sendToGudang = (order) => {

    router.post(

        route("material-requests.store"),

        {
            production_order_id: order.id,
        },

        {

            preserveScroll: true,

            onSuccess: () => {

                alert("✅ SPK berhasil dikirim ke Gudang.");

            },

            onError: (errors) => {

                console.log(errors);

                alert("❌ Gagal mengirim SPK ke Gudang.");

            },

        }

    );

};

    return (

        <NCCLayout>

            <div className="p-6">

                {/* HEADER NCC */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="
                            text-3xl
                            font-black
                            tracking-wide
                            text-white
                        ">
                            MASTER SPK
                        </h1>

                        <p className="
                            mt-2
                            text-slate-400
                        ">
                            Kelola seluruh Surat Perintah Kerja (SPK) Produksi.
                        </p>

                    </div>

                    <PrimaryButton
                        onClick={() => {
                            setSelectedOrder(null);
                            setShowModal(true);
                        }}
                    >
                        + Tambah SPK
                    </PrimaryButton>

                </div>

                {/* CONTENT */}

                <div
                    className="
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-900
                        shadow-2xl
                        overflow-hidden
                    "
                >

                    <ProductionTable
                        orders={orders}
                        onEdit={(order) => {
                            setSelectedOrder(order);
                            setShowModal(true);
                        }}
                    />

                </div>

                <ProductionForm
                    show={showModal}
                    products={products}
                    order={selectedOrder}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedOrder(null);
                    }}
                />

            </div>

        </NCCLayout>

    );

}