"use client";

import { Avatar } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-accent-white">
        <AdminSidebar />
        {/* Main content */}
        <main className="grow">
          <div className="flex h-16 items-center justify-between border-b border-secondary-200 px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <Avatar src="/placeholder.svg" alt="Name" fallback="AB" />
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
