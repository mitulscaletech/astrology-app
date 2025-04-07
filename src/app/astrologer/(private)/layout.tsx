import AstrologerLayout from '@/components/layouts/astrologer-layout';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <AstrologerLayout>
            {children}
        </AstrologerLayout>
    );
};

export default Layout;
