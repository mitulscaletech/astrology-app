import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/header/notification";
import UserMenu from "@/components/header/userMenu";

const AstrologerHeader = () => {
  return (
    <header className="w-full bg-primary-100 text-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo */}
      <Link href="/astrologer/dashboard" className="w-28">
        <Image src={logo} alt="logo" width={190} height={58} />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <Notification />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default AstrologerHeader;
