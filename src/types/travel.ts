export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: "Asia" | "Middle East" | "Europe" | "Africa" | "Americas" | "Oceania";
  category: "Beach" | "Mountain" | "City" | "Cultural" | "Adventure" | "Religious";
  budgetTier: "Budget" | "Mid-range" | "Luxury";
  bestSeason: "Winter" | "Summer" | "Spring" | "Autumn" | "Year-round";
  image: string;
  tagline: string;
  startingPricePKR: number;
  rating: number;
  reviewCount: number;
};

export type TourPackage = {
  slug: string;
  title: string;
  destinationSlug: string;
  category: "Family" | "Honeymoon" | "Group" | "Corporate" | "Solo" | "Adventure";
  durationDays: number;
  durationNights: number;
  pricePKR: number;
  originalPricePKR?: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { day: number; title: string; description: string }[];
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  trip: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readMinutes: number;
};

export type FAQ = {
  question: string;
  answer: string;
  category: "General" | "Booking" | "Visa" | "Umrah & Hajj" | "Payments";
};
