"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/homepage";

export default function HeaderNav({ links }: { links?: NavLink[] }) {
  const pathname = usePathname();

  const defaultLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const navLinks = links && links.length === 4 ? links : defaultLinks;

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(link.href);

        return (
          <Link
            key={link.href + link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative py-1 text-[14px] font-semibold transition-colors ${
              isActive
                ? "text-[#F15A24] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:rounded-full after:bg-[#F15A24]"
                : "text-[#102A43]/85 hover:text-[#07575B]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
