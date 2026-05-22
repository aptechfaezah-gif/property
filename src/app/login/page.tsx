"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { setDemoLogin } from "@/lib/client-auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in email and password");
      return;
    }

    setLoading(true);

    setDemoLogin({
      email: form.email.trim(),
      name: form.email.trim().split("@")[0] || "HOUSE Client",
    });

    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 w-full max-w-md"
    >
      <h1 className="font-heading text-2xl font-bold text-center">HOUSE Client Login</h1>
      <p className="text-white/50 text-sm text-center mt-2">
        Sign in to access your HOUSE client dashboard and bookings
      </p>

      {loggedIn ? (
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
          <p className="text-xl font-semibold text-white">You are logged in</p>
          <p className="text-white/50 text-sm mt-2">
            Welcome to HOUSE, {form.email.trim()}
          </p>
          <Link href={redirect} className="block mt-6">
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
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          {error && <p className="text-accent text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </form>
      )}

      {!loggedIn && (
        <p className="text-center text-white/50 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      )}
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
