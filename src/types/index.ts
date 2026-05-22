export type UserRole = "user" | "agent" | "admin";

export type PropertyType =
  | "house"
  | "apartment"
  | "villa"
  | "condo"
  | "penthouse"
  | "land";

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: PropertyType;
  location: string;
  city: string;
  images: string[];
  amenities: string[];
  featured: boolean;
  status: "available" | "sold" | "pending";
  agentId?: string;
  videoUrl?: string;
  coordinates?: { lat: number; lng: number };
  createdAt: string;
}

export interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  propertiesSold: number;
  rating: number;
}

export interface Booking {
  _id: string;
  propertyId: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalRevenue: number;
  totalCustomers: number;
  activeAgents: number;
  recentBookings: Booking[];
  salesData: { month: string; sales: number }[];
  revenueData: { month: string; revenue: number }[];
}
