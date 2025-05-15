"use client";
import React, { FC } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import logoIcon from "@/assets/images/logo-icon.png";

const UserMenu = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-8 bg-accent-white flex justify-center items-center gap-2 p-0 rounded-full overflow-hidden border border-secondary">
          {session?.user?.image ? (
            <Image src={logoIcon} alt="logo" width={24} height={24} className="w-full" />
          ) : (
            <div className="text-secondary font-medium">
              {session?.user?.full_name
                ?.split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("")}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href="/astrologer/my-profile"
            className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/astrologer/booking"
            className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
          >
            Booking
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/login"
              })
            }
            className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
