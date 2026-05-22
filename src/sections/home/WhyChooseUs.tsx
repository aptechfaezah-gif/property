"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HiShieldCheck, HiLightningBolt, HiHome, HiSupport } from "react-icons/hi";
import { HOUSE_BRAND } from "@/lib/house-content";

const features = [
  {
    icon: HiShieldCheck,
    title: "HOUSE Verified Homes",
    description:
      "Every listing on HOUSE is checked by our Karachi team so clients get trusted, accurate property details.",
    color: "text-primary",
  },
  {
    icon: HiLightningBolt,
    title: "Book with HOUSE",
    description:
      "HOUSE clients can schedule viewings in seconds from any listing or the client dashboard.",
    color: "text-secondary",
  },
  {
    icon: HiHome,
    title: "Karachi by HOUSE",
    description:
      "From Clifton to DHA and Bahria Town — HOUSE brings the best luxury homes in Karachi to one place.",
    color: "text-accent",
  },
  {
    icon: HiSupport,
    title: "HOUSE Client Care",
    description:
      "Our HOUSE agents and live chat support help clients at every step — search, tour, and purchase.",
    color: "text-primary",
  },
];

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">Why Choose HOUSE</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mt-2 leading-tight">
              Built for
              <br />
              <span className="text-primary">HOUSE Clients</span>
            </h2>
            <p className="text-white/60 mt-4 leading-relaxed">
              {HOUSE_BRAND.name} is designed around you — smarter search, 3D home previews, and a dedicated team
              that makes buying luxury property in Karachi simple and secure.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { end: 500, suffix: "+", label: "HOUSE Listings" },
                { end: 1200, suffix: "+", label: "HOUSE Clients" },
                { end: 50, suffix: "+", label: "HOUSE Agents" },
                { end: 12, suffix: "+", label: "Karachi Areas" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5 text-center">
                  <Counter end={stat.end} suffix={stat.suffix} />
                  <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <feature.icon className={`${feature.color} text-3xl mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-heading text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
