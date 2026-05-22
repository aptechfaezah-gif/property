"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  HiHome,
  HiCurrencyDollar,
  HiUsers,
  HiUserGroup,
  HiChartBar,
  HiClipboardList,
  HiCog,
  HiLogout,
  HiPlus,
  HiMenuAlt3,
  HiX,
} from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice, formatPriceShort, formatDate } from "@/lib/utils";
import { clearDemoLogin, getDemoUser } from "@/lib/client-auth";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import BookingModal from "@/components/dashboard/BookingModal";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import type { Booking } from "@/types";

const initialBookings: Booking[] = [
  { _id: "b1", propertyId: "1", userId: "u1", name: "Michael Torres", email: "michael@email.com", phone: "+1 555-0101", date: "2025-05-10", status: "confirmed", createdAt: "2025-04-28" },
  { _id: "b2", propertyId: "2", userId: "u2", name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 555-0102", date: "2025-05-15", status: "pending", createdAt: "2025-05-01" },
];

const salesData = [
  { month: "Jan", sales: 12 },
  { month: "Feb", sales: 18 },
  { month: "Mar", sales: 15 },
  { month: "Apr", sales: 22 },
  { month: "May", sales: 19 },
  { month: "Jun", sales: 25 },
];

const revenueData = [
  { month: "Jan", revenue: 1176000000 },
  { month: "Feb", revenue: 1904000000 },
  { month: "Mar", revenue: 1512000000 },
  { month: "Apr", revenue: 2492000000 },
  { month: "May", revenue: 2016000000 },
  { month: "Jun", revenue: 2940000000 },
];

type SidebarView = "overview" | "bookings";

const sidebarLinks = [
  { icon: HiChartBar, label: "HOUSE Overview", shortLabel: "Overview", view: "overview" as SidebarView },
  { icon: HiHome, label: "HOUSE Properties", shortLabel: "Properties", href: "/properties" },
  { icon: HiClipboardList, label: "Client Bookings", shortLabel: "Bookings", view: "bookings" as SidebarView },
  { icon: HiCog, label: "Account", shortLabel: "Account", view: "overview" as SidebarView },
];

function BookingStatusBadge({ status }: { status: Booking["status"] }) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
        status === "confirmed"
          ? "bg-secondary/20 text-secondary"
          : status === "pending"
          ? "bg-primary/20 text-primary"
          : "bg-accent/20 text-accent"
      }`}
    >
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<SidebarView>("overview");
  const [activeSidebar, setActiveSidebar] = useState("HOUSE Overview");
  const [clientName, setClientName] = useState("HOUSE Client");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = getDemoUser();
    if (user?.name) setClientName(user.name);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const stats = {
    totalProperties: MOCK_PROPERTIES.length,
    totalRevenue: 12040000000,
    totalCustomers: 1248 + bookings.length,
    activeAgents: 3,
  };

  const cards = [
    { icon: HiHome, label: "HOUSE Listings", value: stats.totalProperties, color: "text-primary" },
    { icon: HiCurrencyDollar, label: "Client Sales (PKR)", value: formatPrice(stats.totalRevenue), color: "text-secondary" },
    { icon: HiUsers, label: "HOUSE Clients", value: stats.totalCustomers.toLocaleString(), color: "text-accent" },
    { icon: HiUserGroup, label: "HOUSE Agents", value: stats.activeAgents, color: "text-primary" },
  ];

  const handleSidebarClick = (link: (typeof sidebarLinks)[0]) => {
    setActiveSidebar(link.label);
    setMobileMenuOpen(false);
    if (link.href) {
      router.push(link.href);
      return;
    }
    if (link.view) {
      setActiveView(link.view);
      if (link.label === "Client Bookings") setBookingModalOpen(true);
    }
  };

  const handleLogout = () => {
    clearDemoLogin();
    router.push("/login");
  };

  const getPropertyName = (propertyId: string) =>
    MOCK_PROPERTIES.find((p) => p._id === propertyId)?.title || propertyId;

  const navButtonClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
      active
        ? "text-white bg-primary/20 border border-primary/30"
        : "text-white/60 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="min-h-screen min-h-[100dvh] gradient-bg flex relative scroll-smooth">
      <AnimatedBackground />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 glass-strong border-r border-white/10 p-6 fixed h-full z-20">
        <Link href="/" className="text-2xl font-bold font-[family-name:var(--font-poppins)] mb-10">
          <span className="text-primary">H</span>OUSE
        </Link>
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => (
            <motion.button
              key={link.label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSidebarClick(link)}
              className={navButtonClass(activeSidebar === link.label)}
            >
              <link.icon className="text-primary flex-shrink-0" />
              {link.label}
            </motion.button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-accent transition-all text-sm mt-auto"
        >
          <HiLogout />
          Logout
        </button>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-strong border-b border-white/10 safe-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="text-xl font-bold font-[family-name:var(--font-poppins)]">
            <span className="text-primary">H</span>OUSE
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10"
            aria-label="Open menu"
          >
            <HiMenuAlt3 size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[min(100%,20rem)] glass-strong border-l border-white/10 p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-heading text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white"
                  aria-label="Close menu"
                >
                  <HiX size={22} />
                </button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleSidebarClick(link)}
                    className={navButtonClass(activeSidebar === link.label)}
                  >
                    <link.icon className="text-primary flex-shrink-0" />
                    {link.label}
                  </button>
                ))}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5"
                >
                  <HiHome className="text-primary" />
                  Back to Home
                </Link>
              </nav>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-accent border border-accent/30 mt-4"
              >
                <HiLogout />
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full min-w-0 lg:ml-64 pt-16 pb-24 lg:pt-0 lg:pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight">
              {activeView === "bookings" ? "Client Bookings" : "HOUSE Dashboard"}
            </h1>
            <p className="text-white/50 mt-1 text-sm sm:text-base line-clamp-2">
              {activeView === "bookings"
                ? "Manage your property viewing requests"
                : `Welcome, ${clientName}`}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setBookingModalOpen(true)}
            className="neon-btn w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 shrink-0"
          >
            <HiPlus />
            New Booking
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "overview" ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass rounded-2xl p-4 sm:p-6 border border-white/5"
                  >
                    <card.icon className={`${card.color} text-xl sm:text-2xl mb-2 sm:mb-3`} />
                    <p className="text-white/50 text-xs sm:text-sm">{card.label}</p>
                    <p className="text-lg sm:text-2xl font-bold mt-1 break-words">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="glass rounded-2xl p-4 sm:p-6 min-w-0">
                  <h3 className="font-heading font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Monthly Sales</h3>
                  <div className="w-full h-[200px] sm:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickMargin={8} />
                        <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} width={28} />
                        <Tooltip
                          contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                          labelStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="sales" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass rounded-2xl p-4 sm:p-6 min-w-0">
                  <h3 className="font-heading font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Revenue Trend</h3>
                  <div className="w-full h-[200px] sm:h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} tickMargin={8} />
                        <YAxis
                          stroke="rgba(255,255,255,0.4)"
                          fontSize={10}
                          width={44}
                          tickFormatter={(v) => formatPriceShort(Number(v))}
                        />
                        <Tooltip
                          contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", fontSize: "12px" }}
                          formatter={(v) => [formatPrice(Number(v ?? 0)), "Revenue"]}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2} dot={{ fill: "#06B6D4", r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mt-6 sm:mt-8"
            >
              <p className="text-white/50 text-sm">
                Tap &quot;New Booking&quot; to schedule a property viewing with HOUSE.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div layout className="glass rounded-2xl p-4 sm:p-6 mt-6 sm:mt-8 border border-white/5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h3 className="font-heading font-semibold text-sm sm:text-base">Recent Bookings</h3>
            <span className="text-xs text-white/40 shrink-0">{bookings.length} total</span>
          </div>

          {/* Mobile: booking cards */}
          <div className="md:hidden space-y-3">
            {bookings.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-6">No bookings yet</p>
            ) : (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-white">{b.name}</p>
                    <BookingStatusBadge status={b.status} />
                  </div>
                  <p className="text-white/60 text-xs line-clamp-2">{getPropertyName(b.propertyId)}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                    <span>{b.email}</span>
                    <span>{formatDate(b.date)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-white/40 border-b border-white/10">
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Property</th>
                  <th className="text-left py-3 px-2">Email</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-2 text-white">{b.name}</td>
                    <td className="py-3 px-2 text-white/60 text-xs max-w-[180px] truncate">
                      {getPropertyName(b.propertyId)}
                    </td>
                    <td className="py-3 px-2 text-white/60">{b.email}</td>
                    <td className="py-3 px-2 text-white/60 whitespace-nowrap">{formatDate(b.date)}</td>
                    <td className="py-3 px-2">
                      <BookingStatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-white/10 safe-bottom"
        aria-label="Dashboard navigation"
      >
        <div className="grid grid-cols-4 gap-1 px-2 pt-2 pb-2">
          {sidebarLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleSidebarClick(link)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-xl min-h-[52px] transition-colors ${
                activeSidebar === link.label
                  ? "text-primary bg-primary/15"
                  : "text-white/50 active:bg-white/10"
              }`}
            >
              <link.icon size={22} className="flex-shrink-0" />
              <span className="text-[10px] sm:text-xs leading-tight text-center">{link.shortLabel}</span>
            </button>
          ))}
        </div>
      </nav>

      <BookingModal
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onBookingCreated={(booking) => {
          setBookings((prev) => [booking, ...prev]);
          setActiveView("bookings");
          setActiveSidebar("Client Bookings");
        }}
      />
    </div>
  );
}
