"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  // SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";
import Image from "next/image";
import logoIcon from "@/assets/images/logo-icon.png";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin/dashboard"
  },
  {
    title: "Astrologer Management",
    icon: Home,
    href: "/admin/astrologer-management"
  },
  {
    title: "Booking Management",
    icon: Home,
    href: "/admin/booking-management"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics"
  },
  {
    title: "User Management",
    icon: Users,
    href: "/admin/users",
    submenu: [
      {
        title: "All Users",
        href: "/admin/users"
      },
      {
        title: "User Roles",
        href: "/admin/users/roles"
      },
      {
        title: "Permissions",
        href: "/admin/users/permissions"
      }
    ]
  },
  {
    title: "Products",
    icon: Package,
    href: "/admin/products",
    submenu: [
      {
        title: "All Products",
        href: "/admin/products"
      },
      {
        title: "Categories",
        href: "/admin/products/categories"
      },
      {
        title: "Inventory",
        href: "/admin/products/inventory"
      }
    ]
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
    submenu: [
      {
        title: "All Orders",
        href: "/admin/orders"
      },
      {
        title: "Pending",
        href: "/admin/orders/pending"
      },
      {
        title: "Completed",
        href: "/admin/orders/completed"
      }
    ]
  },
  {
    title: "Invoices",
    icon: FileText,
    href: "/admin/invoices"
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/admin/payments"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    submenu: [
      {
        title: "General",
        href: "/admin/settings"
      },
      {
        title: "Security",
        href: "/admin/settings/security"
      },
      {
        title: "Notifications",
        href: "/admin/settings/notifications"
      }
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const isSubmenuActive = (submenu: { title: string; href: string }[]) => {
    return submenu.some((item) => pathname === item.href);
  };

  return (
    <>
      <Sidebar className="border-r border-secondary-200">
        <SidebarHeader className="border-b border-secondary-200 h-16">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex h-8 w-8">
              <Image src={logoIcon} alt="icon" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Admin Portal</span>
              <span className="text-xs text-secondary-300">Management System</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleSubmenu(item.title)}
                        isActive={isSubmenuActive(item.submenu)}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            openMenus[item.title] ? "rotate-180" : ""
                          )}
                        />
                      </SidebarMenuButton>
                      {openMenus[item.title] && (
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={isActive(subItem.href)}>
                                <Link href={subItem.href}>{subItem.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
