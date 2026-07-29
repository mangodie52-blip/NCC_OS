import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

import NCCLogo from '@/Components/NCC/NCCLogo';



export default function Login({ status, canResetPassword }) {


    const {data,setData,post,processing,errors}=useForm({

        email:'',
        password:'',
        remember:false

    });



    function submit(e){

        e.preventDefault();

        post(route('login'));

    }



    return (

        <GuestLayout>


            <Head title="NCC Login"/>



            <div
                className="
                    relative
                    w-full
                    max-w-md
                "
            >



                <div
                    className="
                        relative
                        rounded-3xl
                        border
                        border-cyan-400/20
                        bg-[#0b1320]/80
                        backdrop-blur-xl
                        shadow-2xl
                        p-8
                        overflow-hidden
                    "
                >

                  

                    <div
                        className="
                            relative
                            z-10
                        "
                    >


                        <NCCLogo />


                        <form
                            onSubmit={submit}
                            className="
                                mt-10
                                space-y-5
                            "
                        >


                            <div>

                                <label
                                    className="
                                        text-xs
                                        text-slate-400
                                        tracking-widest
                                    "
                                >
                                    User Name
                                </label>


                                <input

                                    type="email"

                                    value={data.email}

                                    onChange={
                                        e=>setData(
                                            'email',
                                            e.target.value
                                        )
                                    }

                                    className="
                                        mt-2
                                        w-full
                                        bg-[#050912]
                                        border
                                        border-slate-700
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        focus:border-cyan-400
                                        focus:ring-0
                                    "

                                    placeholder="operator@ncc.local"

                                />


                            </div>




                            <div>


                                <label
                                    className="
                                        text-xs
                                        text-slate-400
                                        tracking-widest
                                    "
                                >
                                    Password
                                </label>



                                <input

                                    type="password"

                                    value={data.password}

                                    onChange={
                                        e=>setData(
                                            'password',
                                            e.target.value
                                        )
                                    }


                                    className="
                                        mt-2
                                        w-full
                                        bg-[#050912]
                                        border
                                        border-slate-700
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        focus:border-cyan-400
                                        focus:ring-0
                                    "

                                    placeholder="••••••••"

                                />



                            </div>



                            <button

                                disabled={processing}

                                className="
                                    w-full
                                    mt-5
                                    py-3
                                    rounded-xl
                                    bg-cyan-500
                                    text-black
                                    font-bold
                                    tracking-widest
                                    hover:bg-cyan-400
                                    transition
                                "

                            >

                                Login

                            </button>



                        </form>



                        <div
                            className="
                                mt-8
                                text-center
                                text-xs
                                text-slate-500
                            "
                        >

                            SYSTEM ONLINE • NCC CORE

                        </div>


                    </div>


                </div>


            </div>


        </GuestLayout>

    )

}