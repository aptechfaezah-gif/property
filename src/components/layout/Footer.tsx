"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { HOUSE_BRAND } from "@/lib/house-content";

const clientLinks = [
  { href: "/properties", label: "Browse Listings" },
  { href: "/contact", label: "Client Support" },
  { href: "/login", label: "Client Login" },
  { href: "/signup", label: "Join HOUSE" },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About HOUSE" },
  { href: "/properties", label: "HOUSE Properties" },
  { href: "/dashboard", label: "Client Dashboard" },
  { href: "/contact", label: "Contact HOUSE" },
];

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="text-3xl font-bold font-[family-name:var(--font-poppins)]">
              <span className="text-primary">H</span>OUSE
            </Link>
            <p className="mt-4 text-white/60 text-sm leading-relaxed">
              {HOUSE_BRAND.clientPromise}
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-4">For HOUSE Clients</h3>
            <ul className="space-y-2">
              {clientLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-primary text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-4">HOUSE Property Types</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="/properties?type=house" className="hover:text-primary transition-colors">Houses</Link></li>
              <li><Link href="/properties?type=apartment" className="hover:text-primary transition-colors">Apartments</Link></li>
              <li><Link href="/properties?type=villa" className="hover:text-primary transition-colors">Villas</Link></li>
              <li><Link href="/properties?type=penthouse" className="hover:text-primary transition-colors">Penthouses</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-white font-semibold mb-4">HOUSE Office</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <HiLocationMarker className="text-primary flex-shrink-0" />
                {HOUSE_BRAND.address}
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <HiPhone className="text-primary flex-shrink-0" />
                {HOUSE_BRAND.phone}
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <HiMail className="text-primary flex-shrink-0" />
                {HOUSE_BRAND.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {HOUSE_BRAND.name}. Serving luxury clients across Karachi.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="#" className="hover:text-white transition-colors">HOUSE Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">HOUSE Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
