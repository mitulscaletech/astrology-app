"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Dashboard", href: "/user/dashboard" },
  { name: "Profile", href: "/user/profile" },
  // { name: "Change Password", href: "/user/change-password" },
  { name: "Sessions", href: "/user/sessions" },
  { name: "Service", href: "/user/service-list" },
  { name: "Astrologers", href: "/user/astrologers" }
];

const QuickNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 w-56 shrink-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href; // Use exact match only
        const linkClasses = `inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? "text-accent-white bg-primary" : "text-secondary bg-secondary-100"}`;

        return (
          <Link key={tab.name} href={tab.href} className={linkClasses}>
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default QuickNavigation;
