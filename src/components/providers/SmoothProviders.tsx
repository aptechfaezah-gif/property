"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/** Lighter Framer bundle + site-wide smooth layer */
export default function SmoothProviders({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
