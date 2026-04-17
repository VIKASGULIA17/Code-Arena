import React from 'react';
import { BarChart2, TrendingUp, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Analysis = () => {

    const { totalActiveUsers } = useAppContext();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">Analysis</h1>
                <p className="text-gray-500 dark:text-slate-400 mt-2">Platform analytics and growth metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col items-center justify-center text-center h-64">
                    <div className="bg-blue-50 dark:bg-blue-500/15 p-4 rounded-full mb-4">
                        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Growth Rate</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">15%</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Monthly increase</p>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col items-center justify-center text-center h-64">
                    <div className="bg-purple-50 dark:bg-purple-500/15 p-4 rounded-full mb-4">
                        <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Active Users</h3>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{totalActiveUsers}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Daily active users</p>
                </div>

                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm flex flex-col items-center justify-center text-center h-64">
                    <div className="bg-green-50 dark:bg-emerald-500/15 p-4 rounded-full mb-4">
                        <BarChart2 className="w-8 h-8 text-green-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">Submission Rate</h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-emerald-400 mt-2">2.4k</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Problem submissions / week</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm">
                <div className="h-64 flex items-center justify-center text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                    <p>Detailed Chart Component Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
