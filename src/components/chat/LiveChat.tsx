"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChat, HiX, HiPaperAirplane } from "react-icons/hi";
import { getBotReply, WELCOME_MESSAGE, type ChatMessage } from "@/lib/chat-bot";

const QUICK_REPLIES = [
  "Show properties",
  "How to book?",
  "Price range in PKR",
  "Clifton listings",
];

interface LiveChatProps {
  defaultOpen?: boolean;
}

export default function LiveChat({ defaultOpen = false }: LiveChatProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: getBotReply(text),
        time: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] max-h-[70vh] z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-primary/40"
            style={{ background: "#0c1222" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 bg-gradient-to-r from-[#5b21b6] to-[#0e7490]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative border border-white/30">
                  <HiChat className="text-white text-lg" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0c1222]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">HOUSE Assistant</p>
                  <p className="text-xs text-white/90">Online • Karachi Real Estate</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors"
                aria-label="Close chat"
              >
                <HiX size={20} />
              </button>
            </div>

            {/* Messages — dark readable background */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ background: "#111827" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#6d28d9] to-[#0891b2] text-white font-medium rounded-br-sm shadow-lg"
                        : "bg-[#1e293b] text-white border border-white/15 rounded-bl-sm shadow-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1e293b] border border-white/15 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-[#a78bfa] rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div
              className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide border-t border-white/10"
              style={{ background: "#0c1222" }}
            >
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs bg-[#1e293b] border border-primary/40 text-white hover:bg-primary/30 transition-all whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3 border-t border-white/15 flex gap-2"
              style={{ background: "#0c1222" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-white/50 border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                style={{ background: "#1e293b" }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 neon-btn rounded-xl flex items-center justify-center flex-shrink-0"
                disabled={!input.trim()}
              >
                <HiPaperAirplane className="text-white -rotate-45" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 ${
          open ? "bg-[#1e293b] border-2 border-primary" : "neon-btn"
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <HiX className="text-white text-2xl" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <HiChat className="text-white text-2xl" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
        )}
      </motion.button>
    </>
  );
}
