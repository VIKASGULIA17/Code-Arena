import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Bell, ChevronRight, Home, Menu, X, Sun, Moon } from 'lucide-react';

const AdminLayout = () => {
    const { isAdmin, isJwtExist, userDetails, username, userProfile } = useAppContext();
    const { resolvedTheme, cycleTheme, theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Build breadcrumb from URL
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.map((segment, index) => ({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: '/' + pathSegments.slice(0, index + 1).join('/'),
        isLast: index === pathSegments.length - 1,
    }));

    const handleThemeToggle = () => {
        document.documentElement.classList.add('theme-transitioning');
        cycleTheme();
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 350);
    };

    const ThemeIcon = resolvedTheme === 'dark' ? Moon : Sun;

    return (
        <div className="flex bg-[#f8fafc] dark:bg-[#0b1120] min-h-screen">
            {/* Desktop Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
            />

            {/* Mobile overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
                {/* Fixed Top Bar */}
                <header className="sticky top-0 z-30 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between px-4 lg:px-6 shrink-0">
                    {/* Left: Mobile menu + Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            onClick={() => setMobileSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <nav className="hidden sm:flex items-center text-sm">
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center">
                                    {i > 0 && <ChevronRight size={14} className="mx-1.5 text-slate-300 dark:text-slate-600" />}
                                    <span
                                        className={`${crumb.isLast
                                            ? 'font-semibold text-slate-800 dark:text-slate-100'
                                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors duration-200'
                                        }`}
                                        onClick={() => !crumb.isLast && navigate(crumb.path)}
                                    >
                                        {crumb.label}
                                    </span>
                                </span>
                            ))}
                        </nav>
                    </div>

                    {/* Right: Search + Theme + Notifications + Profile */}
                    <div className="flex items-center gap-2.5">
                        {/* Search */}
                        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-500 dark:hover:text-slate-300 transition-all duration-200">
                            <Search size={13} />
                            <span>Search...</span>
                            <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-400 dark:text-slate-500 shadow-[0_1px_0_rgba(0,0,0,0.05)]">⌘K</kbd>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            onClick={handleThemeToggle}
                            className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                            title={`Theme: ${theme}`}
                        >
                            <ThemeIcon size={18} key={resolvedTheme} className="animate-theme-icon" />
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                            <img
                                src={userProfile?.avatarLink || 'https://i.pravatar.cc/100?img=5'}
                                alt="Avatar"
                                className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                            />
                            <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200 capitalize">
                                {userDetails?.fullName || username || 'Admin'}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
