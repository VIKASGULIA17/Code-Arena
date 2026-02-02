import React, { useEffect, useState } from 'react';
import { Search, MoreVertical, Shield, Ban, Eye, Mail, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">User Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">×</span>
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                            alt={user.name}
                            className="w-24 h-24 rounded-full ring-4 ring-gray-50"
                        />
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                            <div className="flex items-center gap-2 text-gray-500 mt-1">
                                <Mail size={16} />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {user.status}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Joined Date</p>
                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                <Calendar size={18} className="text-gray-400" />
                                {user.joinedDate}
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Problems Solved</p>
                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                <span className="text-lg font-bold text-blue-600">{user.problemsSolved}</span>
                                <span className="text-sm text-gray-400">problems</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition-colors">
                        Close
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                        <Ban size={16} />
                        Ban User
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const UserManagement = () => {
    const {jwtToken} = useAppContext();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [users,setUsers] = useState(null);

    // const users = [
    //     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joinedDate: '2023-01-15', problemsSolved: 45 },
    //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-02-20', problemsSolved: 120 },
    //     { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Banned', joinedDate: '2023-03-10', problemsSolved: 12 },
    //     { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinedDate: '2023-04-05', problemsSolved: 89 },
    //     { id: 5, name: 'Charlie Day', email: 'charlie@example.com', role: 'User', status: 'Active', joinedDate: '2023-05-12', problemsSolved: 67 },
    // ];


    useEffect(()=>{

        async function getAllUsers(){
            const result = await axios.get(`${BACKEND_URL}/admin/fetchUsers`,{
                headers:{
                    Authorization : `Bearer ${jwtToken}`
                }
            });
            console.log(result.data);
            setUsers(result.data);
        }

        getAllUsers();

    },[]);


    const filteredUsers = users?.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-2">Manage user access and details.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers?.map((user) => (
                            <tr key={user.joined} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                                            {user.username[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.username}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                        ${user.admin == true ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}
                                    `}>
                                        {user.admin == true && <Shield size={12} />}
                                        {user.admin == true?"Admin":"User"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium`}>
                                        <div className={`w-1.5 h-1.5 rounded-full `}></div>
                                        {"user.status"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {user.joined}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Ban User"
                                        >
                                            <Ban size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {selectedUser && (
                    <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserManagement;