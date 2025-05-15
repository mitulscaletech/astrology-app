import Image from "next/image";
import logo from "@/assets/images/logo.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="w-24 lg:w-56 xl:w-64">
        <Image src={logo} alt="logo" />
      </div>
      <main className="grow">{children}</main>
    </div>
  );
}
