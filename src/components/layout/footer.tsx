import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { siteConfig, footerLinks } from "@/constants/site";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/shared/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-parchment/10 bg-basecamp-2">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt={siteConfig.name} width={36} height={36} className="h-9 w-9" />
              <span className="font-display text-xl font-semibold text-parchment">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">{siteConfig.description}</p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: YoutubeIcon, href: siteConfig.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-parchment/15 text-parchment/70 transition-colors hover:border-orange hover:text-orange"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={footerLinks.company} />
          <FooterCol title="Explore" links={footerLinks.explore} />

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-parchment">Stay in the loop</h4>
            <p className="mt-3 text-sm text-fog">Trip ideas and seasonal fares, once or twice a month.</p>
            <NewsletterForm />
            <ul className="mt-6 space-y-3 text-sm text-fog">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-orange" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-orange">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-orange" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-orange">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-orange" />
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-parchment/10 pt-8 sm:flex-row">
          <p className="text-xs text-fog">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-fog hover:text-orange">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-parchment">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-fog transition-colors hover:text-orange">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
