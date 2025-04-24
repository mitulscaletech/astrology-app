import QuickNavigation from "@/components/user/quick-navigation";
import Script from "next/script";
import UserHeader from "@/components/header/user-header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <UserHeader />
      <main className="flex-1 p-6">
        <div className="container">
          <div className="flex gap-6">
            <QuickNavigation />
            <div className="w-[calc(100%-260px)] grow">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
