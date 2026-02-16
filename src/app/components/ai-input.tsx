import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AIInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const suggestionChips = [
  "Pet-friendly with a yard",
  "Near subway stations",
  "Washer/dryer in unit",
  "Natural light",
  "Quiet neighborhood",
];

export function AIInput({ onSearch, placeholder = "Tell me what you're looking for..." }: AIInputProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    onSearch?.(chip);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`bg-white rounded-[20px] border transition-all duration-300 ${
            isFocused
              ? "border-[#00D4AA] shadow-[0_4px_16px_rgba(0,212,170,0.15)]"
              : "border-[#D0CEC5]"
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-[18px]">
            <Sparkles className={`w-5 h-5 flex-shrink-0 transition-colors ${isFocused ? 'text-[#00D4AA]' : 'text-[#8A8A85]'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-[#1A1A1A] placeholder:text-[#8A8A85]"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {suggestionChips.map((chip, index) => (
          <motion.button
            key={index}
            onClick={() => handleChipClick(chip)}
            className="bg-[#F2F0E8] hover:bg-[#E8E6DD] rounded-2xl px-[14px] py-[7px] text-sm font-medium text-[#1A1A1A] transition-colors"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {chip}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
