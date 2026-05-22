"use client";

import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { getPropertyWhatsAppUrl, getHousePhoneUrl } from "@/lib/contact-links";

interface PropertyContactActionsProps {
  title: string;
  location?: string;
  city?: string;
  price?: number;
  phone?: string;
  className?: string;
  compact?: boolean;
}

export default function PropertyContactActions({
  title,
  location,
  city,
  price,
  phone,
  className = "",
  compact = false,
}: PropertyContactActionsProps) {
  const whatsappUrl = getPropertyWhatsAppUrl({ title, location, city, price });
  const phoneUrl = getHousePhoneUrl(phone);

  if (compact) {
    return (
      <div
        className={`flex items-center justify-center gap-1.5 py-1.5 px-1 bg-[#0f172a] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp about ${title}`}
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/35 border border-[#25D366]/40 transition-colors"
        >
          <FaWhatsapp className="text-base" />
        </a>
        <a
          href={phoneUrl}
          aria-label="Call HOUSE"
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/20 text-primary hover:bg-primary/35 border border-primary/40 transition-colors"
        >
          <FaPhone className="text-sm" />
        </a>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center gap-3 py-2.5 px-3 bg-[#0f172a]/95 border-t border-white/10 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp about ${title}`}
        className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-colors text-sm font-medium"
      >
        <FaWhatsapp className="text-lg" />
        WhatsApp
      </a>
      <a
        href={phoneUrl}
        aria-label="Call HOUSE"
        className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-primary/15 border border-primary/40 text-primary hover:bg-primary/25 transition-colors text-sm font-medium"
      >
        <FaPhone className="text-base" />
        Call
      </a>
    </div>
  );
}
