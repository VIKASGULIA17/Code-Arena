import React, { useEffect, useState } from "react";
import {
  Search,
  MoreVertical,
  Shield,
  User2,
  Ban,
  UserCheck,
  Eye,
  Mail,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { jwtToken, getAllUsers } = useAppContext();
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  const banUnbanToSpring = async () => {
    const res = await axios.delete(
      `${BACKEND_URL}/admin/banUnbanUser/${user.userId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
    return res.data;
  };

  const banUnbanUser = async () => {
    setisLoading(true);
    try {
      const result = await banUnbanToSpring();
      if (result.status == 1) {
        toast.success(`User ${!user.ban ? "banned" : "unbanned"}`);
        setTimeout(() => {
          setisLoading(false);
          onClose();
          getAllUsers();
        }, [2000]);
      } else {
        setisLoading(false);
        throw new Error();
      }
    } catch (e) {
      toast.error(`User not ${!user.ban ? "banned" : "unbanned"}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-slate-300/30"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">User Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-5 mb-6">
              <a onClick={() => navigate(`/profile/${user?.username}`)} className="cursor-pointer">
                <img
                  src={user?.avatarLink || ""}
                  alt={user.name}
                  className="w-20 h-20 rounded-xl object-cover ring-4 ring-slate-100"
                />
              </a>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {user.username}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 mt-1 text-sm">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <span
                    className={user.status === "Active" ? "badge-success" : "badge-danger"}
                  >
                    {user.status}
                  </span>
                  <span className={user.admin ? "badge-purple" : "badge-info"}>
                    {user.admin ? (
                      <span className="flex gap-1 items-center">
                        <Shield size={12} /> Admin
                      </span>
                    ) : (
                      <span className="flex gap-1 items-center">
                        <User2 size={12} /> User
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 font-medium mb-1.5">Joined Date</p>
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <Calendar size={16} className="text-slate-400" />
                  {user.joined}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 font-medium mb-1.5">Problems Solved</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-indigo-600">
                    {user.problemsSolved}
                  </span>
                  <span className="text-xs text-slate-400">problems</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
            <button
              className="px-4 py-2 text-sm bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center gap-2 shadow-sm shadow-red-200/50"
              onClick={banUnbanUser}
            >
              <Ban size={15} />
              {isLoading ? "Processing..." : !user.ban ? "Ban User" : "Unban User"}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

const UserManagement = () => {
  const { getAllUsers, users } = useAppContext();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / usersPerPage) : 0;
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">{filteredUsers?.length || 0} total users</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 w-full sm:w-72 text-sm transition-all duration-200 bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead className="sticky top-0 z-10">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedUsers?.map((user) => (
                <tr
                  key={user.joined + user.username}
                  className={user.ban ? "bg-red-50/40" : ""}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <a onClick={() => navigate(`/profile/${user?.username}`)} className="cursor-pointer">
                        <img
                          className="w-8 h-8 rounded-lg object-cover border border-slate-100"
                          alt="user"
                          src={user?.avatarLink || ""}
                        />
                      </a>
                      <div>
                        <p className="font-medium text-slate-800 text-sm hover:text-indigo-600 transition-colors duration-200">
                          {user.username}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={user.admin ? "badge-purple" : "badge-info"}>
                      {user.admin ? <Shield size={12} /> : <User2 size={12} />}
                      {user.admin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td>
                    {user.ban ? (
                      <span className="badge-danger">
                        <Ban size={12} />
                        Banned
                      </span>
                    ) : (
                      <span className="badge-success">
                        <UserCheck size={12} />
                        Active
                      </span>
                    )}
                  </td>
                  <td className="text-slate-500">{user.joined}</td>
                  <td className="text-right">
                    {/* Kebab menu */}
                    <div className="relative inline-block">
                      <button
                        onClick={() => setActiveMenu(activeMenu === user.username ? null : user.username)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeMenu === user.username && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 z-20 py-1 animate-scale-in">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                            >
                              <Eye size={14} />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/profile/${user?.username}`);
                                setActiveMenu(null);
                              }}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                            >
                              <User2 size={14} />
                              View Profile
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400">
              Showing {(currentPage - 1) * usersPerPage + 1}–{Math.min(currentPage * usersPerPage, filteredUsers?.length || 0)} of {filteredUsers?.length || 0}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors duration-200"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200/50'
                      : 'text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors duration-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
