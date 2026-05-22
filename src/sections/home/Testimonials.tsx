"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "HOUSE Client — Clifton Buyer",
    avatar: "/clients/client2.png",
    text: "HOUSE made finding my Clifton penthouse effortless. The 3D tour on HOUSE saved me weeks — I booked a viewing the same day and closed with their agent.",
    rating: 5,
  },
  {
    name: "Fatima Ali",
    role: "HOUSE Client — First Home",
    avatar: "/clients/client1.png",
    text: "As a first-time buyer I relied on HOUSE from start to finish. Their team in Karachi guided me through every listing until I found the perfect DHA villa.",
    rating: 5,
  },
  {
    name: "Hassan Raza",
    role: "HOUSE Client — Investor",
    avatar: "/clients/client2.png",
    text: "I manage multiple investments through HOUSE. The client dashboard, PKR pricing, and verified listings give me confidence every time I add a property to my portfolio.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-secondary text-sm font-medium uppercase tracking-widest">HOUSE Clients</span>
          <h2 className="font-heading text-4xl font-bold mt-2">
            What Our Clients Say About HOUSE
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl p-8 sm:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <HiStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4 mt-8">
                <Image
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-16 h-16 ring-2 ring-primary/40"
                />
                <div className="text-left">
                  <p className="font-semibold text-white">{testimonials[current].name}</p>
                  <p className="text-white/50 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <HiChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-white/20"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Next"
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
