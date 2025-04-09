import BookingStats from "@/components/astrologer/booking/bookingStats";
import BookingTab from "@/components/astrologer/booking/bookingTab";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <>
    <h1 className="text-xl font-bold mb-4">Astrologer Booking Management</h1>
    <BookingStats />
    <BookingTab />
    {children}
  </>;
};

export default Layout;
