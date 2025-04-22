import BookingStats from "@/components/astrologer/booking/booking-stats";
import BookingTab from "@/components/astrologer/booking/booking-tab";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-4">Astrologer Booking Management</h1>
      <BookingStats />
      <BookingTab />
      {children}
    </div>
  );
};

export default Layout;
