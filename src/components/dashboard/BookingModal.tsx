"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiCheck } from "react-icons/hi";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MOCK_PROPERTIES } from "@/lib/mock-data";
import type { Booking } from "@/types";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onBookingCreated: (booking: Booking) => void;
}

export default function BookingModal({ open, onClose, onBookingCreated }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyId: MOCK_PROPERTIES[0]._id,
    date: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const property = MOCK_PROPERTIES.find((p) => p._id === form.propertyId);

    const booking: Booking = {
      _id: `local-${Date.now()}`,
      propertyId: form.propertyId,
      userId: "guest",
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      message: form.message
        ? `${form.message}${property ? ` — ${property.title}` : ""}`
        : property?.title,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    onBookingCreated(booking);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setForm({
        name: "",
        email: "",
        phone: "",
        propertyId: MOCK_PROPERTIES[0]._id,
        date: "",
        message: "",
      });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glass-strong rounded-2xl w-full max-w-lg p-6 sm:p-8 pointer-events-auto border border-primary/20 shadow-2xl shadow-primary/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold">
                    HOUSE Client Booking
                  </h2>
                  <p className="text-white/50 text-sm mt-0.5">Schedule a HOUSE property viewing in Karachi</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 transition-colors"
                >
                  <HiX size={22} />
                </button>
              </div>

              {success ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4"
                  >
                    <HiCheck className="text-secondary text-3xl" />
                  </motion.div>
                  <p className="text-lg font-semibold text-secondary">HOUSE Booking Confirmed!</p>
                  <p className="text-white/50 text-sm mt-2">
                    Your viewing request is now on your HOUSE client list.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <div>
                    <label className="text-sm text-white/70 font-medium mb-1.5 block">
                      Property
                    </label>
                    <select
                      value={form.propertyId}
                      onChange={(e) => setForm({ ...form, propertyId: e.target.value })}
                      className="input-glass w-full px-4 py-3 rounded-xl text-sm"
                      required
                    >
                      {MOCK_PROPERTIES.map((p) => (
                        <option key={p._id} value={p._id} className="bg-background">
                          {p.title} — {p.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                  <div>
                    <label className="text-sm text-white/70 font-medium mb-1.5 block">
                      Message (optional)
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      placeholder="Any special request?"
                      className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Confirm Booking
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
