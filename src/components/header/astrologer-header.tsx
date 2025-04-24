import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/header/notification";
import IconCart from "@/shared/icons/cart";
import UserMenu from "./user-menu";

const AstrologerHeader = () => {
  return (
    <header className="py-4 px-8">
      <div className="container">
        <div className="flex px-6 py-4 border border-secondary-100 items-center justify-between shadow-card-sm rounded-full">
          {/* Logo */}
          <Link href="/astrologer/dashboard" className="w-28">
            <Image src={logo} alt="logo" width={190} height={58} />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3 text-secondary-500">
            <Notification />
            {/* User Menu */}
            <UserMenu type="astrologer" />
            <div className="h-6 border-l border-primary-100" />
            <Link href="#" className="size-6">
              <IconCart />
            </Link>
            {/* Notifications */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AstrologerHeader;
