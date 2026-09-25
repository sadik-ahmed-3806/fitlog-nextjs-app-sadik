"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlanStore } from "@/plan-store";

const NAV_LINKS = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlanStore();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Dumbbell className="h-5 w-5 text-[#ccff00]" strokeWidth={2.5} />
          <span className="text-lg font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Center nav links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-full bg-[#ccff00]/10 px-4 py-1.5 text-sm font-semibold text-[#ccff00]"
                    : "rounded-full px-4 py-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right-side status badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-1 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/15 px-1 text-xs font-bold">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-gray-200 transition-colors hover:border-white/40 hover:text-white"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-xs font-bold">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
