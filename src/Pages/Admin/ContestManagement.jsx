import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, Clock, Users, MoreHorizontal, Trophy, X, Edit2, Trash2 } from 'lucide-react';

const ContestManagement = () => {
    const [contests, setContests] = useState([
        { id: 1, title: 'Weekly Contest 45', description: 'Weekly coding challenge', startTime: '2023-11-20T14:00', duration: '2h', participants: 120, status: 'Upcoming' },
        { id: 2, title: 'Bi-Weekly Contest 12', description: 'Bi-weekly coding challenge', startTime: '2023-11-18T10:00', duration: '1h 30m', participants: 85, status: 'Completed' },
        { id: 3, title: 'CodeArena Cup 2023', description: 'Annual coding cup', startTime: '2023-12-01T09:00', duration: '3h', participants: 450, status: 'Registration Open' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); 
    const [currentContest, setCurrentContest] = useState({
        id: null,
        title: '',
        description: '',
        startTime: '',
        duration: ''
    });

    const [activeMenuId, setActiveMenuId] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCreateClick = () => {
        setModalMode('create');
        setCurrentContest({ id: null, title: '', description: '', startTime: '', duration: '' });
        setIsModalOpen(true);
    };

    const handleEditClick = (contest) => {
        setModalMode('edit');
        setCurrentContest({ ...contest });
        setIsModalOpen(true);
        setActiveMenuId(null);
    };

    const handleDeleteClick = (id) => {
        setContests(contests.filter(c => c.id !== id));
        setActiveMenuId(null);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (modalMode === 'create') {
            const newContest = {
                ...currentContest,
                id: contests.length + 1,
                participants: 0,
                status: 'Upcoming'
            };
            setContests([...contests, newContest]);
        } else {
            setContests(contests.map(c => c.id === currentContest.id ? { ...c, ...currentContest } : c));
        }
        setIsModalOpen(false);
    };

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Contest Management</h1>
                    <p className="text-gray-500 mt-2">Schedule and manage coding contests.</p>
                </div>
                <button
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span>Create Contest</span>
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {contests.map((contest) => (
                    <div key={contest.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-visible relative group">
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
                                    <span>{new Date(contest.startTime).toLocaleString()}</span>
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

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center relative">
                            <button
                                onClick={() => handleEditClick(contest)}
                                className="text-sm font-medium text-purple-600 hover:text-purple-700"
                            >
                                Edit Details
                            </button>
                            <div className="relative">
                                <button
                                    onClick={(e) => toggleMenu(contest.id, e)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <MoreHorizontal size={20} />
                                </button>

                                {activeMenuId === contest.id && (
                                    <div ref={menuRef} className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                                        <button
                                            onClick={() => handleEditClick(contest)}
                                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                            Modify
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(contest.id)}
                                            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-gray-50"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">
                                {modalMode === 'create' ? 'Create New Contest' : 'Modify Contest'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contest Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentContest.title}
                                    onChange={(e) => setCurrentContest({ ...currentContest, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter contest name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    value={currentContest.description}
                                    onChange={(e) => setCurrentContest({ ...currentContest, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Enter contest description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input
                                        type="datetime-local"
                                        required
                                        value={currentContest.startTime}
                                        onChange={(e) => setCurrentContest({ ...currentContest, startTime: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        required
                                        value={currentContest.duration}
                                        onChange={(e) => setCurrentContest({ ...currentContest, duration: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. 2h 30m"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-lg shadow-purple-600/20 transition-all"
                                >
                                    {modalMode === 'create' ? 'Create Contest' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContestManagement;
