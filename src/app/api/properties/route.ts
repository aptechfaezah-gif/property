import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import { Property } from "@/models/Property";
import { MOCK_PROPERTIES } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const search = searchParams.get("search") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const featured = searchParams.get("featured");
    const sort = searchParams.get("sort") || "newest";

    const db = await connectDB();

    if (!db) {
      let filtered = [...MOCK_PROPERTIES];

      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q)
        );
      }
      if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      if (bedrooms) filtered = filtered.filter((p) => p.bedrooms >= Number(bedrooms));
      if (bathrooms) filtered = filtered.filter((p) => p.bathrooms >= Number(bathrooms));
      if (type) filtered = filtered.filter((p) => p.type === type);
      if (location) filtered = filtered.filter((p) => p.city.toLowerCase().includes(location.toLowerCase()));
      if (featured === "true") filtered = filtered.filter((p) => p.featured);

      if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
      else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
      else if (sort === "bedrooms") filtered.sort((a, b) => b.bedrooms - a.bedrooms);

      const total = filtered.length;
      const start = (page - 1) * limit;
      const properties = filtered.slice(start, start + limit);

      return NextResponse.json({ properties, total, page, totalPages: Math.ceil(total / limit) });
    }

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) (query.price as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice) (query.price as Record<string, number>).$lte = Number(maxPrice);
    }
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };
    if (type) query.type = type;
    if (location) query.city = { $regex: location, $options: "i" };
    if (featured === "true") query.featured = true;

    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "price-asc") sortQuery = { price: 1 };
    else if (sort === "price-desc") sortQuery = { price: -1 };
    else if (sort === "bedrooms") sortQuery = { bedrooms: -1 };

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      properties: properties.map((p) => ({ ...p, _id: p._id.toString() })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Properties GET error:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !["admin", "agent"].includes(session.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await req.json();
    const property = await Property.create(body);

    return NextResponse.json(
      { property: { ...property.toObject(), _id: property._id.toString() } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Properties POST error:", error);
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
  }
}
