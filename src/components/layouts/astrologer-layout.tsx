import AstrologerHeader from "@/components/astrologer/astrologerHeader";

export default function AstrologerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <AstrologerHeader />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
