import React from 'react';
import Navbar from '../components/Navbar';
import NotFoundRobot from '../assets/NotFoundRobot.png';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom'; 
import Footer from '../components/Footer';

const NotFound = () => {
    const navigate = useNavigate(); 

    return (
        <div>
            <Navbar />
            <div className='my-40'>
                <h1 className='text-9xl mt-18 font-medium text-center text-blue-200 '>404</h1>
                <div className='flex justify-center'>
                    <img src={NotFoundRobot} alt="Robot image" className='h-80 ' />
                </div>
                <div className='text-center justify-center flex flex-col gap-5 capitalize'>
                    <h2 className='text-4xl font-medium'>404 - Page Not Found</h2>
                    <p className='text-gray-500 tracking-wide px-3 '>
                        Looks like the logic went into an infinite loop or the <br className='hidden md:block'/> 
                        pointer is null, Error 404 : <span className='w-auto bg-slate-200'>Logic Not Found in this <br className='hidden md:block' /> scope. </span>
                    </p>
                    <div className='flex justify-center gap-4'>
                        <Button 
                            onClick={() => navigate(-1)} 
                            variant="outline"
                            className='font-mono font-bold py-7 px-6 rounded-full'
                        >
                            Go Back
                        </Button>

                        <Button 
                            onClick={() => navigate('/')} 
                            className='bg-brand-gradient w-auto font-mono font-bold py-7 px-6 rounded-full'
                        >
                            Return to main branch
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;