import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';



export default function Register() {


    const { data, setData, post, processing, errors, reset } = useForm({

        name: '',
        email: '',
        password: '',
        password_confirmation: '',

    });



    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);




    const submit = (e) => {

        e.preventDefault();


        post(route('register'), {

            onFinish: () =>
                reset(
                    'password',
                    'password_confirmation'
                ),

        });

    };





    const inputClass = `
    mt-2
    w-full
    rounded-lg
    border
    border-slate-700
    bg-[#070B12]
    px-4
    py-3
    text-sm
    text-slate-200
    placeholder-slate-600
    outline-none
    transition

    autofill:bg-[#070B12]
    autofill:text-slate-200

    focus:border-cyan-400
    focus:ring-1
    focus:ring-cyan-400
`;






    return (

        <GuestLayout>


            <Head title="NCC Register" />



            <div

                className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950/80
                    p-8
                    shadow-2xl
                    backdrop-blur
                "

            >




                <div className="mb-8 text-center">


                    <h1

                        className="
                            text-xl
                            font-bold
                            tracking-[0.3em]
                            text-cyan-400
                        "

                    >

                        NCC OS

                    </h1>



                    <p

                        className="
                            mt-2
                            text-xs
                            tracking-widest
                            text-slate-500
                        "

                    >

                        CREATE CONTROL CENTER ACCOUNT

                    </p>



                </div>







                <form onSubmit={submit}>




                    {/* USER NAME */}


                    <div>


                        <label

                            className="
                                text-xs
                                tracking-widest
                                text-slate-500
                            "

                        >

                            USER NAME

                        </label>



                        <input


                            type="text"


                            value={data.name}


                            onChange={(e)=>

                                setData(
                                    'name',
                                    e.target.value
                                )

                            }



                            className={inputClass}


                            required


                        />



                        <InputError

                            message={errors.name}

                        />


                    </div>









                    {/* EMAIL */}



                    <div className="mt-5">


                        <label

                            className="
                                text-xs
                                tracking-widest
                                text-slate-500
                            "

                        >

                            EMAIL

                        </label>




                        <input


                            type="email"


                            value={data.email}



                            onChange={(e)=>

                                setData(
                                    'email',
                                    e.target.value
                                )

                            }



                            className={inputClass}



                            required


                        />



                        <InputError

                            message={errors.email}

                        />


                    </div>









                    {/* PASSWORD */}

<div className="relative mt-5">


    <label

        className="
            text-xs
            tracking-widest
            text-slate-500
        "

    >

        PASSWORD

    </label>




    <input


        type={

            showPassword
            ?
            "text"
            :
            "password"

        }



        value={data.password}



        onChange={(e)=>

            setData(
                'password',
                e.target.value
            )

        }



        autoComplete="new-password"



        className={inputClass}



        required



    />





    <button


        type="button"



        onClick={()=>

            setShowPassword(
                !showPassword
            )

        }



        className="

            absolute
            right-3
            top-9
            flex
            items-center
            justify-center
            text-slate-500
            transition

            hover:text-cyan-400

        "



    >



        {

            showPassword

            ?

            <EyeOff size={18}/>

            :

            <Eye size={18}/>

        }



    </button>





    <InputError

        message={errors.password}

    />


</div>









                    {/* CONFIRM PASSWORD */}



                    <div className="relative mt-5">



                        <label

                            className="
                                text-xs
                                tracking-widest
                                text-slate-500
                            "

                        >

                            CONFIRM PASSWORD

                        </label>






                        <input




                            type={

                                showConfirmPassword
                                ?
                                "text"
                                :
                                "password"

                            }



                            value={data.password_confirmation}




                            onChange={(e)=>

                                setData(
                                    'password_confirmation',
                                    e.target.value
                                )

                            }




                            className={inputClass}




                            required




                        />







                        <button



                            type="button"



                            onClick={()=>

                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )

                            }



                            className="

                                absolute
                                right-3
                                top-9
                                flex
                                items-center
                                justify-center
                                text-slate-500
                                transition
                                hover:text-cyan-400

                            "



                        >



                            {

                                showConfirmPassword

                                ?

                                <EyeOff size={18}/>

                                :

                                <Eye size={18}/>

                            }



                        </button>



                    </div>









                    <div


                        className="

                            mt-8
                            flex
                            items-center
                            justify-between

                        "


                    >





                        <Link


                            href={route('login')}



                            className="

                                text-xs
                                tracking-widest
                                text-slate-500
                                hover:text-cyan-400

                            "



                        >

                            LOGIN

                        </Link>







                        <button



                            disabled={processing}



                            className="

                                rounded-lg
                                border
                                border-cyan-400
                                bg-cyan-400/10
                                px-6
                                py-3
                                text-xs
                                font-bold
                                tracking-widest
                                text-cyan-300
                                transition
                                hover:bg-cyan-400/20

                            "



                        >


                            REGISTER


                        </button>






                    </div>





                </form>




            </div>





        </GuestLayout>

    );


}