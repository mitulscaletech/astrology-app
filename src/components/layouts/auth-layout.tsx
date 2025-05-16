import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col py-5 md:py-6 xl:py-8 2xl:py-10 gap-4 md:gap-6 xl:gap-7 2xl:gap-8 3xl:gap-12 4xl:gap-14">
      <Link href="/" className="block w-32 lg:w-44 xl:w-48 mx-auto">
        <Image src={logo} alt="logo" />
      </Link>
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
