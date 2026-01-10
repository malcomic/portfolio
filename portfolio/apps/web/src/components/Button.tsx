import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ComponentProps<typeof motion.button>> & {
  variant?: "primary" | "ghost";
} & ComponentProps<typeof motion.button>;

export function Button({ className, variant = "primary", children, onClick, disabled, type, ...rest }: Props) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        variant === "primary" &&
          "bg-accent text-black shadow-glow hover:brightness-110 active:brightness-95 disabled:opacity-60",
        variant === "ghost" &&
          "border border-white/10 bg-white/5 text-text hover:bg-white/10 disabled:opacity-60",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}


