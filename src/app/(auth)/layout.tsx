import React, { ReactNode } from "react";
import AuthLayout from "@/components/layouts/auth-layout";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
