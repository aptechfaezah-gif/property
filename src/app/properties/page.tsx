"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiSearch, HiAdjustments } from "react-icons/hi";
import PageWrapper from "@/components/layout/PageWrapper";
import PropertyCard from "@/components/properties/PropertyCard";
import Button from "@/components/ui/Button";
import type { Property } from "@/types";

const PROPERTY_TYPES = ["", "house", "apartment", "villa", "condo", "penthouse", "land"];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bedrooms", label: "Most Bedrooms" },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const bathrooms = searchParams.get("bathrooms") || "";
  const location = searchParams.get("location") || "";

  const [filters, setFilters] = useState({
    search,
    type,
    sort,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    location,
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "9",
      sort: filters.sort,
    });
    if (filters.search) params.set("search", filters.search);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);
    if (filters.location) params.set("location", filters.location);

    const res = await fetch(`/api/properties?${params}`);
    const data = await res.json();
    setProperties(data.properties || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
    setLoading(false);
  }, [page, filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    router.push(`/properties?${params}`);
  };

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/properties?${params}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-heading text-4xl sm:text-5xl font-bold">
          <span className="text-primary">HOUSE</span> Property Collection
        </h1>
        <p className="text-white/60 mt-2">{total} verified Karachi listings for HOUSE clients</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 flex gap-2 glass rounded-2xl p-2">
          <HiSearch className="text-white/40 ml-3 self-center" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            placeholder="Search HOUSE listings..."
            className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm py-2"
          />
          <Button onClick={applyFilters} size="sm">Search</Button>
        </div>
        <div className="flex gap-2">
          <select
            value={filters.sort}
            onChange={(e) => {
              setFilters({ ...filters, sort: e.target.value });
              setTimeout(applyFilters, 0);
            }}
            className="input-glass px-4 py-2 rounded-xl text-sm"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-background">
                {o.label}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <HiAdjustments />
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass rounded-2xl p-6 mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <div>
            <label className="text-xs text-white/50 mb-1 block">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            >
              <option value="" className="bg-background">All Types</option>
              {PROPERTY_TYPES.filter(Boolean).map((t) => (
                <option key={t} value={t} className="bg-background capitalize">{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              placeholder="Rs. 0"
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              placeholder="Any"
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Bedrooms</label>
            <input
              type="number"
              value={filters.bedrooms}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              placeholder="Any"
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Bathrooms</label>
            <input
              type="number"
              value={filters.bathrooms}
              onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
              placeholder="Any"
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 mb-1 block">Location</label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              placeholder="City"
              className="input-glass w-full px-3 py-2 rounded-lg text-sm"
            />
          </div>
          <div className="col-span-full flex justify-end">
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl h-80 animate-pulse" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-white/60 text-lg">No HOUSE listings match your search. Try another area in Karachi.</p>
          <Button className="mt-4" onClick={() => { setFilters({ search: "", type: "", sort: "newest", minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "", location: "" }); router.push("/properties"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, i) => (
            <PropertyCard key={property._id} property={property} index={i} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                p === page ? "neon-btn text-white" : "glass text-white/60 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <PageWrapper>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
        <PropertiesContent />
      </Suspense>
    </PageWrapper>
  );
}
