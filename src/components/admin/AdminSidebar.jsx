import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileCode2, Trophy, BarChart2, Users, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminSidebar = () => {
    const location = useLocation();
    const { setisJwtExist, setjwtToken, setIsAdmin } = useAppContext();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Users, label: 'User Management', path: '/admin/users' },
        { icon: FileCode2, label: 'Problems', path: '/admin/problems' },
        { icon: Trophy, label: 'Contests', path: '/admin/contests' },
        { icon: BarChart2, label: 'Analysis', path: '/admin/analysis' },
    ];

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setisJwtExist(false);
        setjwtToken(null);
        setIsAdmin(false);
        window.location.href = '/';
    };

    return (
        <div className="h-screen w-64 bg-white border-r text-white fixed left-0 top-0 flex flex-col border-gray-800">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 via-purple-500 bg-clip-text text-transparent">
                    Admin Panel
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : 'text-black hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
