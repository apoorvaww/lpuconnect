"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Import LucideIcon type for strong icon typing
import {
  type LucideIcon,
  Home,
  Calendar,
  MessageSquare,
  BookOpen,
  User,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";

type NavItemData = {
  name: string;
  href: string;
  icon: LucideIcon;
};

interface NavItemProps {
  item: NavItemData;
  isCollapsed: boolean;
  isActive?: boolean;
  isLogout?: boolean;
}

const navItems: NavItemData[] = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Resources", href: "/dashboard/resources", icon: BookOpen },
  { name: "Profile", href: "/username/profile", icon: User },
];

const settingsItem: NavItemData = {
  name: "Settings",
  href: "/settings",
  icon: Settings,
};
const logoutItem: NavItemData = {
  name: "Logout",
  href: "/logout",
  icon: LogOut,
};

// 3. Type the main component and its state
export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = (): void => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-white p-4 transition-all duration-300 ease-in-out dark:border-neutral-800 dark:bg-neutral-900",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between">
        <h1
          className={cn(
            "overflow-hidden text-2xl font-bold text-purple-600 transition-all",
            isCollapsed ? "w-0" : "w-full"
          )}
        >
          LPUConnect
        </h1>
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-neutral-800"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft
            className={cn(
              "h-6 w-6 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <nav className="mt-8 flex flex-grow flex-col gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <NavItem
          item={settingsItem}
          isActive={pathname === settingsItem.href}
          isCollapsed={isCollapsed}
        />
        <NavItem item={logoutItem} isCollapsed={isCollapsed} isLogout />
      </div>
    </aside>
  );
}

// 4. Type the NavItem component's props and return value
function NavItem({
  item,
  isCollapsed,
  isActive = false,
  isLogout = false,
}: NavItemProps): JSX.Element {
  const { name, href, icon: Icon } = item;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-600 transition-all dark:text-neutral-300",
        !isLogout &&
          "hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        isActive &&
          !isLogout &&
          "bg-purple-100 font-semibold text-purple-700 dark:bg-neutral-800 dark:text-neutral-50",
        isLogout &&
          "hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/50 dark:hover:text-red-400",
        isCollapsed && "justify-center"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span
        className={cn(
          "overflow-hidden transition-all",
          isCollapsed ? "w-0" : "w-auto"
        )}
      >
        {name}
      </span>
    </Link>
  );
}
