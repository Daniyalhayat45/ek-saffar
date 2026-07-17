// Local types for this static fallback data — intentionally decoupled from the
// database-derived types in @/types/travel, since testimonials/blog/FAQs are
// not yet migrated to the database (packages and destinations are).
export type StaticTestimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  trip: string;
};

export type StaticBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readMinutes: number;
};

export type StaticFAQ = {
  question: string;
  answer: string;
  category?: string;
};

export const testimonials: StaticTestimonial[] = [
  {
    id: "t1",
    name: "Ayesha Raza",
    location: "Lahore",
    avatar: "https://picsum.photos/seed/avatar-ayesha/200/200",
    rating: 5,
    quote:
      "Every detail of our Hunza trip was handled — hotels, guide, even the Khunjerab permit. We just showed up and enjoyed the mountains with our kids.",
    trip: "Hunza & Skardu Family Explorer",
  },
  {
    id: "t2",
    name: "Bilal & Sana",
    location: "Karachi",
    avatar: "https://picsum.photos/seed/avatar-bilal/200/200",
    rating: 5,
    quote:
      "Our Maldives honeymoon looked exactly like the photos they showed us — no surprises, no upsells at the resort. Worth every rupee.",
    trip: "Maldives Overwater Honeymoon",
  },
  {
    id: "t3",
    name: "Hafiz Muhammad Usman",
    location: "Faisalabad",
    avatar: "https://picsum.photos/seed/avatar-usman/200/200",
    rating: 5,
    quote:
      "This was my parents' first Umrah. The Muallim was patient with my father's mobility needs, and the hotel really was walking distance from the Haram.",
    trip: "Premium Umrah — 14 Nights",
  },
  {
    id: "t4",
    name: "Nimra Sheikh",
    location: "Islamabad",
    avatar: "https://picsum.photos/seed/avatar-nimra/200/200",
    rating: 5,
    quote:
      "Booked the Istanbul-Cappadocia trip for our anniversary. The balloon ride sunrise is something I still think about.",
    trip: "Istanbul & Cappadocia Cultural Trail",
  },
  {
    id: "t5",
    name: "Fahad Iqbal",
    location: "Karachi",
    avatar: "https://picsum.photos/seed/avatar-fahad/200/200",
    rating: 4,
    quote:
      "Organized our company's Dubai offsite for 24 people. The conference setup and desert safari night were both flawless.",
    trip: "Dubai Executive Offsite",
  },
  {
    id: "t6",
    name: "Zara & Hamza",
    location: "Lahore",
    avatar: "https://picsum.photos/seed/avatar-zara/200/200",
    rating: 5,
    quote:
      "Bali felt designed for us specifically — quiet villa days in Ubud, then energy in Seminyak. Balance was perfect.",
    trip: "Bali Honeymoon Escape",
  },
  {
    id: "t7",
    name: "Danish Malik",
    location: "Rawalpindi",
    avatar: "https://picsum.photos/seed/avatar-danish/200/200",
    rating: 5,
    quote:
      "Went with a group of 12 university friends to Swat. The trip lead kept everyone on schedule without ever feeling rushed.",
    trip: "Swat Valley Group Adventure",
  },
  {
    id: "t8",
    name: "Mahnoor Aslam",
    location: "Multan",
    avatar: "https://picsum.photos/seed/avatar-mahnoor/200/200",
    rating: 5,
    quote:
      "Santorini for our honeymoon was a splurge, but the private photoshoot alone made it worth it. Team was reachable the entire trip.",
    trip: "Santorini Luxury Honeymoon",
  },
  {
    id: "t9",
    name: "Omar Farooq",
    location: "Karachi",
    avatar: "https://picsum.photos/seed/avatar-omar/200/200",
    rating: 4,
    quote:
      "Second Umrah booking with Ek Safar. Consistent quality both times, and their WhatsApp support actually responds fast.",
    trip: "Premium Umrah — 14 Nights",
  },
];

