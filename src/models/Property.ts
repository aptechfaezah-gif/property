import mongoose, { Schema, models, model } from "mongoose";

const PropertySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    type: {
      type: String,
      enum: ["house", "apartment", "villa", "condo", "penthouse", "land"],
      required: true,
    },
    location: { type: String, required: true },
    city: { type: String, required: true },
    images: [{ type: String }],
    amenities: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    agentId: { type: Schema.Types.ObjectId, ref: "Agent" },
    videoUrl: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export const Property = models.Property || model("Property", PropertySchema);
