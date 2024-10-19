"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
}

const MainNav = ({ data }: MainNavProps) => {
  const pathname = usePathname();

  const routes = data.map((item: any) => ({
    href: `/category/${item.id}`,
    label: item.name,
    active: pathname === `/category/${item.id}`,
  }));
  return (
    <nav className="flex items-center mx-6 space-x-4 lg:space-x-6">
      {routes.map((route: any) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
