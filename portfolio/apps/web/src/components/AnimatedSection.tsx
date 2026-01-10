import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
}

export function AnimatedSection({ children, delay = 0, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  delay = 0, 
  direction = "left",
  ...props 
}: AnimatedSectionProps & { direction?: "left" | "right" | "up" | "down" }) {
  const variants = {
    left: { x: -40, opacity: 0 },
    right: { x: 40, opacity: 0 },
    up: { y: -40, opacity: 0 },
    down: { y: 40, opacity: 0 },
  };

  return (
    <motion.div
      initial={variants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({ children, ...props }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

