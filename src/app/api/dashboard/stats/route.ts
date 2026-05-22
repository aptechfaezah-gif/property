import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { Property } from "@/models/Property";
import { Booking } from "@/models/Booking";
import { Agent } from "@/models/Agent";
import { User } from "@/models/User";
import { MOCK_BOOKINGS, MOCK_PROPERTIES } from "@/lib/mock-data";

const SALES_DATA = [
  { month: "Jan", sales: 12, revenue: 1176000000 },
  { month: "Feb", sales: 18, revenue: 1904000000 },
  { month: "Mar", sales: 15, revenue: 1512000000 },
  { month: "Apr", sales: 22, revenue: 2492000000 },
  { month: "May", sales: 19, revenue: 2016000000 },
  { month: "Jun", sales: 25, revenue: 2940000000 },
];

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !["admin", "agent"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();

    if (!db) {
      return NextResponse.json({
        totalProperties: MOCK_PROPERTIES.length,
        totalRevenue: 12040000000,
        totalCustomers: 1248,
        activeAgents: 3,
        recentBookings: MOCK_BOOKINGS,
        salesData: SALES_DATA.map((d) => ({ month: d.month, sales: d.sales })),
        revenueData: SALES_DATA.map((d) => ({ month: d.month, revenue: d.revenue })),
      });
    }

    const [totalProperties, totalCustomers, activeAgents, recentBookings] =
      await Promise.all([
        Property.countDocuments(),
        User.countDocuments({ role: "user" }),
        Agent.countDocuments(),
        Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    const payments = await import("@/models/Payment").then((m) =>
      m.Payment.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
    );

    const totalRevenue = payments[0]?.total || 0;

    return NextResponse.json({
      totalProperties,
      totalRevenue,
      totalCustomers,
      activeAgents,
      recentBookings: recentBookings.map((b) => ({
        ...b,
        _id: b._id.toString(),
      })),
      salesData: SALES_DATA.map((d) => ({ month: d.month, sales: d.sales })),
      revenueData: SALES_DATA.map((d) => ({ month: d.month, revenue: d.revenue })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
