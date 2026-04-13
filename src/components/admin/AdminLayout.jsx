import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAppContext } from '../../context/AppContext';
import { Search, Bell, ChevronRight, Home, Menu, X } from 'lucide-react';

const AdminLayout = () => {
    const { isAdmin, isJwtExist, userDetails, username, userProfile } = useAppContext();
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

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
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
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Main content area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}`}>
                {/* Fixed Top Bar */}
                <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 lg:px-6 shrink-0">
                    {/* Left: Mobile menu + Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-200"
                            onClick={() => setMobileSidebarOpen(true)}
                        >
                            <Menu size={20} />
                        </button>
                        <nav className="hidden sm:flex items-center text-sm">
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center">
                                    {i > 0 && <ChevronRight size={14} className="mx-1.5 text-slate-300" />}
                                    <span
                                        className={`${crumb.isLast
                                            ? 'font-semibold text-slate-800'
                                            : 'text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200'
                                        }`}
                                        onClick={() => !crumb.isLast && navigate(crumb.path)}
                                    >
                                        {crumb.label}
                                    </span>
                                </span>
                            ))}
                        </nav>
                    </div>

                    {/* Right: Search + Notifications + Profile */}
                    <div className="flex items-center gap-2.5">
                        {/* Search */}
                        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:text-slate-500 transition-all duration-200">
                            <Search size={13} />
                            <span>Search...</span>
                            <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400 shadow-[0_1px_0_rgba(0,0,0,0.05)]">⌘K</kbd>
                        </button>

                        {/* Notifications */}
                        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
                        </button>

                        {/* Profile */}
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                            <img
                                src={userProfile?.avatarLink || 'https://i.pravatar.cc/100?img=5'}
                                alt="Avatar"
                                className="w-7 h-7 rounded-full border border-slate-200 object-cover"
                            />
                            <span className="hidden md:block text-sm font-medium text-slate-700 capitalize">
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
