import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, MoreHorizontal, Trophy } from 'lucide-react';

const ContestManagement = () => {
    // Mock Contests
    const contests = [
        { id: 1, title: 'Weekly Contest 45', startTime: '2023-11-20 14:00', duration: '2h', participants: 120, status: 'Upcoming' },
        { id: 2, title: 'Bi-Weekly Contest 12', startTime: '2023-11-18 10:00', duration: '1h 30m', participants: 85, status: 'Completed' },
        { id: 3, title: 'CodeArena Cup 2023', startTime: '2023-12-01 09:00', duration: '3h', participants: 450, status: 'Registration Open' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contest Management</h1>
                    <p className="text-gray-500 mt-2">Schedule and manage coding contests.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus size={20} />
                    <span>Create Contest</span>
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {contests.map((contest) => (
                    <div key={contest.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                                    <Trophy className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${contest.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                        contest.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                                            'bg-green-100 text-green-700'
                                    }`}>
                                    {contest.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2">{contest.title}</h3>

                            <div className="space-y-2 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span>{contest.startTime}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{contest.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" />
                                    <span>{contest.participants} Participants</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <button className="text-sm font-medium text-purple-600 hover:text-purple-700">Edit Details</button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContestManagement;
