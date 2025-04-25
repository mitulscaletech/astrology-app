"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AdminMenu from "../admin/admin-menu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-accent-white">
        <AdminSidebar />
        {/* Main content */}
        <main className="grow">
          <div className="flex h-16 items-center justify-between border-b border-secondary-100 px-6 sticky top-0 z-10 bg-accent-white/50 backdrop-blur-sm">
            <SidebarTrigger className="md:hidden" />
            <div className="ml-auto flex items-center gap-4">
              <AdminMenu />
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
