import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import IconCart from "@/shared/icons/cart";
import { Button } from "@/components/ui/button";

export function Header() {
  // const { setTheme, theme } = useTheme();

  return (
    <header className="py-4 px-8">
      <div className="container">
        <div className="flex px-4 md:px-20 lg:px-20 xl:px-20 py-8 border border-secondary-100 items-center justify-between shadow-card rounded-3xl">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-44">
              <Image src={logo} alt="logo" width={190} height={58} />
            </Link>
            <nav className="space-x-8 text-secondary-500 font-medium text-sm">
              <Link href="#">Home</Link>
              <Link href="#">Astrology</Link>
              <Link href="#">Blog</Link>
              <Link href="#">About</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-secondary-500">
            <Button asChild size="sm">
              <Link href="/user/login">User Login</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/user/login">Astrologer Login</Link>
            </Button>
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
