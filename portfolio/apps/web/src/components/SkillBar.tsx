import { motion } from "framer-motion";

interface SkillBarProps {
  label: string;
  percentage?: number;
  delay?: number;
}

export function SkillBar({ label, percentage = 85, delay = 0 }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-text">{label}</span>
        <span className="text-muted">{percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

