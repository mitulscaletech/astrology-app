"use client";
import React, { FC, useState } from "react";
import logoIcon from "@/assets/images/logo-icon.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface UserMenuProp {
  type: string;
}

const UserMenu: FC<UserMenuProp> = ({ type }) => {
  const [userOpen, setUserOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setUserOpen((prev) => !prev)}
          className="size-8 bg-accent-white flex justify-center items-center gap-2 p-0 rounded-full overflow-hidden border border-secondary"
        >
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
        {userOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-accent-white text-black rounded-xl shadow-lg overflow-hidden z-10">
            <nav>
              <Link
                href="/astrologer/dashboard"
                className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
              >
                Profile
              </Link>
              <Link
                href="/astrologer/booking"
                className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
              >
                Booking
              </Link>
              <button
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: type === "astrologer" ? "/astrologer/login" : "/user/login"
                  })
                }
                className="block w-full text-start px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
