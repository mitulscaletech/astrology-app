import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { IconLogOut } from "@/shared/icons/page";
import IconUser from "@/shared/icons/user";
import IconCart from "@/shared/icons/cart";
import IconSearch from "@/shared/icons/search";

export function Header() {
  // const { setTheme, theme } = useTheme();

  return (
    <header className="py-4 px-8">
      <div className="container">
        <div className="flex px-6 py-4 border border-secondary-100 items-center justify-between shadow-card-sm rounded-full">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-28">
              <Image src={logo} alt="logo" width={190} height={58} />
            </Link>
            <nav className="space-x-8 text-secondary-500 font-medium text-sm">
              <Link href="#">Home</Link>
              <Link href="#">Astrology</Link>
              <Link href="#">Blog</Link>
              <Link href="#">About</Link>
            </nav>
          </div>
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
            <div className="h-6 border-l border-primary-100" />
            <Link href="#" className="size-6">
              <IconCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
