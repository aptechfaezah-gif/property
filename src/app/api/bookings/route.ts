import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { Booking } from "@/models/Booking";
import { MOCK_BOOKINGS } from "@/lib/mock-data";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !["admin", "agent"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ bookings: MOCK_BOOKINGS });
    }

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({
      bookings: bookings.map((b) => ({ ...b, _id: b._id.toString() })),
    });
  } catch (error) {
    console.error("Bookings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, name, email, phone, date, message } = body;

    if (!propertyId || !name || !email || !phone || !date) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const session = await getSession();
    const db = await connectDB();

    if (!db) {
      const booking = {
        _id: `b${Date.now()}`,
        propertyId,
        userId: session?.userId || "guest",
        name,
        email,
        phone,
        date,
        message,
        status: "pending" as const,
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ booking, message: "Booking submitted (demo mode)" }, { status: 201 });
    }

    const booking = await Booking.create({
      propertyId,
      userId: session?.userId,
      name,
      email,
      phone,
      date: new Date(date),
      message,
    });

    return NextResponse.json(
      { booking: { ...booking.toObject(), _id: booking._id.toString() } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bookings POST error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
