import { motion } from 'motion/react';

interface FilterPillsProps {
  filters: string[];
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export function FilterPills({ filters, activeFilters, onFilterToggle }: FilterPillsProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <style>{`.filter-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div className="filter-scroll flex gap-2">
        {filters.map(filter => {
          const isActive = activeFilters.includes(filter);
          return (
            <motion.button
              key={filter}
              onClick={() => onFilterToggle(filter)}
              className={`
                px-[18px] py-[9px] rounded-[24px] text-[13px] font-medium
                whitespace-nowrap transition-all
                ${isActive
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-[#1A1A1A] border border-[#D0CEC5] hover:bg-[#F2F0E8]'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={isActive}
            >
              {filter}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
