"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Liens principaux de navigation.
// Ils correspondent aux ecrans fondamentaux du MVP.
const NAV_ITEMS = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/projects", label: "Projets" },
  { href: "/tasks", label: "Mes taches" },
  { href: "/profile", label: "Profil" },
];

export function AppNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav aria-label="Navigation principale" className="w-full">
      <ul className="flex w-full flex-wrap gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`inline-flex rounded-chip border px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-brand-600 bg-brand-100 text-brand-600"
                    : "border-border bg-surface-0 text-foreground hover:bg-surface-100"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
