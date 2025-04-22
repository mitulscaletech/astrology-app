import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import Notification from "@/components/header/notification";
import UserMenu from "@/components/header/user-menu";
import { IconLogOut } from "@/shared/icons/page";
import IconUser from "@/shared/icons/user";
import IconCart from "@/shared/icons/cart";
import IconSearch from "@/shared/icons/search";

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
          <div className="flex items-center gap-4 text-secondary-500">
            <Link href="#" className="size-6">
              <IconSearch />
            </Link>
            <Link href="#" className="size-6">
              <IconLogOut />
            </Link>
            <Link href="/astrologer/signup" className="size-6">
              <IconUser />
            </Link>
            <Notification />
            <div className="h-6 border-l border-primary-100" />
            {/* User Menu */}
            <UserMenu />
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
