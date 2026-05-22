"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import PageWrapper from "@/components/layout/PageWrapper";
import LiveChat from "@/components/chat/LiveChat";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RevealOnScroll className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-secondary text-sm font-medium mb-4"
          >
            HOUSE Client Support
          </motion.span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold">
            Contact <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">HOUSE</span>
          </h1>
          <p className="text-white/60 mt-2 max-w-xl mx-auto">
            HOUSE clients can reach our team anytime — live chat, phone, or message. We help you find and book your dream home in Karachi.
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-10">
          <RevealOnScroll direction="left">
            <motion.form
              whileHover={{ boxShadow: "0 0 40px rgba(124,58,237,0.15)" }}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-5 border border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              <h2 className="font-heading text-xl font-semibold">Message the HOUSE Team</h2>
              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-8 text-center"
                >
                  <p className="text-secondary text-lg font-medium">Message Sent!</p>
                  <p className="text-white/50 text-sm mt-2">A HOUSE client advisor will respond within 24 hours.</p>
                  <Button className="mt-4" onClick={() => setStatus("idle")}>Send Another</Button>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  <div>
                    <label className="text-sm text-white/70 font-medium mb-1.5 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      required
                      className="input-glass w-full px-4 py-3 rounded-xl text-sm resize-none"
                      placeholder="How can HOUSE help you find a home?"
                    />
                  </div>
                  <Button type="submit" className="w-full" loading={status === "loading"}>
                    Send Message
                  </Button>
                </>
              )}
            </motion.form>
          </RevealOnScroll>

          <RevealOnScroll direction="right" delay={0.15} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 space-y-4 border border-white/5 hover:border-secondary/30 transition-all duration-300"
            >
              <h2 className="font-heading text-xl font-semibold">HOUSE Karachi Office</h2>
              {[
                { icon: HiLocationMarker, text: "Plot 42, Block 4, Clifton, Karachi 75600" },
                { icon: HiPhone, text: "+92 21 111-HOUSE" },
                { icon: HiMail, text: "hello@house.com" },
              ].map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-white/60 text-sm"
                >
                  <Icon className="text-primary text-xl flex-shrink-0" />
                  {text}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent"
            >
              <h3 className="font-heading font-semibold mb-2">Live Chat</h3>
              <p className="text-white/50 text-sm mb-4">
                HOUSE clients: use live chat for instant answers on listings, PKR prices, and booking viewings.
              </p>
              <p className="text-secondary text-xs">Available 24/7 • English</p>
            </motion.div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/50 hover:text-primary transition-colors"
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl overflow-hidden h-56"
            >
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=Clifton+Karachi&z=14&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>

      <LiveChat />
    </PageWrapper>
  );
}
