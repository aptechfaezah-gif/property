"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiLocationMarker, HiStar } from "react-icons/hi";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { formatPrice } from "@/lib/utils";
import PropertyContactActions from "./PropertyContactActions";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  index?: number;
  basePath?: string;
  badge?: string;
}

export default function PropertyCard({
  property,
  index = 0,
  basePath = "/properties",
  badge,
}: PropertyCardProps) {
  const detailHref = `${basePath}/${property._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.article
        whileHover={{ scale: 1.02 }}
        className="property-card glass rounded-2xl overflow-hidden group animate-border-glow"
      >
        <div>
          <Link href={detailHref} className="block relative h-56 overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            {(badge || property.featured) && (
              <span className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/90 text-white text-xs font-medium">
                <HiStar className="text-yellow-300" />
                {badge || "Featured"}
              </span>
            )}
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-white text-xs capitalize">
              {property.type}
            </span>
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <p className="text-2xl font-bold text-white">{formatPrice(property.price)}</p>
            </div>
          </Link>
          <PropertyContactActions
            title={property.title}
            location={property.location}
            city={property.city}
            price={property.price}
          />
        </div>

        <Link href={detailHref} className="block p-5 cursor-pointer">
          <h3 className="font-heading text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 text-white/50 text-sm mt-1">
            <HiLocationMarker className="text-secondary flex-shrink-0" />
            {property.location}, {property.city}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1.5 text-white/60 text-sm">
              <FaBed className="text-primary" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm">
              <FaBath className="text-secondary" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm">
              <FaRulerCombined className="text-accent" />
              {property.area.toLocaleString()} sqft
            </span>
          </div>
        </Link>
      </motion.article>
    </motion.div>
  );
}
