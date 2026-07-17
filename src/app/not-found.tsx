import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="contour-field flex min-h-screen flex-col items-center justify-center bg-basecamp px-5 text-center">
      <Compass className="h-14 w-14 animate-float text-orange" />
      <h1 className="mt-6 font-display text-6xl font-semibold text-parchment">404</h1>
      <p className="mt-3 max-w-sm text-fog">
        This route isn&apos;t on our itinerary. Let&apos;s get you back to somewhere worth visiting.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/destinations">Browse Destinations</Link>
        </Button>
      </div>
    </section>
  );
}
