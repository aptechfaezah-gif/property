"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  HiShieldCheck,
  HiLightningBolt,
  HiHeart,
  HiGlobe,
  HiSparkles,
  HiUserGroup,
  HiLocationMarker,
  HiCheck,
  HiArrowRight,
} from "react-icons/hi";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import PageWrapper from "@/components/layout/PageWrapper";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Button from "@/components/ui/Button";
import { HOUSE_BRAND } from "@/lib/house-content";
import { getHousePhoneUrl, getPropertyWhatsAppUrl } from "@/lib/contact-links";
import {
  ABOUT_HERO,
  ABOUT_STORY,
  ABOUT_MISSION_VISION,
  ABOUT_VALUES,
  ABOUT_MILESTONES,
  ABOUT_PROCESS,
  ABOUT_AREAS,
  ABOUT_DIFFERENTIATORS,
  ABOUT_STATS,
  ABOUT_CTA,
} from "@/lib/about-content";
import { MOCK_AGENTS } from "@/lib/mock-data";

const valueIcons = [HiHeart, HiShieldCheck, HiLocationMarker, HiGlobe, HiSparkles, HiUserGroup];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 16 },
  },
};

const teamCardVariant = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 14 },
  },
};

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
    <span
      ref={ref}
      className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const agents = MOCK_AGENTS;
  const whatsappUrl = getPropertyWhatsAppUrl({
    title: "HOUSE — About Us inquiry",
    location: "Clifton",
    city: "Karachi",
  });
  const phoneUrl = getHousePhoneUrl();

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-60" />
        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-4 py-1.5 rounded-full glass text-secondary text-sm font-medium mb-4"
            >
              {ABOUT_HERO.badge}
            </motion.span>
            <motion.h1 variants={fadeUp}
              className="font-heading text-4xl sm:text-6xl font-bold leading-tight"
            >
              {ABOUT_HERO.title}{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-text">
                {ABOUT_HERO.titleAccent}
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 mt-6 max-w-3xl mx-auto text-lg leading-relaxed">
              {ABOUT_HERO.subtitle}
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/40 mt-3 text-sm">
              {HOUSE_BRAND.tagline}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              <Link href="/properties">
                <Button size="lg">Explore Listings</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to Our Team
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealOnScroll direction="left">
              <span className="text-secondary text-sm font-medium uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2 leading-tight">
                {ABOUT_STORY.headline}
              </h2>
              <div className="mt-6 space-y-4 text-white/60 leading-relaxed">
                {ABOUT_STORY.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll direction="right" delay={0.1}>
              <motion.div
                whileInView={{ scale: [0.96, 1], opacity: [0.6, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-80 sm:h-[28rem] rounded-2xl overflow-hidden glass animate-border-glow"
              >
                <Image
                  src={ABOUT_STORY.image}
                  alt={ABOUT_STORY.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4">
                  <p className="text-white font-semibold">{HOUSE_BRAND.name} Headquarters</p>
                  <p className="text-white/50 text-sm mt-1 flex items-center gap-1">
                    <HiLocationMarker className="text-primary" />
                    {HOUSE_BRAND.address}
                  </p>
                </div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[ABOUT_MISSION_VISION.mission, ABOUT_MISSION_VISION.vision].map((item, i) => (
              <RevealOnScroll key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-8 sm:p-10 h-full border border-white/5 hover:border-primary/25 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl neon-btn flex items-center justify-center mb-5">
                    {i === 0 ? (
                      <HiLightningBolt className="text-xl text-white" />
                    ) : (
                      <HiSparkles className="text-xl text-white" />
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/60 mt-4 leading-relaxed">{item.body}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-14">
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              What We Stand For
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto">
              These principles guide every listing, every agent conversation, and every client
              relationship at {HOUSE_BRAND.name}.
            </p>
          </RevealOnScroll>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {ABOUT_VALUES.map((value, i) => {
              const Icon = valueIcons[i] ?? HiShieldCheck;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="glass rounded-2xl p-6 h-full hover:border-primary/30 transition-all group"
                >
                  <Icon className="text-3xl text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-lg font-semibold text-white">{value.title}</h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="mb-14">
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
              HOUSE <span className="text-primary">Milestones</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl">
              From a Clifton-focused boutique team to Karachi&apos;s luxury digital property
              experience — how we grew with our clients.
            </p>
          </RevealOnScroll>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-40" />
            {ABOUT_MILESTONES.map((m, i) => (
              <RevealOnScroll key={m.year} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col sm:flex-row gap-4 mb-10 pl-12 sm:pl-0 ${
                    i % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="sm:w-1/2" />
                  <div
                    className={`sm:w-1/2 glass rounded-2xl p-5 border border-white/5 ${
                      i % 2 === 0 ? "sm:text-right" : ""
                    }`}
                  >
                    <span className="text-primary font-bold text-lg">{m.year}</span>
                    <h3 className="font-heading text-white font-semibold mt-1">{m.title}</h3>
                    <p className="text-white/50 text-sm mt-2 leading-relaxed">{m.detail}</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: i * 0.05 }}
                    className="absolute left-2.5 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-[#0f172a] shadow-lg shadow-primary/40"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-14">
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
              Your Journey with <span className="text-primary">HOUSE</span>
            </h2>
          </RevealOnScroll>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {ABOUT_PROCESS.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 h-full relative overflow-hidden group hover:border-secondary/30 transition-colors"
              >
                  <span className="text-5xl font-bold text-white/5 absolute -top-1 -right-1 group-hover:text-primary/10 transition-colors">
                    {step.step}
                  </span>
                  <span className="text-secondary text-xs font-bold tracking-widest">{step.step}</span>
                  <h3 className="font-heading text-white font-semibold mt-3">{step.title}</h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <span className="text-secondary text-sm font-medium uppercase tracking-widest">
                Karachi Coverage
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
                Areas We <span className="text-primary">Serve</span>
              </h2>
              <p className="text-white/60 mt-4 leading-relaxed">
                {HOUSE_BRAND.name} specializes in Karachi&apos;s most sought-after neighborhoods.
                Our agents know society bylaws, typical price bands in PKR, and which blocks match
                your lifestyle — whether you want sea breeze in Clifton or gated calm in Bahria.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-primary hover:text-secondary mt-6 text-sm font-medium transition-colors"
              >
                View all listings <HiArrowRight />
              </Link>
            </RevealOnScroll>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {ABOUT_AREAS.map((area) => (
                <motion.span
                  key={area}
                  variants={scaleIn}
                  whileHover={{ scale: 1.06, borderColor: "rgba(124,58,237,0.5)" }}
                  className="px-4 py-2 rounded-full glass text-sm text-white/80 border border-white/10 transition-colors cursor-default"
                >
                  <HiLocationMarker className="inline text-primary mr-1.5 -mt-0.5" />
                  {area}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold">
              Why Clients Choose <span className="text-primary">HOUSE</span>
            </h2>
          </RevealOnScroll>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {ABOUT_DIFFERENTIATORS.map((d) => (
              <motion.div
                key={d.title}
                variants={scaleIn}
                whileHover={{ scale: 1.03 }}
                className="glass rounded-2xl p-6 text-center h-full"
              >
                <HiCheck className="text-2xl text-secondary mx-auto mb-3" />
                <h3 className="font-heading font-semibold text-white">{d.title}</h3>
                <p className="text-white/50 text-sm mt-2">{d.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 sm:p-12 border border-primary/10"
          >
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
            >
              {ABOUT_STATS.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp}>
                  <Counter end={stat.end} suffix={stat.suffix} />
                  <p className="text-white/50 text-sm mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-14">
            <span className="text-secondary text-sm font-medium uppercase tracking-widest">
              Meet the Team
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
              HOUSE <span className="text-primary">Agents</span>
            </h2>
            <p className="text-white/50 mt-3 max-w-2xl mx-auto">
              Dedicated Karachi specialists — each focused on premium neighborhoods and long-term
              client relationships.
            </p>
          </RevealOnScroll>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6 items-stretch"
          >
            {agents.slice(0, 3).map((agent) => (
              <motion.article
                key={agent._id}
                variants={teamCardVariant}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass rounded-2xl overflow-hidden group h-full flex flex-col border border-white/5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
              >
                <div className="relative h-64 flex-shrink-0 w-full">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-xl font-bold text-white">{agent.name}</h3>
                    <p className="text-secondary text-sm mt-0.5">
                      ★ {agent.rating} · {agent.propertiesSold}+ homes closed
                    </p>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 min-h-0">
                  <p className="text-white/60 text-sm leading-relaxed flex-1 line-clamp-4 min-h-[5.5rem]">
                    {agent.bio}
                  </p>
                  <div className="flex gap-2 mt-4 flex-shrink-0">
                    <a
                      href={getPropertyWhatsAppUrl({
                        title: `HOUSE agent — ${agent.name}`,
                        city: "Karachi",
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-medium hover:bg-[#25D366]/25 transition-colors"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a
                      href={getHousePhoneUrl(agent.phone)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/15 border border-primary/40 text-primary text-xs font-medium hover:bg-primary/25 transition-colors"
                    >
                      <FaPhone /> Call
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="glass rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">Visit or call {HOUSE_BRAND.name}</h3>
                <ul className="mt-4 space-y-2 text-white/60 text-sm">
                  <li className="flex items-center gap-2">
                    <HiLocationMarker className="text-primary" />
                    {HOUSE_BRAND.address}
                  </li>
                  <li>{HOUSE_BRAND.phone}</li>
                  <li>{HOUSE_BRAND.email}</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-medium hover:bg-[#25D366]/30 transition-colors"
                >
                  <FaWhatsapp className="text-lg" /> WhatsApp Us
                </a>
                <a
                  href={phoneUrl}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/20 border border-primary/40 text-primary font-medium hover:bg-primary/30 transition-colors"
                >
                  <FaPhone /> Call Now
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <motion.div
              whileInView={{ scale: [0.97, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative rounded-3xl overflow-hidden"
            >
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 gradient-bg"
              />
              <div className="relative px-8 py-16 sm:py-20 text-center">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                  {ABOUT_CTA.title}
                </h2>
                <p className="text-white/60 mt-4 max-w-xl mx-auto">{ABOUT_CTA.subtitle}</p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link href={ABOUT_CTA.primaryHref}>
                    <Button size="lg">{ABOUT_CTA.primaryLabel}</Button>
                  </Link>
                  <Link href={ABOUT_CTA.secondaryHref}>
                    <Button variant="outline" size="lg">
                      {ABOUT_CTA.secondaryLabel}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </section>
    </PageWrapper>
  );
}
