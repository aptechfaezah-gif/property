import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOUSE Client Dashboard",
  description: "HOUSE client dashboard — bookings, listings and insights for Karachi luxury homes",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
