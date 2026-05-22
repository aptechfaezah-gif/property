"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageWrapper>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 w-full max-w-md text-center"
        >
          <h1 className="font-heading text-2xl font-bold">HOUSE Password Reset</h1>
          <p className="text-white/50 text-sm mt-2">For HOUSE client accounts only</p>
          {sent ? (
            <div className="mt-6">
              <p className="text-secondary">Check your email!</p>
              <p className="text-white/50 text-sm mt-2">
                If a HOUSE client account exists for {email}, you&apos;ll receive reset instructions.
              </p>
              <Link href="/login" className="text-primary text-sm mt-4 inline-block hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">Send Reset Link</Button>
              <p className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline">Back to Login</Link>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
