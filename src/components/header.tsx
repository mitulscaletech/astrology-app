"use client";

import Link from "next/link";
// import { useTheme } from "next-themes";
import Image from "next/image";
import logoIcon from "@/assets/images/logo-icon.png";
import { Button } from "@/components/ui/button";

export function Header() {
  // const { setTheme, theme } = useTheme();

  return (
    <header className='border-b'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image src={logoIcon} alt='logoIcon' width={32} height={32} />
          <span className='text-xl font-bold'>WeWake</span>
        </Link>
        <div className='flex items-center space-x-4'>
          {/* <button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonStar className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button> */}
          <Link href='/astrologer/signup'>
            <Button
              variant="outline"
            >
              Astrologer Login
            </Button>
          </Link>
          <Link href='/user'>
            <Button>User Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
