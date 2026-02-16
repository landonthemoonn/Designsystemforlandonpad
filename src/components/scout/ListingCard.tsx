import { motion } from 'motion/react';
import { Heart, Bed, Bath, Maximize } from 'lucide-react';
import type { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  isSaved: boolean;
  onSave: (id: string) => void;
  onClick: (id: string) => void;
}

const matchBadge = {
  perfect: { label: '✨ Perfect Match', className: 'bg-[#00D4AA]/90 text-white' },
  maybe: { label: '🤔 Worth a Look', className: 'bg-[#FFC107]/90 text-[#1A1A1A]' },
  dealbreaker: { label: '⚠️ Check Dealbreakers', className: 'bg-[#FF6B6B]/90 text-white' },
};

export function ListingCard({ listing, isSaved, onSave, onClick }: ListingCardProps) {
  const badge = listing.badge
    ? { text: listing.badge.text, color: listing.badge.color }
    : null;

  const matchInfo = matchBadge[listing.aiMatch];

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(listing.id);
  };

  return (
    <motion.article
      className="bg-white rounded-[20px] overflow-hidden cursor-pointer"
      onClick={() => onClick(listing.id)}
      whileHover={{
        y: -6,
        boxShadow: '0 8px 24px rgba(26, 26, 26, 0.12)',
      }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ boxShadow: '0 2px 12px rgba(26, 26, 26, 0.06)' }}
      role="button"
      tabIndex={0}
      aria-label={`${listing.address}, ${listing.neighborhood} - $${listing.price.toLocaleString()}`}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.address}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#D8D6CD] to-[#C8C6BD]" />
        )}

        {/* AI Match Badge — top-left */}
        <div
          className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-[12px] text-[12px]
                      font-semibold backdrop-blur-sm ${matchInfo.className}`}
        >
          {matchInfo.label}
        </div>

        {/* Save heart — top-right */}
        <motion.button
          onClick={handleSave}
          className="absolute top-4 right-4 w-[38px] h-[38px] rounded-full bg-white/95
                     flex items-center justify-center shadow-sm"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isSaved ? 'Unsave listing' : 'Save listing'}
        >
          <motion.div animate={isSaved ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.25 }}>
            <Heart
              className={`w-5 h-5 transition-colors ${
                isSaved ? 'fill-[#FF6B6B] stroke-[#FF6B6B]' : 'stroke-[#1A1A1A] fill-none'
              }`}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-[22px]">
        {/* Price */}
        <div
          className="text-[30px] font-bold text-[#1A1A1A] mb-1"
          style={{ letterSpacing: '-0.5px' }}
        >
          ${listing.price.toLocaleString()}
          <span className="text-[15px] font-normal text-[#8A8A85]">/mo</span>
        </div>

        {/* Address + Neighborhood */}
        <div className="text-[15px] font-medium text-[#1A1A1A] mb-0.5">
          {listing.address}
        </div>
        <div className="text-[13px] text-[#8A8A85] mb-1">
          {listing.neighborhood} · {listing.floor}
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-[13px] text-[#1A1A1A] mb-4 mt-3">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#8A8A85]" />
            <span>{listing.beds} bed{listing.beds !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#8A8A85]" />
            <span>{listing.baths} bath{listing.baths !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-[#8A8A85]" />
            <span>{listing.sqft} sqft</span>
          </div>
        </div>

        {/* AI Insight box */}
        {listing.aiInsight && (
          <div className="bg-[#F2F0E8] rounded-[12px] p-3">
            <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
              💡 {listing.aiInsight}
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}
