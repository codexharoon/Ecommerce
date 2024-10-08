"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ className }: { className?: string }) {
  const params = useParams();
  const pathName = usePathname();

  const routes = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      active: pathName === `/${params.storeId}`,
    },
    {
      label: "Billboards",
      href: `/${params.storeId}/billboards`,
      active:
        pathName === `/${params.storeId}/billboards` ||
        pathName === `/${params.storeId}/billboards/new`,
    },
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-8", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
