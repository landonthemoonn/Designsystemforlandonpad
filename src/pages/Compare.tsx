import { motion } from 'motion/react';
import { Bed, Bath, Maximize, MapPin, Train, DollarSign, Calendar, Check, X, PawPrint, WashingMachine } from 'lucide-react';
import { StageHeader } from '../components/shared/StageHeader';
import { useListings } from '../contexts/ListingsContext';
import { useJourney } from '../contexts/JourneyContext';
import type { Listing } from '../types';

function ComparisonRow({
  label,
  icon: Icon,
  values,
  highlight,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  values: (string | number | boolean)[];
  highlight?: number[];
}) {
  const colClass = values.length === 3
    ? 'grid-cols-[140px_1fr_1fr_1fr]'
    : 'grid-cols-[140px_1fr_1fr]';

  return (
    <div className={`grid ${colClass} gap-4 py-4 border-b border-[#D0CEC5] items-center`}>
      <div className="flex items-center gap-2 text-[#8A8A85]">
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="text-[13px] font-medium">{label}</span>
      </div>
      {values.map((value, i) => (
        <div
          key={i}
          className={`text-[14px] font-medium ${
            highlight?.includes(i) ? 'text-[#00D4AA]' : 'text-[#1A1A1A]'
          }`}
        >
          {typeof value === 'boolean' ? (
            value ? (
              <Check className="w-5 h-5 text-[#00D4AA]" />
            ) : (
              <X className="w-5 h-5 text-[#C8C6BD]" />
            )
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );
}

export function Compare() {
  const { getSavedListings, savedIds } = useListings();
  const { setActiveStage } = useJourney();
  const saved = getSavedListings().slice(0, 3); // max 3 for comparison

  if (saved.length === 0) {
    return (
      <>
        <StageHeader
          title="Compare"
          subtitle="Side-by-side analysis of your saved apartments"
        />
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚖️</div>
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No apartments to compare</h3>
          <p className="text-[#8A8A85] mb-6">Save at least 2 apartments from the Scout stage</p>
          <button
            onClick={() => setActiveStage('scout')}
            className="bg-[#1A1A1A] text-white px-6 py-3 rounded-[24px] text-[15px] font-semibold
                       hover:bg-[#2D2D2F] transition-colors"
          >
            Back to Scout
          </button>
        </div>
      </>
    );
  }

  const lowestPrice = Math.min(...saved.map(a => a.price));
  const largestSqft = Math.max(...saved.map(a => a.sqft));

  return (
    <>
      <StageHeader
        title="Compare"
        subtitle="Side-by-side analysis of your saved apartments"
      />

      <div className="space-y-8">
        {/* Header cards */}
        <div className={`grid gap-6 ${saved.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {saved.map((apt, i) => (
            <motion.div
              key={apt.id}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-44 relative overflow-hidden">
                {apt.imageUrl ? (
                  <img src={apt.imageUrl} alt={apt.address} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#D8D6CD] to-[#C8C6BD]" />
                )}
              </div>
              <div className="p-5">
                <div className="text-[26px] font-bold text-[#1A1A1A]" style={{ letterSpacing: '-0.5px' }}>
                  ${apt.price.toLocaleString()}
                  <span className="text-[13px] font-normal text-[#8A8A85]">/mo</span>
                </div>
                <div className="text-[15px] font-medium text-[#1A1A1A] mt-1">{apt.address}</div>
                <div className="text-[13px] text-[#8A8A85]">{apt.neighborhood}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">Side-by-Side</h3>

          <ComparisonRow
            label="Price"
            icon={DollarSign}
            values={saved.map(a => `$${a.price.toLocaleString()}/mo`)}
            highlight={saved.map((a, i) => (a.price === lowestPrice ? i : -1)).filter(i => i >= 0)}
          />
          <ComparisonRow
            label="Bedrooms"
            icon={Bed}
            values={saved.map(a => a.beds)}
          />
          <ComparisonRow
            label="Bathrooms"
            icon={Bath}
            values={saved.map(a => a.baths)}
          />
          <ComparisonRow
            label="Square Feet"
            icon={Maximize}
            values={saved.map(a => `${a.sqft} sqft`)}
            highlight={saved.map((a, i) => (a.sqft === largestSqft ? i : -1)).filter(i => i >= 0)}
          />
          <ComparisonRow
            label="Neighborhood"
            icon={MapPin}
            values={saved.map(a => a.neighborhood)}
          />
          <ComparisonRow
            label="Near Transit"
            icon={Train}
            values={saved.map(a => a.nearTransit)}
          />
          <ComparisonRow
            label="Pet Friendly"
            icon={PawPrint}
            values={saved.map(a => a.petFriendly)}
          />
          <ComparisonRow
            label="In-Unit Laundry"
            icon={WashingMachine}
            values={saved.map(a => a.hasLaundry)}
          />
          <ComparisonRow
            label="Available"
            icon={Calendar}
            values={saved.map(a => a.availableDate)}
          />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          className="bg-[#F2F0E8] rounded-[20px] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-[#1A1A1A] mb-2">AI Decision Assistant</h4>
              <p className="text-[15px] text-[#1A1A1A] leading-relaxed">
                Based on your preferences, <strong>{saved[0].address}</strong> offers
                {saved[0].price === lowestPrice ? ' the best price' : ' great value'}
                {saved[0].nearTransit ? ' and excellent transit access' : ''}.
                {saved.length >= 2 && (
                  <>
                    {' '}However, <strong>{saved[1].address}</strong>
                    {saved[1].sqft > saved[0].sqft ? ' has more space' : ' is in a vibrant neighborhood'}
                    {saved[1].hasLaundry ? ' and includes in-unit laundry' : ''}.
                  </>
                )}
                {' '}Ready to dig deeper? Head to the Decide stage for a full analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
          <button
            onClick={() => setActiveStage('scout')}
            className="px-6 py-3 rounded-[24px] text-[15px] font-semibold
                       border border-[#D0CEC5] text-[#1A1A1A] hover:bg-[#F2F0E8] transition-colors"
          >
            Back to Scout
          </button>
          <button
            onClick={() => setActiveStage('decide')}
            className="bg-[#00D4AA] text-white px-8 py-3 rounded-[24px] text-[15px] font-semibold
                       hover:bg-[#00C49A] transition-colors shadow-lg"
          >
            Help Me Decide
          </button>
        </div>
      </div>
    </>
  );
}
