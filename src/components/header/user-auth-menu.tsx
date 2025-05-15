"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import AuthModal from "@/components/dialogs/auth-modal";
import IconUser, { SignUpArrowIcon } from "@/shared/icons/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserAuthMenu = () => {
  const router = useRouter();

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
