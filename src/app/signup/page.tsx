"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createDemoAccount } from "@/lib/client-auth";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirm.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    createDemoAccount(form.name, form.email, form.password);

    setTimeout(() => {
      setLoading(false);
      setAccountCreated(true);
    }, 500);
  };

  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 w-full max-w-md"
        >
          <h1 className="font-heading text-2xl font-bold text-center">
            Join HOUSE
          </h1>
          <p className="text-white/50 text-sm text-center mt-2">
            Create your HOUSE client account — browse, book, and manage Karachi luxury homes
          </p>

          {accountCreated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto rounded-full bg-secondary/20 flex items-center justify-center mb-4"
              >
                <HiCheckCircle className="text-secondary text-4xl" />
              </motion.div>
              <p className="text-xl font-semibold text-white">Account created successfully</p>
              <p className="text-secondary text-sm font-medium mt-2">You are logged in</p>
              <p className="text-white/50 text-sm mt-2">
                Welcome to HOUSE, {form.name.trim()}
              </p>
              <p className="text-white/40 text-xs mt-1">{form.email.trim()}</p>
              <Link href="/dashboard" className="block mt-6">
                <Button className="w-full">Go to Dashboard</Button>
              </Link>
              <Link
                href="/properties"
                className="block mt-3 text-sm text-primary hover:underline"
              >
                Browse HOUSE Properties
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
              />
              <Input
                label="Email"
                type="text"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                required
              />
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="••••••••"
                required
              />
              {error && <p className="text-accent text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full" loading={loading}>
                Create Account
              </Button>
            </form>
          )}

          {!accountCreated && (
            <p className="text-center text-white/50 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
