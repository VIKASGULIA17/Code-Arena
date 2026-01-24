import React from 'react'
import {
    AlarmClock,
    ArrowRight,
    TrendingUp,
    TrophyIcon,
    Zap,
    ZapIcon,
} from "lucide-react";
import Countdown from '../others/CountDown';
import { Button } from '../ui/button';

const ContestRegistration = ({ contestId = null }) => {
    return (
        <div>
            <div className='mx-30 my-20 border-2'>
                {/* card  */}

                <div className="flex flex-col lg:flex-row w-full rounded-2xl shadow-xl bg-white overflow-hidden">
                    {/* Left: Content Section (Occupies remaining ~60%) */}
                    <div className="w-full lg:flex-1 px-8 py-8 lg:px-10 lg:py-10">
                        <button className='flex items-center gap-2 my-6 bg-purple-100 text-purple-500 border px-3 py-1 font-bold rounded-full border-purple-400 text-[12px]'> <div className='w-2 h-2 rounded-full bg-purple-600'></div> Registration open</button>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-7xl text-wrap font-semibold">
                                    Global Coding contest 2024
                                </h1>
                            </div>
                            <TrophyIcon
                                className="p-3 bg-purple-100 text-purple-500 rounded-full font-bold"
                                size={45}
                            />
                        </div>
                        
                        <div className="my-5">
                            <p className="text-lg text-gray-600">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque cupiditate sapiente sit sunt facere quos aperiam, quo tempore soluta, commodi explicabo asperiores quia pariatur quod ipsa numquam eius cum consequatur natus laboriosam culpa molestias fugit architecto! Consectetur repudiandae accusantium magni.
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <div className='capitalize '>
                                <h3 className='text-gray-600'>Start time</h3>
                                <h1 className='font-semibold text-lg' >oct 24,14:00</h1>
                                <p className='text-gray-600 text-lg'>UTC</p>
                            </div>
                            <div className='capitalize '>
                                <h3 className='text-gray-600'>Duration</h3>
                                <h1 className='font-semibold text-lg' >1 hour</h1>
                            </div>
                            <div className='capitalize '>
                                <h3 className='text-gray-600'>Format</h3>
                                <h1 className='font-semibold text-lg' >Individual</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mt-7">
                           
                            <Button className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 hover:opacity-90 transition-opacity py-8 text-sm ">
                                <p className="text-white font-semibold pl-6">Register Now</p>
                                <ZapIcon className='text-white mr-6' fill='white'/>
                            </Button>
                        </div>
                    </div>

                    {/* Right: Image Section (Occupies 40%) */}
                    {/* relative enables absolute positioning for the image inside */}
                    <div className="relative w-full lg:w-[40%] min-h-[280px] lg:min-h-full">
                        <img
                            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Contest Cover"
                        />
                        {/* Overlay Gradient for text readability (optional) */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent lg:hidden"></div>

                        <p className="absolute bottom-5 left-5 bg-linear-to-r from-blue-400 via-purple-500 to-pink-600 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                            Featured Event
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContestRegistration