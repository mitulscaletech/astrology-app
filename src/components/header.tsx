import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import IconCart from "@/shared/icons/cart";
import IconSearch from "@/shared/icons/search";
import { Button } from "./ui/button";
// import UserAuthMenu from "@/components/header/user-auth-menu";
import IconMenu from "@/shared/icons/menu";

export function Header() {
  return (
    <header className="py-2 md:py-3 3xl:py-4">
      <div className="container">
        <div className="flex px-3 md:px-4 lg:px-8 xl:px-12 3xl:px-20 py-2 md:py-4 lg:py-5 xl:py-6 2xl:py-7 border border-secondary-100 items-center justify-between shadow-card rounded-lg lg:rounded-2xl 2xl:rounded-3xl">
          <div className="flex items-center gap-2 lg:gap-4 2xl:gap-8">
            <button className="size-6 md:hidden">
              <IconMenu />
            </button>
            <Link href="/" className="w-32 md:w-36 lg:w-40 xl:w-44">
              <Image src={logo} alt="logo" width={190} height={58} />
            </Link>
            <nav className="gap-2 xl:gap-3 text-secondary-500 font-medium text-lg text-semibold hidden xl:flex">
              <Link
                href="/astrology"
                className="px-4 md:px-5 xl:px-6 py-1 md:py-2 lg:py-2.5 xl:py-3 hover:text-primary border-b-2 border-transparent"
              >
                Astrology
              </Link>
              <Link
                href="/pooja"
                className="px-4 md:px-5 xl:px-6 py-1 md:py-2 lg:py-2.5 xl:py-3 hover:text-primary border-b-2 border-transparent"
              >
                Pooja
              </Link>
              <Link
                href="/learn"
                className="px-4 md:px-5 xl:px-6 py-1 md:py-2 lg:py-2.5 xl:py-3 hover:text-primary border-b-2 border-transparent"
              >
                Learn
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 lg:gap-3 text-secondary-500">
            <Button asChild size="sm" variant="secondary" className="hidden md:flex">
              <Link href="/astrologer/login">Astrologer Login</Link>
            </Button>
            <Link
              href="/user/login"
              aria-label="search"
              className="size-6 md:size-8 3xl:size-9 p-0.5 md:p-1 3xl:p-1.5 hover:text-primary"
            >
              <IconSearch />
            </Link>
            {/* <UserAuthMenu /> */}
            <div className="h-7 md:h-8 xl:h-9 border-l border-primary/30" />
            <Link
              href="#"
              aria-label="cart"
              className="size-8 md:size-10 2xl:size-12 p-1.5 md:p-2 2xl:p-3 bg-primary text-accent-white rounded-full"
            >
              <IconCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
