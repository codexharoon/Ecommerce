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
      active: pathName.startsWith(`/${params.storeId}/billboards`),
    },
    {
      label: "Categories",
      href: `/${params.storeId}/categories`,
      active: pathName.startsWith(`/${params.storeId}/categories`),
    },
    {
      label: "Sizes",
      href: `/${params.storeId}/sizes`,
      active: pathName.startsWith(`/${params.storeId}/sizes`),
    },
    {
      label: "Colors",
      href: `/${params.storeId}/colors`,
      active: pathName.startsWith(`/${params.storeId}/colors`),
    },
    {
      label: "Products",
      href: `/${params.storeId}/products`,
      active: pathName.startsWith(`/${params.storeId}/products`),
    },
    {
      label: "Orders",
      href: `/${params.storeId}/orders`,
      active: pathName === `/${params.storeId}/orders`,
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
              ? "text-black dark:text-white font-semibold"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
