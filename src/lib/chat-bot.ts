import { formatPrice } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  time: Date;
}

const GREETINGS = ["hello", "hi", "hey", "start", "good morning", "good evening"];

const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["property", "properties", "home", "listing", "villa", "apartment", "penthouse", "house"],
    reply:
      "HOUSE has 500+ luxury properties in Karachi — penthouses, villas, apartments, and more. Visit the Properties page or ask about areas like Clifton, DHA, or Bahria Town.",
  },
  {
    keywords: ["price", "cost", "expensive", "cheap", "budget", "afford", "pkr", "rupee"],
    reply: `Our Karachi listings range from ${formatPrice(145600000)} to ${formatPrice(1176000000)}. Skyline Penthouse is ${formatPrice(686000000)}, Clifton Sea View Villa is ${formatPrice(1064000000)}. Share your budget and I can suggest options.`,
  },
  {
    keywords: ["book", "booking", "viewing", "schedule", "visit", "tour", "appointment"],
    reply:
      "To book a property viewing, fill out the form on the property detail page, or go to Dashboard → Bookings and create a new booking. I am happy to guide you!",
  },
  {
    keywords: ["location", "city", "where", "karachi", "clifton", "dha", "bahria", "pechs", "gulshan", "malir"],
    reply:
      "All our featured properties are in Karachi — Clifton, DHA Phase 8, Bahria Town, PECHS, Gulshan-e-Iqbal, and Scheme 33. Which area are you interested in?",
  },
  {
    keywords: ["agent", "broker", "consultant", "aisha", "hassan", "zara", "sarah", "james", "elena"],
    reply:
      "HOUSE expert agents — Aisha Khan, Hassan Malik, and Zara Sheikh — serve our clients across Karachi. Reach them via Contact or any HOUSE property listing.",
  },
  {
    keywords: ["3d", "virtual", "tour", "preview", "360"],
    reply:
      "Every property includes a 3D virtual preview and 360° view. Open any property detail page and tap the '360° View' button for an immersive experience.",
  },
  {
    keywords: ["dashboard", "analytics", "stats", "revenue", "sales"],
    reply:
      "The Dashboard shows total properties, revenue charts, recent bookings, and sales analytics. Use the Bookings section to schedule a new viewing.",
  },
  {
    keywords: ["amenities", "pool", "gym", "parking", "facility"],
    reply:
      "Luxury amenities include pool, gym, smart home, concierge, private parking, spa, and more — see the full list on each property's detail page.",
  },
  {
    keywords: ["contact", "phone", "email", "call", "reach", "whatsapp"],
    reply:
      "📞 +92 21 111-HOUSE | ✉️ hello@house.com | 📍 Plot 42, Block 4, Clifton, Karachi 75600. You can also use the Contact page form.",
  },
  {
    keywords: ["house", "platform", "website", "about", "what is"],
    reply:
      "HOUSE is a modern luxury real estate platform for Karachi — property search, 3D previews, instant booking, agent profiles, and an analytics dashboard. Find your dream home here.",
  },
  {
    keywords: ["help", "guide", "how"],
    reply:
      "I am the HOUSE assistant. Ask me about properties, prices in PKR, bookings, Karachi locations, agents, or 3D tours.",
  },
  {
    keywords: ["thank", "thanks", "thx"],
    reply: "You are welcome! Feel free to ask anything else. Happy house hunting in Karachi!",
  },
];

const DEFAULT_REPLIES = [
  "I can help with HOUSE luxury real estate in Karachi — properties, booking, prices in PKR, or locations.",
  "Try asking: 'Show properties', 'How do I book?', or 'Clifton area listings'.",
  "Good question! Would you like details on properties, booking, agents, or 3D tours in Karachi?",
];

export function getBotReply(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  if (!msg) return "Please type a message — I am here to help.";

  if (GREETINGS.some((g) => msg === g || msg.startsWith(g + " "))) {
    return "Hello! I am the HOUSE assistant for Karachi luxury real estate. Ask me about properties, prices in PKR, bookings, or locations.";
  }

  for (const { keywords, reply } of RESPONSES) {
    if (keywords.some((k) => msg.includes(k))) return reply;
  }

  return DEFAULT_REPLIES[Math.floor(Math.random() * DEFAULT_REPLIES.length)];
}

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "bot",
  text: "Hello! I am the HOUSE assistant. Ask me about Karachi properties, prices in PKR, bookings, locations, or agents.",
  time: new Date(),
};
