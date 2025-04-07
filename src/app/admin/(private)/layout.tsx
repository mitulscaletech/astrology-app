import AdminLayout from '@/components/layouts/admin-layout';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
};

export default Layout;
