"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { mainNav, siteConfig } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-basecamp/85 backdrop-blur-xl border-b border-parchment/10 py-3"
          : "bg-gradient-to-b from-basecamp/70 to-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/images/logo.png" alt={siteConfig.name} width={40} height={40} className="h-9 w-9 lg:h-10 lg:w-10" priority />
          <span className="font-display text-xl lg:text-[22px] font-semibold text-parchment leading-none">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium text-parchment/85 transition-colors hover:text-orange",
                  pathname === item.href && "text-orange"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-2xl border border-parchment/10 bg-basecamp-2 shadow-2xl">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block border-b border-parchment/5 px-5 py-3.5 last:border-none hover:bg-basecamp-3"
                        >
                          <div className="text-sm font-semibold text-parchment">{child.label}</div>
                          {child.description && (
                            <div className="mt-0.5 text-xs text-fog">{child.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-sm text-parchment/80 hover:text-orange">
            <Phone className="h-4 w-4" />
            {siteConfig.phone}
          </a>
          <Button asChild size="default">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-parchment lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-parchment/10 bg-basecamp lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {mainNav.map((item) => (
                <div key={item.label}>
                  <Link href={item.href} className="block py-2.5 text-[15px] font-medium text-parchment">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-3 flex flex-col border-l border-parchment/10 pl-4">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className="py-2 text-sm text-fog hover:text-orange">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button asChild className="mt-3 w-full">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
