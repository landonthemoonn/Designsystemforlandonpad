import { motion } from "motion/react";
import { useState } from "react";

interface FilterPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterPill({ label, active = false, onClick }: FilterPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-[18px] py-[9px] rounded-[20px] text-sm font-medium transition-all whitespace-nowrap ${
        active
          ? "bg-[#1A1A1A] text-white"
          : "bg-white text-[#1A1A1A] border-[1.5px] border-[#D0CEC5] hover:bg-[#F2F0E8]"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  );
}

interface FilterPillsProps {
  filters: string[];
  activeFilters?: string[];
  onFilterToggle?: (filter: string) => void;
}

export function FilterPills({ filters, activeFilters = [], onFilterToggle }: FilterPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {filters.map((filter) => (
        <FilterPill
          key={filter}
          label={filter}
          active={activeFilters.includes(filter)}
          onClick={() => onFilterToggle?.(filter)}
        />
      ))}
    </div>
  );
}
