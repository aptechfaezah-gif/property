"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedBackground from "@/components/animations/AnimatedBackground";
import PageTransition from "@/components/animations/PageTransition";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gradient-bg flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-20 relative z-10 scroll-smooth">
        <PageTransition>{children}</PageTransition>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
