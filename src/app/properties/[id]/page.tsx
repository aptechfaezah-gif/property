"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  HiLocationMarker,
  HiCheck,
  HiPlay,
  HiZoomIn,
} from "react-icons/hi";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import PropertyContactActions from "@/components/properties/PropertyContactActions";
import type { Property, Agent } from "@/types";

const HouseScene = dynamic(() => import("@/components/three/HouseScene"), { ssr: false });

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [view360, setView360] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [booking, setBooking] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/properties/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProperty(data.property);
        if (data.property?.agentId) {
          fetch("/api/agents")
            .then((r) => r.json())
            .then((d) => {
              const found = d.agents?.find((a: Agent) => a._id === data.property.agentId);
              setAgent(found || null);
            });
        }
      });
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: id, ...booking }),
    });
    setBookingStatus(res.ok ? "success" : "error");
  };

  if (!property) {
    return (
      <PageWrapper>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Gallery */}
        <div className="grid lg:grid-cols-3 gap-4 mb-10">
          <div className="lg:col-span-2 rounded-2xl overflow-hidden glass">
            <div
              className="relative h-64 sm:h-96 group cursor-pointer"
              onClick={() => setZoomed(true)}
            >
              {view360 ? (
                <div className="h-full"><HouseScene /></div>
              ) : (
                <Image src={property.images[activeImage]} alt={property.title} fill className="object-cover" sizes="66vw" />
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); setView360(!view360); }} className="glass px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-1">
                  {view360 ? "Photos" : "360° View"}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setZoomed(true); }} className="glass px-3 py-1.5 rounded-lg text-xs text-white flex items-center gap-1">
                  <HiZoomIn /> Zoom
                </button>
              </div>
            </div>
            <PropertyContactActions
              title={property.title}
              location={property.location}
              city={property.city}
              price={property.price}
              phone={agent?.phone}
            />
          </div>
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {property.images.map((img, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-28 lg:w-full rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === i ? "border-primary" : "border-white/10"
                }`}
              >
                <button
                  type="button"
                  onClick={() => { setActiveImage(i); setView360(false); }}
                  className="relative w-full h-20 lg:h-24 block"
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                </button>
                <PropertyContactActions
                  title={property.title}
                  location={property.location}
                  city={property.city}
                  price={property.price}
                  phone={agent?.phone}
                  compact
                />
              </div>
            ))}
          </div>
        </div>

        {zoomed && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setZoomed(false)}>
            <div className="relative w-full max-w-4xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
              <Image src={property.images[activeImage]} alt={property.title} fill className="object-contain" />
            </div>
            <div className="w-full max-w-4xl mt-3" onClick={(e) => e.stopPropagation()}>
              <PropertyContactActions
                title={property.title}
                location={property.location}
                city={property.city}
                price={property.price}
                phone={agent?.phone}
              />
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className="text-secondary text-sm capitalize">{property.type}</span>
                  <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-1">{property.title}</h1>
                  <p className="flex items-center gap-1 text-white/50 mt-2">
                    <HiLocationMarker className="text-primary" />
                    {property.location}, {property.city}
                  </p>
                </div>
                <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
              </div>

              <div className="flex gap-6 mt-6 glass rounded-2xl p-4">
                <span className="flex items-center gap-2 text-white/70"><FaBed className="text-primary" />{property.bedrooms} Bedrooms</span>
                <span className="flex items-center gap-2 text-white/70"><FaBath className="text-secondary" />{property.bathrooms} Bathrooms</span>
                <span className="flex items-center gap-2 text-white/70"><FaRulerCombined className="text-accent" />{property.area.toLocaleString()} sqft</span>
              </div>
            </motion.div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading text-xl font-semibold mb-4">Description</h2>
              <p className="text-white/60 leading-relaxed">{property.description}</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-white/70 text-sm">
                    <HiCheck className="text-primary flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {property.videoUrl && (
              <div className="glass rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 neon-btn rounded-xl flex items-center justify-center">
                  <HiPlay className="text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">Video Tour Available</h3>
                  <p className="text-white/50 text-sm">Schedule a virtual walkthrough with our agent</p>
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-64 relative">
              <iframe
                title="Property Location"
                src={`https://maps.google.com/maps?q=${property.coordinates?.lat || 24.8607},${property.coordinates?.lng || 67.0011}&z=15&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-6">
            {agent && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-heading font-semibold mb-4">Your HOUSE Agent</h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={agent.avatar}
                    alt={agent.name}
                    width={64}
                    height={64}
                    unoptimized
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-white/50 text-sm">{agent.propertiesSold} HOUSE clients served</p>
                    <p className="text-primary text-sm">★ {agent.rating}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm mt-3">{agent.bio}</p>
                <p className="text-white/60 text-sm mt-2">{agent.phone}</p>
              </div>
            )}

            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold mb-4">Book with HOUSE</h3>
              {bookingStatus === "success" ? (
                <div className="text-center py-6">
                  <p className="text-secondary text-lg font-medium">HOUSE Booking Received!</p>
                  <p className="text-white/50 text-sm mt-2">Your HOUSE agent will contact you shortly to confirm your viewing.</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <Input label="Full Name" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} required />
                  <Input label="Email" type="email" value={booking.email} onChange={(e) => setBooking({ ...booking, email: e.target.value })} required />
                  <Input label="Phone" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} required />
                  <Input label="Preferred Date" type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} required />
                  <textarea
                    value={booking.message}
                    onChange={(e) => setBooking({ ...booking, message: e.target.value })}
                    placeholder="Message for your HOUSE agent (optional)"
                    rows={3}
                    className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none"
                  />
                  <Button type="submit" className="w-full" loading={bookingStatus === "loading"}>
                    Book HOUSE Viewing
                  </Button>
                  {bookingStatus === "error" && (
                    <p className="text-accent text-sm text-center">Booking failed. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