export const blogPosts: StaticBlogPost[] = [
  {
    slug: "first-time-umrah-checklist",
    title: "First-Time Umrah: A Complete Packing & Prep Checklist",
    excerpt:
      "Everything to sort before you fly — documents, Ihram essentials, and the small things first-timers forget.",
    category: "Umrah & Hajj",
    image: "https://picsum.photos/seed/blog-umrah-checklist/900/600",
    author: "Ek Safar Editorial",
    date: "2026-06-02",
    readMinutes: 7,
  },
  {
    slug: "best-time-visit-hunza",
    title: "When to Visit Hunza: A Season-by-Season Guide",
    excerpt:
      "Cherry blossoms in spring, golden orchards in autumn — here's how to pick your Hunza window.",
    category: "Destinations",
    image: "https://picsum.photos/seed/blog-hunza-season/900/600",
    author: "Sara Khan",
    date: "2026-05-18",
    readMinutes: 6,
  },
  {
    slug: "maldives-vs-bali-honeymoon",
    title: "Maldives or Bali: Which Honeymoon Fits You?",
    excerpt:
      "One's about doing nothing beautifully, the other's about doing everything beautifully. Here's how to choose.",
    category: "Honeymoon",
    image: "https://picsum.photos/seed/blog-maldives-bali/900/600",
    author: "Ek Safar Editorial",
    date: "2026-04-30",
    readMinutes: 5,
  },
  {
    slug: "visa-documents-guide-2026",
    title: "Visa Documents Guide: What You Actually Need in 2026",
    excerpt:
      "A country-by-country breakdown of the paperwork that trips up Pakistani travelers most often.",
    category: "Visa",
    image: "https://picsum.photos/seed/blog-visa-guide/900/600",
    author: "Ek Safar Editorial",
    date: "2026-04-12",
    readMinutes: 8,
  },
  {
    slug: "corporate-offsite-planning-101",
    title: "Planning a Corporate Offsite That Doesn't Feel Like Work",
    excerpt:
      "How to structure a 3-day retreat so your team actually comes back energized.",
    category: "Corporate",
    image: "https://picsum.photos/seed/blog-corporate-offsite/900/600",
    author: "Bilal Ahmed",
    date: "2026-03-22",
    readMinutes: 6,
  },
  {
    slug: "istanbul-layover-guide",
    title: "The 24-Hour Istanbul Layover Guide",
    excerpt:
      "Long layover in Istanbul? Here's a realistic route through the old city and back to the airport on time.",
    category: "Destinations",
    image: "https://picsum.photos/seed/blog-istanbul-layover/900/600",
    author: "Sara Khan",
    date: "2026-02-28",
    readMinutes: 5,
  },
];

export const faqs: StaticFAQ[] = [
  {
    question: "How far in advance should I book a tour package?",
    answer:
      "For domestic trips (Hunza, Skardu, Swat) we recommend booking 3–4 weeks ahead, especially in peak season (June–September). For Umrah, Hajj, and international honeymoon packages, 2–3 months ahead gives us the best hotel and flight availability.",
    category: "Booking",
  },
  {
    question: "Do I need a visa for Umrah?",
    answer:
      "Yes. We handle the full Umrah visa process as part of every package — you'll just need to send us your passport, photographs, and vaccination record. Processing typically takes 5–10 working days.",
    category: "Umrah & Hajj",
  },
  {
    question: "What payment plans do you offer?",
    answer:
      "Most packages can be booked with a 30% advance to confirm your seats, with the balance due 15 days before departure. Umrah and Hajj packages support installment plans — ask your travel consultant for details.",
    category: "Payments",
  },
  {
    question: "Can you customize an existing package?",
    answer:
      "Absolutely — every package on this site is a starting template. Tell us your dates, budget, and group size through the inquiry form and we'll tailor the itinerary, hotel category, and inclusions.",
    category: "Booking",
  },
  {
    question: "What documents do I need for international visa processing?",
    answer:
      "Typically: a passport valid 6+ months beyond travel, passport-size photographs on a white background, bank statements, and an employment or business letter. Exact requirements vary by country — see our Visa Services page for a country-specific checklist.",
    category: "Visa",
  },
  {
    question: "Is travel insurance included in packages?",
    answer:
      "Travel insurance is not included by default but is strongly recommended and can be added to any package for a small additional fee at checkout or through your consultant.",
    category: "General",
  },
  {
    question: "Can senior citizens or those with mobility needs join Umrah groups?",
    answer:
      "Yes — we run dedicated senior-friendly Umrah departures with wheelchair assistance, ground-floor rooms, and slower-paced Ziyarat tours. Mention this when booking so we assign the right group.",
    category: "Umrah & Hajj",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Cancellations more than 30 days before departure receive a full refund minus processing fees. Closer to departure, refund percentages decrease — full details are on our Refund Policy page.",
    category: "Payments",
  },
];
