"use client";

import { Star } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Avatar } from "@/components/ui/avatar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <Sidebar />
      {/* Main content */}
      <main className="flex-1">
        <div className="flex h-16 items-center justify-between border-b bg-background px-6">
          <div className="md:hidden">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Avatar src="/placeholder.svg" alt="Name" fallback="AB" size="lg" />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
