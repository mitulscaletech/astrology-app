"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/dialogs/auth-modal";
import IconUser, { SignUpArrowIcon } from "@/shared/icons/user";
import IconSetting from "@/shared/icons/setting";
import IconLogout from "@/shared/icons/logout";

const UserAuthMenu = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState<"login" | "signup">("login");
  const [openMenu, setOpenMenu] = useState(false);

  const handleAuthDialog = (flag: boolean, page: "login" | "signup") => {
    setOpenDialog(flag);
    setCurrentPage(page);
    if (flag) setOpenMenu(false);
    else setCurrentPage("login");
  };

  const handleChangePage = (page: "login" | "signup") => {
    setCurrentPage(page);
  };
  const handleRedirection = async (path: string) => {
    console.log(" handleRedirection:", path);
    router.push(path);
    // window.location.pathname = path;
    handleAuthDialog(false, "login");
  };

  return (
    <>
      <DropdownMenu open={openMenu} onOpenChange={() => setOpenMenu((prev) => !prev)}>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="user login"
            className="size-6 md:size-8 3xl:size-9 p-0.5 md:p-1 3xl:p-1.5undefined hover:text-primary ring-0 outline-0"
          >
            <IconUser />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-60">
          {session ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <span className="size-6">
                    <IconUser />
                  </span>
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <span className="size-6">
                    <IconSetting />
                  </span>
                  Settings
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
                  className="flex items-center gap-2"
                >
                  <span className="size-6">
                    <IconLogout />
                  </span>
                  Log Out
                </button>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2">
                  <span className="size-6">
                    <IconUser />
                  </span>
                  Log In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  <span className="size-6">
                    <SignUpArrowIcon />
                  </span>
                  Create An Account
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthModal
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        currentPage={currentPage}
        changePage={handleChangePage}
      />
    </>
  );
};

export default UserAuthMenu;
