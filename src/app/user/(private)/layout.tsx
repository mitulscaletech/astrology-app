import UserLayout from '@/components/layouts/user-layout';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  );
};

export default Layout;
