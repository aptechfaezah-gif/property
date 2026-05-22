/**
 * Run with: npx tsx src/scripts/seed.ts
 * Requires MONGODB_URI in .env.local
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/house";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  type: String,
  location: String,
  city: String,
  images: [String],
  amenities: [String],
  featured: Boolean,
  status: String,
  coordinates: { lat: Number, lng: Number },
});

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);

  await User.deleteMany({});
  await Property.deleteMany({});

  const adminPassword = await bcrypt.hash("admin123", 12);
  await User.create([
    { name: "Admin User", email: "admin@house.com", password: adminPassword, role: "admin" },
    { name: "Agent Sarah", email: "agent@house.com", password: adminPassword, role: "agent" },
    { name: "John Doe", email: "user@house.com", password: adminPassword, role: "user" },
  ]);

  await Property.insertMany([
    {
      title: "Skyline Penthouse",
      description: "Luxury Clifton penthouse with sea views.",
      price: 686000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      type: "penthouse",
      location: "Clifton Block 4",
      city: "Karachi",
      images: ["/properties/house1.png"],
      amenities: ["Pool", "Gym", "Concierge", "Smart Home"],
      featured: true,
      status: "available",
      coordinates: { lat: 24.8138, lng: 67.0299 },
    },
    {
      title: "Clifton Sea View Villa",
      description: "Premium villa in DHA Phase 8.",
      price: 1064000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      type: "villa",
      location: "DHA Phase 8",
      city: "Karachi",
      images: ["/properties/house2.png"],
      amenities: ["Private Garden", "Infinity Pool", "Wine Cellar"],
      featured: true,
      status: "available",
      coordinates: { lat: 24.7742, lng: 67.0581 },
    },
    {
      title: "Modern Glass Apartment",
      description: "Smart apartment in Bahria Town Karachi.",
      price: 249200000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      type: "apartment",
      location: "Bahria Town Karachi",
      city: "Karachi",
      images: ["/properties/house3.png"],
      amenities: ["Smart Home", "Gym", "Parking"],
      featured: true,
      status: "available",
      coordinates: { lat: 25.0122, lng: 67.3105 },
    },
  ]);

  console.log("Seed complete!");
  console.log("Login: admin@house.com / admin123");
  await mongoose.disconnect();
}

seed().catch(console.error);
