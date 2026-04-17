import React from 'react';
import { Users, FileCode2, Trophy, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, trend: 'up', color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/15' },
        { title: 'Active Problems', value: '456', change: '+5%', icon: FileCode2, trend: 'up', color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/15' },
        { title: 'Total Contests', value: '89', change: '+2%', icon: Trophy, trend: 'up', color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/15' },
        { title: 'Submissions', value: '12.5k', change: '-4%', icon: Activity, trend: 'down', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15' },
    ];

    const recentActivity = [
        { user: 'Sarah Wilson', action: 'Solved "Two Sum"', time: '2 mins ago', avatar: 'https://i.pravatar.cc/100?img=5' },
        { user: 'Mike Chen', action: 'Registered for "Weekly Contest 45"', time: '15 mins ago', avatar: 'https://i.pravatar.cc/100?img=12' },
        { user: 'Alex Turner', action: 'Created new problem "Grid Paths"', time: '1 hour ago', avatar: 'https://i.pravatar.cc/100?img=8' },
        { user: 'Emily Davis', action: 'Updated profile', time: '2 hours ago', avatar: 'https://i.pravatar.cc/100?img=9' },
    ];

    const now = new Date();
    const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="admin-card bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white border-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                <div className="relative">
                    <div className="flex items-center gap-2 text-indigo-200 text-xs font-medium mb-2">
                        <Clock size={14} />
                        {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h1 className="text-2xl font-bold">{greeting}, Admin 👋</h1>
                    <p className="text-indigo-200 mt-1 text-sm">Here's what's happening with your platform today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Activity + System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Recent Activity</h2>
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-0">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className={`flex items-center justify-between py-3.5 ${index !== recentActivity.length - 1 ? 'border-b border-slate-50 dark:border-slate-700/30' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={activity.avatar}
                                        alt={activity.user}
                                        className="w-9 h-9 rounded-full object-cover border border-slate-100 dark:border-slate-700"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.user}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{activity.action}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-3">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="admin-card">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">System Status</h2>
                        <span className="badge-success text-[11px]">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            All Systems Operational
                        </span>
                    </div>
                    <div className="space-y-5">
                        <StatusBar label="Server Response Time" value="45ms" percentage={95} color="bg-emerald-500" />
                        <StatusBar label="Database Load" value="32%" percentage={32} color="bg-indigo-500" />
                        <StatusBar label="Memory Usage" value="68%" percentage={68} color="bg-amber-500" />
                        <StatusBar label="API Success Rate" value="99.2%" percentage={99} color="bg-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon: Icon, trend, color }) => (
    <div className="admin-card hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-2">{value}</h3>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="mt-4 flex items-center">
            {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {change}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">vs last month</span>
        </div>
    </div>
);

const StatusBar = ({ label, value, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
            <span className={`text-sm font-semibold ${percentage > 90 ? 'text-emerald-600 dark:text-emerald-400' : percentage > 60 ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{value}</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
            <div
                className={`${color} h-full rounded-full transition-all duration-700 ease-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

export default AdminDashboard;
