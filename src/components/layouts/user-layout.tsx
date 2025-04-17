import AstrologerHeader from "@/components/astrologer/astrologerHeader";
import QuickNavigation from "@/components/user/quickNavigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AstrologerHeader />
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
