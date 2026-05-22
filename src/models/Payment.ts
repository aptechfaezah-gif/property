import mongoose, { Schema, models, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    method: { type: String, default: "card" },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export const Payment = models.Payment || model("Payment", PaymentSchema);
