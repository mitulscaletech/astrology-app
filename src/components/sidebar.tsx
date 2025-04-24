"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import IconSetting from "@/shared/icons/setting";
import IconCheck from "@/shared/icons/check";
import IconInfo from "@/shared/icons/info";

export function Sidebar() {
  const menuItems = [
    { icon: IconInfo, label: "Dashboard", href: "/admin" },
    { icon: IconSetting, label: "Astrologers", href: "/admin/astrologer-management" },
    { icon: IconSetting, label: "Users", href: "/admin/users" },
    { icon: IconCheck, label: "Appointments", href: "/admin/appointments" },
    { icon: IconSetting, label: "Settings", href: "/admin/settings" }
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-secondary-100/10">
      <div className="flex h-16 items-center border-b px-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button variant="ghost" className="w-full justify-start">
              <span className="mr-2 h-5 w-5">
                <item.icon />
              </span>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start text-danger">
          Logout
        </Button>
      </div>
    </div>
  );
}
