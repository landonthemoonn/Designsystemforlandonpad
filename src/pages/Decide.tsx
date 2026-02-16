import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { StageHeader } from '../components/shared/StageHeader';
import { useListings } from '../contexts/ListingsContext';
import { useJourney } from '../contexts/JourneyContext';

export function Decide() {
  const { getSavedListings } = useListings();
  const { setActiveStage } = useJourney();
  const saved = getSavedListings();

  const topApartment = saved[0] || {
    id: '0',
    address: '742 Valencia Street',
    neighborhood: 'Mission District',
    price: 2450,
  };

  const [priorities, setPriorities] = useState({
    Price: 70,
    Location: 80,
    Space: 60,
    Amenities: 50,
    'Landlord Quality': 65,
    'Move-in Flexibility': 75,
  });

  // Simulated scores for top apartment
  const radarData = useMemo(
    () => [
      { category: 'Price', score: 85, fullMark: 100 },
      { category: 'Location', score: 92, fullMark: 100 },
      { category: 'Space', score: 70, fullMark: 100 },
      { category: 'Amenities', score: 65, fullMark: 100 },
      { category: 'Landlord', score: 80, fullMark: 100 },
      { category: 'Flexibility', score: 88, fullMark: 100 },
    ],
    []
  );

  const overallScore = useMemo(() => {
    const totalPriority = Object.values(priorities).reduce((a, b) => a + b, 0);
    const avgScore = radarData.reduce((acc, item) => acc + item.score, 0) / radarData.length;
    return Math.round(avgScore * (totalPriority / (Object.keys(priorities).length * 100)));
  }, [priorities, radarData]);

  const handlePriorityChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setPriorities(prev => ({ ...prev, [key]: Number(e.target.value) }));
  };

  if (saved.length === 0) {
    return (
      <>
        <StageHeader title="Decide" subtitle="Let AI help you make the final choice" />
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Save some apartments first</h3>
          <p className="text-[#8A8A85] mb-6">We need data to help you decide</p>
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

  return (
    <>
      <StageHeader title="Decide" subtitle="Let AI help you make the final choice" />

      <div className="space-y-8">
        {/* Score Overview */}
        <motion.div
          className="bg-gradient-to-br from-[#00D4AA]/10 to-[#00D4AA]/5 rounded-[20px] p-8 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[#8A8A85] text-[11px] font-semibold tracking-widest mb-2">
            RECOMMENDED CHOICE
          </div>
          <h2
            className="text-[36px] font-bold text-[#1A1A1A] mb-1"
            style={{ letterSpacing: '-0.5px' }}
          >
            {topApartment.address}
          </h2>
          <p className="text-[#8A8A85] mb-6">{topApartment.neighborhood}</p>

          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#00D4AA] text-white mb-4">
            <div>
              <div className="text-5xl font-bold">{overallScore}</div>
              <div className="text-[13px] font-medium">Match Score</div>
            </div>
          </div>

          <p className="text-[15px] text-[#1A1A1A] max-w-lg mx-auto leading-relaxed">
            This apartment scores highest across your priorities, especially for location quality
            and move-in flexibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <motion.div
            className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-6">
              Performance Across Categories
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#D0CEC5" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#8A8A85', fontSize: 13 }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#00D4AA"
                    fill="#00D4AA"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Priority Sliders */}
          <motion.div
            className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-6">Your Priorities</h3>
            <div className="space-y-5">
              {Object.entries(priorities).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <label className="text-[13px] font-medium text-[#1A1A1A]">{key}</label>
                    <span className="text-[13px] font-semibold text-[#00D4AA]">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={value}
                    onChange={e => handlePriorityChange(key, e)}
                    className="w-full h-2 bg-[#E8E6DD] rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-5
                               [&::-webkit-slider-thumb]:h-5
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-[#00D4AA]
                               [&::-webkit-slider-thumb]:shadow-md
                               [&::-webkit-slider-thumb]:cursor-pointer"
                    aria-label={`${key} priority`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#F2F0E8] rounded-[12px]">
              <p className="text-[13px] text-[#1A1A1A] leading-relaxed">
                💡 <strong>Tip:</strong> Adjust these sliders to see how different priorities
                affect your match score. The AI learns what matters most to you.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Strengths & Trade-offs */}
        <motion.div
          className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">Why This Choice?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#00D4AA]/5 rounded-[16px] border border-[#00D4AA]/20">
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-semibold text-[#1A1A1A] mb-2">Strengths</h4>
              <ul className="text-[13px] text-[#1A1A1A] space-y-1.5">
                <li>- Walking distance to BART and Muni</li>
                <li>- Vibrant, walkable neighborhood</li>
                <li>- Pet-friendly building</li>
                <li>- Below average price for the area</li>
              </ul>
            </div>
            <div className="p-5 bg-[#FFC107]/5 rounded-[16px] border border-[#FFC107]/20">
              <div className="text-2xl mb-2">⚠️</div>
              <h4 className="font-semibold text-[#1A1A1A] mb-2">Trade-offs</h4>
              <ul className="text-[13px] text-[#1A1A1A] space-y-1.5">
                <li>- No in-unit laundry (laundromat 1 block away)</li>
                <li>- Street noise on weekend evenings</li>
                <li>- Only 1 bathroom</li>
                <li>- Limited closet space</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Timeline Pressure */}
        <motion.div
          className="bg-[#F2F0E8] rounded-[20px] p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium text-[#8A8A85] mb-1">MOVE-IN TIMELINE</div>
              <div className="text-[17px] font-semibold text-[#1A1A1A]">Available March 1, 2026</div>
            </div>
            <div className="text-right">
              <div className="text-[30px] font-bold text-[#FFC107]" style={{ letterSpacing: '-0.5px' }}>
                13
              </div>
              <div className="text-[13px] text-[#8A8A85]">days left</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setActiveStage('secure')}
            className="bg-[#00D4AA] text-white px-12 py-4 rounded-[24px] text-[17px] font-semibold
                       hover:bg-[#00C49A] transition-colors
                       shadow-[0_8px_24px_rgba(0,212,170,0.3)]"
          >
            Commit to This One
          </button>
        </motion.div>
      </div>
    </>
  );
}
