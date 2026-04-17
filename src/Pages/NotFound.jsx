import React from 'react';
import { EnhancedNavbar } from '../components/Navbar';
import NotFoundRobot from '../assets/NotFoundRobot.png';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0b1120] flex flex-col">
            <EnhancedNavbar />
            <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center max-w-lg mx-auto py-20">
                    <h1 className="text-8xl font-bold text-indigo-100 dark:text-indigo-500/20 mb-4 select-none">404</h1>
                    <div className="flex justify-center mb-8">
                        <img src={NotFoundRobot} alt="Robot" className="h-64 object-contain drop-shadow-lg" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">Page Not Found</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        Looks like the logic went into an infinite loop or the pointer is null.
                        <br />
                        <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg text-slate-600 dark:text-slate-400 font-code inline-block mt-2">Error 404: Logic Not Found in this scope.</code>
                    </p>
                    <div className="flex justify-center gap-3">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="rounded-xl h-11 px-5 text-sm font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 dark:text-slate-300"
                        >
                            <ArrowLeft size={16} className="mr-1.5" />
                            Go Back
                        </Button>
                        <Button
                            onClick={() => navigate('/')}
                            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-5 text-sm font-medium shadow-sm shadow-indigo-200/50 dark:shadow-indigo-900/30 transition-all duration-200"
                        >
                            <Home size={16} className="mr-1.5" />
                            Return Home
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;