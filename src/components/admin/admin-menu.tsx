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
import { Avatar } from "@/components/ui/avatar";

const AdminMenu = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar src="/placeholder.svg" alt="Name" fallback="AB" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href="/astrologer/profile"
            className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
          >
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: "/admin/login"
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

export default AdminMenu;
