import React from 'react';
import {
    AlarmClock,
    Calendar,
    Clock,
    Trophy,
    Users,
    Zap,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Crown,
    Medal,
    Gift
} from "lucide-react";
import Countdown from '../others/CountDown';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

const ContestRegistration = ({ contestId = null }) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950/50 p-4 lg:p-8 overflow-y-auto">
            <div className="lg:max-w-[80vw] mx-auto space-y-8">
                {/* Main Registration Card */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 flex flex-col lg:flex-row relative"
                >
                    {/* Left: Content Section */}
                    <div className="w-full lg:w-[55%] p-8 lg:p-12 flex flex-col justify-between relative z-10">

                        {/* Header Badge */}
                        <motion.div variants={itemVariants} className="flex items-start justify-between mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                                </span>
                                <span className="text-xs font-bold tracking-wide text-purple-600 dark:text-purple-300 uppercase">Registration Open</span>
                            </div>
                            <div className="bg-linear-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-3 rounded-2xl">
                                <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </motion.div>

                        {/* Main Title & Description */}
                        <motion.div variants={itemVariants} className="mb-10">
                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
                                Global Coding <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-600 to-pink-600">
                                    Contest 2024
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                                Join the world's most competitive programming event.
                                Solve algorithmic challenges, compete with top developers,
                                and win exclusive prizes.
                                <span className='block mt-2 text-sm text-gray-500 dark:text-gray-500'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cupiditate sapiente sit sunt.
                                </span>
                            </p>
                        </motion.div>

                        {/* Meta Data Grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-5 h-5 group-hover:text-purple-500 transition-colors" />
                                    <span className="text-sm font-medium">Start Time</span>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">Oct 24</p>
                                <p className="text-sm text-gray-500">14:00 UTC</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                                    <Clock className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">1 Hour</p>
                                <p className="text-sm text-gray-500">Fast-paced</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-pink-200 dark:hover:border-pink-900/50 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                                    <Users className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                                    <span className="text-sm font-medium">Format</span>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">Individual</p>
                                <p className="text-sm text-gray-500">Global Rank</p>
                            </div>
                        </motion.div>

                        {/* Action Area */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 border-0 text-white font-bold text-base px-8 py-6 rounded-xl shadow-lg shadow-purple-500/30 transition-all hover:scale-[1.02]"
                            >
                                <Zap className="mr-2 w-5 h-5 fill-current" />
                                Register Now
                            </Button>

                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-gray-500">
                                    Registration closes in <span className="text-gray-900 dark:text-white font-bold">2 days</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Visual Section */}
                    <div className="w-full lg:w-[45%] relative min-h-[400px] lg:min-h-full overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10 lg:bg-linear-to-l" />
                        <img
                            src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=687&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt="Coding Contest"
                        />

                        {/* Floating Info Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl hidden lg:block max-w-xs"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <p className="text-white font-medium text-sm">Live System Status</p>
                            </div>
                            <p className="text-indigo-100 text-xs leading-relaxed">
                                Our judging servers are online and ready.
                                Prepare your environment for an optimal experience.
                            </p>
                        </motion.div>

                        {/* Mobile Only Overlay Text */}
                        <div className="absolute bottom-6 left-6 z-20 lg:hidden">
                            <p className="bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                                Featured Event
                            </p>
                            <h3 className="text-white font-bold text-xl">Compete & Win</h3>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Sections: Rules and Prizes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Contest Rules Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-red-100 dark:bg-red-900/30 p-2.5 rounded-xl">
                                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contest Rules</h2>
                        </div>

                        <ul className="space-y-4">
                            {[
                                "No plagiarism allowed. System will check for code similarity.",
                                "Participants must register before the start time.",
                                "Individual participation only. No team forming.",
                                "Submissions after deadline will not be counted.",
                                "Judges' decisions are final."
                            ].map((rule, index) => (
                                <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                    <div className="mt-1 min-w-[18px]">
                                        <CheckCircle2 className="w-4.5 h-4.5 text-green-500" />
                                    </div>
                                    <span className="text-sm leading-relaxed">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contest Prizes Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2.5 rounded-xl">
                                <Crown className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contest Prizes</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 mt-4 sm:mt-8 order-2 sm:order-1 relative">
                                <div className="absolute -top-4 bg-gray-300 text-gray-800 text-xs font-bold py-1 px-3 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm">
                                    2nd Place
                                </div>
                                <Medal className="w-10 h-10 text-gray-400 mb-3" />
                                <h3 className="font-bold text-gray-900 dark:text-white">$500</h3>
                                <p className="text-xs text-gray-500 text-center mt-1">Silver Badge + T-shirt</p>
                            </div>

                            {/* 1st Place */}
                            <div className="flex flex-col items-center bg-linear-to-b from-yellow-50 to-white dark:from-yellow-900/10 dark:to-zinc-800/50 p-4 rounded-2xl border border-yellow-100 dark:border-yellow-900/30 order-1 sm:order-2 relative shadow-md transform scale-105 z-10">
                                <div className="absolute -top-4 bg-yellow-400 text-yellow-900 text-xs font-bold py-1 px-3 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm">
                                    1st Place
                                </div>
                                <Trophy className="w-12 h-12 text-yellow-500 mb-3 drop-shadow-sm" />
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">$1000</h3>
                                <p className="text-xs text-gray-500 text-center mt-1">Gold Badge + Job Offer</p>
                            </div>

                            {/* 3rd Place */}
                            <div className="flex flex-col items-center bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 mt-4 sm:mt-8 order-3 relative">
                                <div className="absolute -top-4 bg-orange-200 text-orange-800 text-xs font-bold py-1 px-3 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm">
                                    3rd Place
                                </div>
                                <Medal className="w-10 h-10 text-orange-400 mb-3" />
                                <h3 className="font-bold text-gray-900 dark:text-white">$250</h3>
                                <p className="text-xs text-gray-500 text-center mt-1">Bronze Badge + Swag</p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                            <Gift className="w-5 h-5 text-blue-500 mr-2" />
                            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                Participation certificates for all!
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

export default ContestRegistration;