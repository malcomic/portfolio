import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export function SiteLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-dvh bg-bg">
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent" />
      </div>

      <div className="relative">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}


