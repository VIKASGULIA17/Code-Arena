import React, { useState } from 'react'
import { FaGoogle, FaDiscord, FaTwitch, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';


const Login = () => {

    return (
        <div className={`
        w-full h-screen
         absolute top-0 left-0 duration-1000 text-black flex bg-white/50
         flex-row
         lg:flex-row 
         `}>
            <Navbar />

            <div className='h-[40vh] shadow-2xl border border-cardbg rounded-2xl 
            top-0 left-0 bg-grey
            lg:w-[55vw] absolute lg:top-40 lg:left-120 lg:flex-row
            flex flex-col lg:h-[59vh] lg:my-10
            '>
                <div className='
                w-full
                lg:w-1/2 h-full '>
                    <div className="h-full w-full
                    lg:w-full lg:h-full ">

                        <img src="src/assets/authentication.gif" alt="" className='w-full bg-cover  h-full bg-black' />
                    </div>

                    {/* right */}
                </div>
                <div className=' pl-4 w-full
                lg:w-1/2 h-full'>

                    <div className=' flex flex-col px-10 justify-end h-[40%]  gap-5 w-full'>

                        <h1 className='text-3xl font-bold text-black text-center lg:text-start'>Login</h1>
                        <div className='flex gap-2'>
                            <FaGoogle className='w-12 h-12 rounded-xl text-green-500 border px-3 py-3' />
                            <FaDiscord className='w-12 h-12 rounded-xl bg-[#7289DA] text-white px-3 py-3' />
                            <FaTwitch className='w-12 h-12 rounded-xl bg-[#B07BFF] text-white px-3 py-3' />
                            <FaFacebook className='w-12 h-12 rounded-xl bg-[#1976D2] text-white px-3 py-3' />
                            <FaApple className='w-12 h-12 rounded-xl bg-black text-white px-3 py-3' />
                        </div>

                    </div>
                    <div className='w-[70%] h-px bg-cardbg my-5'></div>

                    <div className='w-full h-[54.7%]  '>
                        {/* bottom */}
                        <div className='flex flex-col w-full
                         lg:w-[75%] py-5 gap-5  px-3 mx-5'>
                            <input type="text" placeholder='Email address' className='placeholder:text-primary outline-2 text-black px-4 py-3 rounded-xl    bg-cardbg' />
                            <input type="password" placeholder='Password' className='placeholder:text-primary outline-2 text-black px-4 py-3 rounded-xl    bg-cardbg' />

                            <button className='w-full rounded-lg bg-amber-200 h-10'>Log In</button>
                            <p className='text-black font-semibold'>Don't have an account?
                                <Link to="/signup">
                                    <span className='text-yellow-400 font-bold '> Create One </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login