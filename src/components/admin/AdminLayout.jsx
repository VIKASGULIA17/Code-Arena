import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAppContext } from '../../context/AppContext';

const AdminLayout = () => {
    const { isAdmin, isJwtExist } = useAppContext();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isJwtExist) { if not logged in redirect to login
    //         navigate('/login');
    //     }
    // }, [isJwtExist, isAdmin, navigate]);

    // if (!isJwtExist) return null;

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
