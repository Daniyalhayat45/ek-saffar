export const siteConfig = {
  name: "Ek Safar",
  tagline: "A Journey of Thousand Destinations",
  description:
    "Ek Safar designs custom journeys — family holidays, honeymoons, Hajj & Umrah, and corporate travel — planned with the care of people who've made the trip themselves.",
  url: "https://eksafar.com",
  phone: "+92 300 1234567",
  whatsapp: "+923001234567",
  email: "hello@eksafar.com",
  address: "3rd Floor, Ali Trade Centre, I.I. Chundrigar Road, Karachi, Pakistan",
  hours: "Mon – Sat, 10:00 AM – 8:00 PM PKT",
  social: {
    instagram: "https://instagram.com/eksafar",
    facebook: "https://facebook.com/eksafar",
    tiktok: "https://tiktok.com/@eksafar",
    youtube: "https://youtube.com/@eksafar",
  },
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "All Destinations", href: "/destinations", description: "Browse every place we send travelers" },
      { label: "Tour Packages", href: "/packages", description: "Curated multi-day itineraries" },
      { label: "Honeymoon", href: "/honeymoon", description: "Romantic escapes for two" },
      { label: "Group Tours", href: "/group-tours", description: "Travel with a crew" },
      { label: "Corporate Tours", href: "/corporate-tours", description: "Offsites & incentive travel" },
    ],
  },
  {
    label: "Sacred Journeys",
    href: "/umrah",
    children: [
      { label: "Umrah Packages", href: "/umrah", description: "Economy to luxury departures" },
      { label: "Hajj Packages", href: "/hajj", description: "Guided, fully-managed Hajj" },
      { label: "Visa Services", href: "/visa-services", description: "Documentation, handled" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  explore: [
    { label: "Destinations", href: "/destinations" },
    { label: "Tour Packages", href: "/packages" },
    { label: "Honeymoon Packages", href: "/honeymoon" },
    { label: "Group Tours", href: "/group-tours" },
    { label: "Corporate Tours", href: "/corporate-tours" },
  ],
  sacred: [
    { label: "Umrah Packages", href: "/umrah" },
    { label: "Hajj Packages", href: "/hajj" },
    { label: "Visa Services", href: "/visa-services" },
    { label: "FAQs", href: "/faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};
