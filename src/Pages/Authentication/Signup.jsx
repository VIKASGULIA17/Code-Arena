import { Link } from 'react-router-dom';
import { FaGoogle, FaDiscord, FaTwitch, FaFacebook, FaApple } from "react-icons/fa";
import Navbar from '../../components/Navbar';

const Signup = () => {

    return (
        <div>
            <Navbar />
            <div className={`w-full h-screen absolute top-10 left-0 duration-1000   bg-white/50 z-20`}>
                <div className='absolute 
                flex flex-col w-full
                lg:top-20 lg:left-120  lg:flex-row lg:h-[80vh] lg:w-[55vw]'>
                    <div className='w-full h-full '>
                        <div className="
                        h-[33vh]
                        lg:w-full lg:h-full
                        ">

                            <img src="src/assets/authentication.gif" alt="" className='w-full bg-cover bg-black h-full' />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="93" fill="none" viewBox="0 0 43 93" className="hidden lg:block absolute 
                            top-33 left-[265px] h-[95px] rotate-[7deg]"><path fill="#1e1e27" d="M.613 50.507 4.925 4.799a1 1 0 0 1 .871-.899L35.463.192a1 1 0 0 1 1.08 1.288l-7.449 24.097c-.244.79.523 1.53 1.31 1.275 1.748-.57 4.293-1.343 7.352-2.16 2.442-.652 4.822 1.173 4.755 3.7-.623 23.673-10.906 45.725-21.5 62.833-1.233 1.99-4.8.309-4.288-1.977 3.018-13.456 4.77-28.847 4.823-37.95.008-1.375-1.38-2.271-2.657-1.766l-12.823 5.07C3.289 55.7.332 53.479.613 50.507"></path><path fill="#282834" d="M5.949 4.545 1.609 50.6c-.211 2.23 2.007 3.895 4.089 3.072l12.823-5.07c1.897-.75 4.037.576 4.025 2.702-.054 9.186-1.817 24.65-4.847 38.163-.117.522.208 1.128.936 1.467.727.338 1.28.162 1.526-.236C30.717 73.651 40.895 51.78 41.51 28.366c.049-1.839-1.68-3.193-3.497-2.708a145 145 0 0 0-7.301 2.145c-1.537.5-3.064-.937-2.574-2.521L35.895.336a.478.478 0 0 1 .914.283l-7.715 24.958c-.244.79.523 1.53 1.31 1.275 1.748-.57 4.293-1.343 7.352-2.16 2.442-.652 4.822 1.173 4.755 3.7-.623 23.673-10.906 45.725-21.5 62.833-1.233 1.99-4.8.309-4.288-1.977 3.018-13.456 4.77-28.847 4.823-37.95.008-1.375-1.38-2.271-2.657-1.766l-12.823 5.07C3.289 55.7.332 53.479.613 50.507L4.957 4.45a.498.498 0 0 1 .992.094"></path></svg>
                        <div className='bg-footer text-white w-90 text-center px-4 absolute top-0 left-15 rounded-lg -rotate-3 py-5 hidden lg:block'>
                            <h1 className='font-bold text-xl'>Hold that thought</h1>
                            <p className='font-semibold text-gray-600'>You can join a game of life once you sign up or sign into your account!
                            </p>
                            <p className='text-amber-300 text-[12.5px] pt-3'>This will only take a minute, <span className='text-white'>
                                so hold on to that thought.
                            </span></p>
                        </div>
                        <div>

                        </div>
                        {/* right */}
                    </div>
                    <div className='bg-gray-50 pl-4
                   border-2
                    w-full h-full'>
                        
                        <div className=' flex flex-col px-10 text-black  justify-end h-[40%] gap-5 w-full'>

                            <h1 className='
                                lg:text-3xl lg:text-start
                                text-xl
                                font-bold text-black text-center '>Sign Up</h1>
                            <div className='flex gap-2'>
                                <FaGoogle className='w-12 h-12 rounded-xl bg-white border text-green-500 px-3 py-3' />
                                <FaDiscord className='w-12 h-12 rounded-xl bg-[#7289DA] text-white px-3 py-3' />
                                <FaTwitch className='w-12 h-12 rounded-xl bg-[#B07BFF] text-white px-3 py-3' />
                                <FaFacebook className='w-12 h-12 rounded-xl bg-[#1976D2] text-white px-3 py-3' />
                                <FaApple className='w-12 h-12 rounded-xl bg-black text-white px-3 py-3' />
                            </div>

                        </div>
                        <div className='w-[70%] h-px bg-cardbg my-5'></div>

                        <div className='w-full h-[54.7%]  '>
                            {/* bottom */}
                            <div className='flex flex-col 
                            w-[90%]
                            lg:w-[75%] py-5 gap-5  px-3 mx-5'>
                                <input type="text" placeholder='Email address' className='placeholder:text-primary  outline-2 text-black px-4 py-3 rounded-xl    bg-cardbg' />
                                <input type="password" placeholder='Password' className='placeholder:text-primary outline-2 text-black px-4 py-3 rounded-xl    bg-cardbg' />
                                <button className=' w-[80%] bg-cardbg text-black border border-primary px-5 py-5 flex gap-2 mx-10'>
                                    <input type="checkbox" className='w-6 h-6' name="" id="" /> Verify You are a Human
                                </button>
                                <p className='w-full text-center text-sm text-primary'>By signing up, you agree with our <span className='text-black hover:underline'>ToS,</span> <span className='text-black cursor-pointer underline'> Community Guidelines </span> and <span className='text-black cursor-pointer underline'> Privacy Policy</span> </p>
                                <button className='w-full rounded-lg bg-amber-200 h-10'>Sign up</button>
                                <p className='text-black font-semibold'>Already have an account? 
                                    <Link to='/login'>
                                    <span className='text-yellow-400 font-bold '> Log in </span>
                                    </Link>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup