import { motion } from "motion/react";
import { Bed, Bath, Maximize, MapPin, Train, DollarSign, Calendar, Check, X } from "lucide-react";

interface Apartment {
  id: string;
  price: number;
  address: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl?: string;
  petFriendly: boolean;
  hasLaundry: boolean;
  nearTransit: boolean;
  availableDate: string;
}

interface CompareViewProps {
  apartments: Apartment[];
}

const ComparisonRow = ({
  label,
  icon: Icon,
  values,
  highlight,
}: {
  label: string;
  icon: any;
  values: (string | number | boolean)[];
  highlight?: number[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-[#D0CEC5]">
      <div className="flex items-center gap-2 text-[#8A8A85]">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {values.map((value, index) => (
        <div
          key={index}
          className={`text-sm font-medium ${
            highlight?.includes(index) ? "text-[#00D4AA]" : "text-[#1A1A1A]"
          }`}
        >
          {typeof value === "boolean" ? (
            value ? (
              <Check className="w-5 h-5 text-[#00D4AA]" />
            ) : (
              <X className="w-5 h-5 text-[#8A8A85]" />
            )
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );
};

export function CompareView({ apartments }: CompareViewProps) {
  const firstTwo = apartments.slice(0, 2);

  if (firstTwo.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">⚖️</div>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No apartments to compare</h3>
        <p className="text-[#8A8A85]">Save at least 2 apartments to see a side-by-side comparison</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firstTwo.map((apt, index) => (
          <motion.div
            key={apt.id}
            className="bg-[#C8C6BD] rounded-[20px] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="h-48 relative">
              {apt.imageUrl ? (
                <img src={apt.imageUrl} alt={apt.address} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#D8D6CD] to-[#C8C6BD]" />
              )}
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-[#1A1A1A] mb-2">
                ${apt.price.toLocaleString()}
              </div>
              <div className="text-base font-medium text-[#1A1A1A]">{apt.address}</div>
              <div className="text-sm text-[#8A8A85]">{apt.neighborhood}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <motion.div
        className="bg-white rounded-[20px] p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6">Side-by-Side Comparison</h3>

        <div className="space-y-0">
          <ComparisonRow
            label="Price"
            icon={DollarSign}
            values={firstTwo.map((apt) => `$${apt.price.toLocaleString()}/mo`)}
            highlight={[firstTwo.findIndex((apt) => apt.price === Math.min(...firstTwo.map((a) => a.price)))]}
          />
          <ComparisonRow
            label="Bedrooms"
            icon={Bed}
            values={firstTwo.map((apt) => apt.beds)}
          />
          <ComparisonRow
            label="Bathrooms"
            icon={Bath}
            values={firstTwo.map((apt) => apt.baths)}
          />
          <ComparisonRow
            label="Square Feet"
            icon={Maximize}
            values={firstTwo.map((apt) => apt.sqft)}
            highlight={[firstTwo.findIndex((apt) => apt.sqft === Math.max(...firstTwo.map((a) => a.sqft)))]}
          />
          <ComparisonRow
            label="Neighborhood"
            icon={MapPin}
            values={firstTwo.map((apt) => apt.neighborhood)}
          />
          <ComparisonRow
            label="Near Transit"
            icon={Train}
            values={firstTwo.map((apt) => apt.nearTransit)}
          />
          <ComparisonRow
            label="Pet Friendly"
            icon={Check}
            values={firstTwo.map((apt) => apt.petFriendly)}
          />
          <ComparisonRow
            label="In-Unit Laundry"
            icon={Check}
            values={firstTwo.map((apt) => apt.hasLaundry)}
          />
          <ComparisonRow
            label="Available"
            icon={Calendar}
            values={firstTwo.map((apt) => apt.availableDate)}
          />
        </div>
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
            <p className="text-[#1A1A1A] leading-relaxed">
              Based on your preferences, <strong>{firstTwo[0].address}</strong> offers better value per
              square foot and matches your transit requirements. However,{" "}
              <strong>{firstTwo[1]?.address || "the second option"}</strong> has more space and
              in-unit amenities that could save you time weekly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
