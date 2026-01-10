import { motion } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  type?: "work" | "education";
  delay?: number;
}

export function TimelineItem({ title, subtitle, type = "work", delay = 0 }: TimelineItemProps) {
  const Icon = type === "education" ? HiAcademicCap : HiBriefcase;
  
  return (
    <motion.div
      className="relative flex gap-4 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative flex flex-col items-center">
        <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-accent bg-bg">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="w-[2px] flex-1 bg-gradient-to-b from-accent to-accent/20" />
      </div>
      
      <div className="flex-1 pt-1">
        <div className="text-sm font-bold text-text">{title}</div>
        <div className="mt-1 text-sm text-muted">{subtitle}</div>
      </div>
    </motion.div>
  );
}

interface TimelineProps {
  items: Array<{ title?: string; subtitle?: string }>;
  type?: "work" | "education";
}

export function Timeline({ items, type = "work" }: TimelineProps) {
  return (
    <div className="relative">
      {items.map((item, idx) => (
        <TimelineItem
          key={idx}
          title={item.title || "Title"}
          subtitle={item.subtitle || "Subtitle"}
          type={type}
          delay={idx * 0.1}
        />
      ))}
    </div>
  );
}

