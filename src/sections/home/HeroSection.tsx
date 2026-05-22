"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HiSearch, HiArrowRight } from "react-icons/hi";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { HOUSE_BRAND } from "@/lib/house-content";

const HouseScene = dynamic(() => import("@/components/three/HouseScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/properties?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-secondary text-sm font-medium mb-6"
          >
            {HOUSE_BRAND.tagline}
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {HOUSE_BRAND.heroHeadlineMain}
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {HOUSE_BRAND.heroHeadlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white/60 text-lg max-w-lg leading-relaxed"
          >
            {HOUSE_BRAND.heroSubtitle}
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSearch}
            className="mt-8 flex gap-2 glass rounded-2xl p-2 max-w-lg"
          >
            <div className="flex-1 flex items-center gap-2 px-3">
              <HiSearch className="text-white/40 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search HOUSE listings in Karachi..."
                className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              />
            </div>
            <Button type="submit" size="md">
              Search
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <Link href="/properties">
              <Button size="lg" className="gap-2">
                Browse HOUSE Properties
                <HiArrowRight />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Talk to HOUSE Team
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[400px] lg:h-[500px]"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden glass">
            <HouseScene />
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 animate-float">
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-white/60 text-sm">HOUSE Listings</p>
          </div>
          <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float" style={{ animationDelay: "2s" }}>
            <p className="text-2xl font-bold text-secondary">1,200+</p>
            <p className="text-white/60 text-sm">Happy HOUSE Clients</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
