import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileCode2, Trophy, BarChart2, Users, LogOut, ChevronLeft, ChevronRight, Code2, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminSidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
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

    const sidebarContent = (
        <>
            {/* Header */}
            <div className={`shrink-0 border-b border-slate-100 dark:border-slate-700/50 flex items-center ${collapsed ? 'justify-center p-4' : 'justify-between p-5'}`}>
                {collapsed ? (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Code2 size={16} className="text-white" />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center gap-2.5">
                            <Link to="/">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                                <Code2 size={16} className="text-white" />
                            </div>
                            </Link>
                            <div>
                                <h1 className="text-sm font-bold text-slate-800 dark:text-slate-100">Admin Panel</h1>
                                <Link to="/">
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Code Arena</p>
                                </Link>
                            </div>
                        </div>
                        {/* Mobile close button */}
                        <button
                            className="lg:hidden p-1 rounded-md text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            <X size={18} />
                        </button>
                    </>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {!collapsed && (
                    <p className="px-3 py-2 text-[10px] font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">Navigation</p>
                )}
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen?.(false)}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center gap-3 rounded-lg transition-all duration-200 ${
                            collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
                        } ${isActive(item.path)
                            ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-l-[3px] border-indigo-600 dark:border-indigo-400 font-semibold'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 border-l-[3px] border-transparent'
                        }`}
                    >
                        <item.icon size={18} strokeWidth={isActive(item.path) ? 2.5 : 2} />
                        {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className={`shrink-0 border-t border-slate-100 dark:border-slate-700/50 ${collapsed ? 'p-3' : 'p-3 space-y-1'}`}>
                {/* Collapse toggle (desktop only) */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={`hidden lg:flex items-center gap-2 w-full rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all duration-200 ${
                        collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
                    }`}
                    title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {collapsed ? <ChevronRight size={18} /> : (
                        <>
                            <ChevronLeft size={18} />
                            <span className="text-sm font-medium">Collapse</span>
                        </>
                    )}
                </button>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 w-full rounded-lg text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 ${
                        collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
                    }`}
                    title={collapsed ? 'Logout' : undefined}
                >
                    <LogOut size={18} />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <aside
                className={`hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-700/50 z-40 transition-all duration-300 ${
                    collapsed ? 'w-[72px]' : 'w-64'
                }`}
            >
                {sidebarContent}
            </aside>

            {/* Mobile sidebar */}
            <aside
                className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-700/50 z-50 flex flex-col transition-transform duration-300 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    );
};

export default AdminSidebar;
