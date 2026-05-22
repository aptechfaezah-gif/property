"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  { size: 400, x: "10%", y: "20%", color: "rgba(124,58,237,0.12)", delay: 0 },
  { size: 300, x: "70%", y: "10%", color: "rgba(6,182,212,0.1)", delay: 1 },
  { size: 350, x: "80%", y: "60%", color: "rgba(244,63,94,0.06)", delay: 2 },
];

export default function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className="fixed inset-0 pointer-events-none z-0 gradient-bg opacity-40" aria-hidden />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 gpu-layer" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl gpu-layer"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            x: [0, 20, -12, 0],
            y: [0, -16, 10, 0],
          }}
          transition={{
            duration: 14 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30 gpu-layer"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
          }}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
