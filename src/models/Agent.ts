import mongoose, { Schema, models, model } from "mongoose";

const AgentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    propertiesSold: { type: Number, default: 0 },
    rating: { type: Number, default: 5 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Agent = models.Agent || model("Agent", AgentSchema);
