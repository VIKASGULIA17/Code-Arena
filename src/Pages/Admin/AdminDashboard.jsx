import React from 'react';
import { Users, FileCode2, Trophy, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';



const AdminDashboard = () => {
    const stats = [
        { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, trend: 'up' },
        { title: 'Active Problems', value: '456', change: '+5%', icon: FileCode2, trend: 'up' },
        { title: 'Total Contests', value: '89', change: '+2%', icon: Trophy, trend: 'up' },
        { title: 'Submissions', value: '12.5k', change: '-4%', icon: Activity, trend: 'down' },
    ];

    const recentActivity = [
        { user: 'Sarah Wilson', action: 'Solved "Two Sum"', time: '2 mins ago' },
        { user: 'Mike Chen', action: 'Registered for "Weekly Contest 45"', time: '15 mins ago' },
        { user: 'Alex Turner', action: 'Created new problem "Grid Paths"', time: '1 hour ago' },
        { user: 'Emily Davis', action: 'Updated profile', time: '2 hours ago' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                                        <p className="text-xs text-gray-500">{activity.action}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Server Response Time</span>
                            <span className="text-sm font-medium text-green-600">45ms</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-600">Database Load</span>
                            <span className="text-sm font-medium text-blue-600">32%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-600">Memory Usage</span>
                            <span className="text-sm font-medium text-orange-600">68%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
        </div>
        <div className="mt-4 flex items-center">
            {trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {change}
            </span>
            <span className="text-sm text-gray-400 ml-2">vs last month</span>
        </div>
    </div>
);

export default AdminDashboard;
