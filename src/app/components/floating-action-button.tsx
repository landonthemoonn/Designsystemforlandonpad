import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  label: string;
  count?: number;
  show?: boolean;
}

export function FloatingActionButton({ onClick, label, count, show = true }: FloatingActionButtonProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#00D4AA] text-[#050d1f] px-8 py-4 rounded-[24px] flex items-center gap-3 glow-teal hover:bg-[#00c49a]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-[15px] font-semibold">
            {label}
            {count !== undefined && count > 0 && ` (${count})`}
          </span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
