import AstrologerLayout from "@/components/layouts/astrologer-layout";
// import { SocketProvider } from "@/context/SocketProvider";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <SocketProvider>
    <AstrologerLayout>{children}</AstrologerLayout>
    // </SocketProvider>
  );
};

export default Layout;
