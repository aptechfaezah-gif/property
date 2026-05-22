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

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<SidebarView>("overview");
  const [activeSidebar, setActiveSidebar] = useState("Overview");
  const [clientName, setClientName] = useState("HOUSE Client");

  useEffect(() => {
    const user = getDemoUser();
    if (user?.name) setClientName(user.name);
  }, []);

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

  const sidebarLinks = [
    { icon: HiChartBar, label: "HOUSE Overview", view: "overview" as SidebarView },
    { icon: HiHome, label: "HOUSE Properties", href: "/properties" },
    { icon: HiClipboardList, label: "Client Bookings", view: "bookings" as SidebarView },
    { icon: HiCog, label: "Account", view: "overview" as SidebarView },
  ];

  const handleSidebarClick = (link: (typeof sidebarLinks)[0]) => {
    setActiveSidebar(link.label);
    if (link.href) {
      router.push(link.href);
      return;
    }
    if (link.view) {
      setActiveView(link.view);
      if (link.label === "Client Bookings") setBookingModalOpen(true);
    }
  };

  const getPropertyName = (propertyId: string) =>
    MOCK_PROPERTIES.find((p) => p._id === propertyId)?.title || propertyId;

  return (
    <div className="min-h-screen gradient-bg flex relative">
      <AnimatedBackground />

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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeSidebar === link.label
                  ? "text-white bg-primary/20 border border-primary/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon className="text-primary" />
              {link.label}
            </motion.button>
          ))}
        </nav>
        <button
          onClick={() => {
            clearDemoLogin();
            router.push("/login");
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-accent transition-all text-sm mt-auto"
        >
          <HiLogout />
          Logout
        </button>
      </aside>

      <main className="flex-1 lg:ml-64 p-6 sm:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-heading text-3xl font-bold">
              {activeView === "bookings" ? "HOUSE Client Bookings" : "HOUSE Dashboard"}
            </h1>
            <p className="text-white/50 mt-1">
              {activeView === "bookings"
                ? "Manage your HOUSE property viewing requests"
                : `Welcome, ${clientName} — your HOUSE client overview`}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setBookingModalOpen(true)}
            className="neon-btn px-5 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-2 self-start"
          >
            <HiPlus />
            New Booking
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeView === "overview" ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.08, type: "spring" }}
                    whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(124,58,237,0.2)" }}
                    className="glass rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-colors cursor-default"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <card.icon className={`${card.color} text-2xl mb-3`} />
                    </motion.div>
                    <p className="text-white/50 text-sm">{card.label}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-2xl p-6 hover:border-primary/20 transition-all"
                >
                  <h3 className="font-heading font-semibold mb-4">Monthly Sales</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                      <Tooltip
                        contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Bar dataKey="sales" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-6 hover:border-secondary/20 transition-all"
                >
                  <h3 className="font-heading font-semibold mb-4">Revenue Trend</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                      <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickFormatter={(v) => formatPriceShort(Number(v))} />
                      <Tooltip
                        contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                        formatter={(v) => [formatPrice(Number(v ?? 0)), "Revenue"]}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={2} dot={{ fill: "#06B6D4", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-8"
            >
              <p className="text-white/50 text-sm mb-4">
                HOUSE clients: click &quot;New Booking&quot; to schedule a property viewing with our team.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          className="glass rounded-2xl p-6 mt-8 border border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Recent HOUSE Client Bookings</h3>
            <span className="text-xs text-white/40">{bookings.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
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
                <AnimatePresence>
                  {bookings.map((b, i) => (
                    <motion.tr
                      key={b._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      layout
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 px-2 text-white">{b.name}</td>
                      <td className="py-3 px-2 text-white/60 text-xs max-w-[140px] truncate">
                        {getPropertyName(b.propertyId)}
                      </td>
                      <td className="py-3 px-2 text-white/60">{b.email}</td>
                      <td className="py-3 px-2 text-white/60">{formatDate(b.date)}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            b.status === "confirmed"
                              ? "bg-secondary/20 text-secondary"
                              : b.status === "pending"
                              ? "bg-primary/20 text-primary"
                              : "bg-accent/20 text-accent"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-white/10 flex justify-around p-2 z-30">
        {sidebarLinks.slice(0, 3).map((link) => (
          <button
            key={link.label}
            onClick={() => handleSidebarClick(link)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 text-xs ${
              activeSidebar === link.label ? "text-primary" : "text-white/50"
            }`}
          >
            <link.icon size={20} />
            {link.label}
          </button>
        ))}
      </div>

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
