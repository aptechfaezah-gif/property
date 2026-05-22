import { formatPrice } from "@/lib/utils";
import { HOUSE_BRAND } from "@/lib/house-content";

interface PropertyContactInfo {
  title: string;
  location?: string;
  city?: string;
  price?: number;
}

export function getPropertyWhatsAppUrl(property: PropertyContactInfo): string {
  const location = [property.location, property.city].filter(Boolean).join(", ");
  const priceText = property.price ? ` — ${formatPrice(property.price)}` : "";
  const text = encodeURIComponent(
    `Hi HOUSE, I am interested in: ${property.title}${location ? ` (${location})` : ""}${priceText}`
  );
  return `https://wa.me/${HOUSE_BRAND.whatsapp}?text=${text}`;
}

export function getHousePhoneUrl(phone?: string): string {
  const raw = phone || HOUSE_BRAND.phoneDial;
  const dial = raw.replace(/[^\d+]/g, "");
  return `tel:${dial}`;
}
