"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/properties/PropertyCard";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Button from "@/components/ui/Button";
import { HiArrowRight } from "react-icons/hi";
import type { Property } from "@/types";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties?featured=true&limit=3")
      .then((r) => r.json())
      .then((data) => setProperties(data.properties || []));
  }, []);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-16">
          <span className="text-secondary text-sm font-medium uppercase tracking-widest">HOUSE Featured</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-2">
            Top Picks for Our Clients
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Premium Karachi homes hand-selected by the HOUSE team for buyers and investors
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <PropertyCard key={property._id} property={property} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties">
            <Button variant="outline" size="lg" className="gap-2">
              View All HOUSE Listings
              <HiArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
