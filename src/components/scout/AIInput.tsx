import { motion } from 'motion/react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { suggestionChips } from '../../utils/mockData';

interface AIInputProps {
  placeholder?: string;
  onSubmit: (query: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

export function AIInput({
  placeholder = "Tell me what you're looking for...",
  onSubmit,
  onSuggestionClick,
}: AIInputProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  const handleChipClick = (chip: string) => {
    setQuery(chip);
    onSuggestionClick?.(chip);
    onSubmit(chip);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div
          className={`
            bg-white rounded-[20px] border transition-all duration-300
            ${isFocused
              ? 'border-[#00D4AA] shadow-[0_4px_16px_rgba(0,212,170,0.15)]'
              : 'border-[#D0CEC5]'
            }
          `}
        >
          <div className="flex items-center gap-3 px-5 py-[18px]">
            <Sparkles
              className={`w-5 h-5 flex-shrink-0 transition-colors ${
                isFocused ? 'text-[#00D4AA]' : 'text-[#8A8A85]'
              }`}
            />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-[15px] text-[#1A1A1A]
                         placeholder:text-[#8A8A85]"
              style={{ fontSize: '16px' }}
              aria-label="Search apartments with AI"
            />
            {query.trim() && (
              <motion.button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#00D4AA] flex items-center justify-center
                           text-white flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {suggestionChips.map((chip, i) => (
          <motion.button
            key={chip}
            onClick={() => handleChipClick(chip)}
            className="bg-[#F2F0E8] hover:bg-[#E8E6DD] rounded-[24px] px-[14px] py-[7px]
                       text-[13px] font-medium text-[#1A1A1A] transition-colors"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            {chip}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
