import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={cn("rounded-xl border border-white/10 bg-panel/70 p-5 shadow-glow backdrop-blur transition-all", className)}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2 }
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}


