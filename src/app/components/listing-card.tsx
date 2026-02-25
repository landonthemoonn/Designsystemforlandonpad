import { motion } from "motion/react";
import { Heart, Bed, Bath, Maximize } from "lucide-react";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  price: number;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl?: string;
  badge?: {
    text: string;
    color: "teal" | "amber" | "coral";
  };
  aiInsight?: string;
  saved?: boolean;
  onSave?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function ListingCard({
  id,
  price,
  address,
  neighborhood,
  beds,
  baths,
  sqft,
  imageUrl,
  badge,
  aiInsight,
  saved = false,
  onSave,
  onClick,
}: ListingCardProps) {
  const [isSaved, setIsSaved] = useState(saved);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave?.(id);
  };

  const badgeColors = {
    teal: "bg-[#00D4AA]/80 text-white",
    amber: "bg-[#FFC107]/80 text-[#1A1A1A]",
    coral: "bg-[#FF6B6B]/80 text-white",
  };

  return (
    <motion.div
      className="glass rounded-[20px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(id)}
      whileHover={{
        y: -6,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.18)",
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Image Area */}
      <div className="relative h-60">
        {imageUrl ? (
          <img src={imageUrl} alt={address} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0d1b3e] to-[#150d2e]" />
        )}

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl text-sm font-medium backdrop-blur-sm ${
              badgeColors[badge.color]
            }`}
          >
            {badge.text}
          </div>
        )}

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          className="absolute top-4 right-4 w-[38px] h-[38px] rounded-full glass flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isSaved ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={`w-5 h-5 ${isSaved ? "fill-[#FF6B6B] stroke-[#FF6B6B]" : "stroke-white/80"}`}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-[22px]">
        <div className="text-[30px] font-bold text-white/90 mb-1.5" style={{ letterSpacing: '-0.5px' }}>
          ${price.toLocaleString()}
        </div>

        <div className="text-base font-medium text-white/80 mb-1">
          {address}
        </div>

        <div className="text-sm text-white/50 mb-4">
          {neighborhood}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{beds} beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{baths} baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            <span>{sqft} sqft</span>
          </div>
        </div>

        {/* AI Insight */}
        {aiInsight && (
          <motion.div
            className="glass-subtle rounded-xl p-3"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-[13px] text-white/75 leading-relaxed">
              💡 {aiInsight}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
