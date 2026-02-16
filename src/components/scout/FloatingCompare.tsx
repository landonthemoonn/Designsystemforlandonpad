import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface FloatingCompareProps {
  count: number;
  show: boolean;
  onClick: () => void;
}

export function FloatingCompare({ count, show, onClick }: FloatingCompareProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-40
                     bg-[#1A1A1A] text-white px-8 py-4 rounded-[24px]
                     flex items-center gap-3
                     shadow-[0_12px_32px_rgba(26,26,26,0.4)]
                     hover:bg-[#2D2D2F] transition-colors"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-[15px] font-semibold">
            Compare {count} saved apartment{count !== 1 ? 's' : ''}
          </span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
