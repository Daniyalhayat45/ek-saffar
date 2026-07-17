import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ClipboardList, Mail, Send, ExternalLink } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { SignOutButton } from "@/components/admin/sign-out-button";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Send },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-basecamp">
      <aside className="hidden w-64 shrink-0 border-r border-parchment/10 bg-basecamp-2 lg:flex lg:flex-col">
        <div className="flex items-center gap-2.5 border-b border-parchment/10 px-6 py-5">
          <Image src="/images/logo.png" alt={siteConfig.name} width={32} height={32} />
          <span className="font-display text-lg font-semibold text-parchment">{siteConfig.name}</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-parchment/80 transition-colors hover:bg-basecamp hover:text-orange"
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-parchment/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fog hover:text-orange"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-parchment/10 bg-basecamp-2 px-5 py-4 lg:hidden">
          <span className="font-display text-lg font-semibold text-parchment">{siteConfig.name} Admin</span>
          <SignOutButton compact />
        </header>
        <main className="p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
