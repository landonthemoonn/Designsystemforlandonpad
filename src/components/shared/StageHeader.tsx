import { motion } from 'motion/react';

interface StageHeaderProps {
  title: string;
  subtitle?: string;
}

export function StageHeader({ title, subtitle }: StageHeaderProps) {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1
        className="text-[52px] font-bold text-[#1A1A1A] mb-2"
        style={{ letterSpacing: '-1px' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-[17px] text-[#8A8A85]">{subtitle}</p>
      )}
    </motion.div>
  );
}
