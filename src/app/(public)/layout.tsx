import React, { ReactNode } from "react";
import PublicLayout from "@/components/layouts/public-layout";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
