import { motion } from "motion/react";
import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Slider } from "../components/ui/slider";

interface DecideViewProps {
  apartments: { id: string; address: string; neighborhood: string; price: number }[];
}

export function DecideView({ apartments }: DecideViewProps) {
  const [priorities, setPriorities] = useState({
    location: 80,
    price: 70,
    space: 60,
    amenities: 50,
    commute: 85,
  });

  const topApartment = apartments[0] || { address: "456 Park Avenue", neighborhood: "Upper East Side", price: 2800 };

  // Mock scoring data based on priorities
  const radarData = [
    { category: "Location", score: 90, fullMark: 100 },
    { category: "Price", score: 75, fullMark: 100 },
    { category: "Space", score: 85, fullMark: 100 },
    { category: "Amenities", score: 70, fullMark: 100 },
    { category: "Commute", score: 95, fullMark: 100 },
  ];

  const handlePriorityChange = (key: string, value: number[]) => {
    setPriorities((prev) => ({ ...prev, [key]: value[0] }));
  };

  const overallScore = Math.round(
    (radarData.reduce((acc, item) => acc + item.score, 0) / radarData.length) *
      (Object.values(priorities).reduce((a, b) => a + b, 0) / 500)
  );

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <motion.div
        className="glass rounded-[20px] p-8 text-center"
        style={{ background: "rgba(0,212,170,0.06)", borderColor: "rgba(0,212,170,0.2)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-[#00D4AA] text-sm font-medium mb-2 tracking-wider">RECOMMENDED CHOICE</div>
        <h2 className="text-4xl font-bold text-white/90 mb-1">{topApartment.address}</h2>
        <p className="text-white/50 mb-6">{topApartment.neighborhood}</p>

        <div
          className="inline-flex items-center justify-center w-32 h-32 rounded-full text-white mb-4 glow-teal"
          style={{ background: "linear-gradient(135deg, #00D4AA, #00b894)" }}
        >
          <div>
            <div className="text-5xl font-bold">{overallScore}</div>
            <div className="text-sm opacity-80">Match Score</div>
          </div>
        </div>

        <p className="text-white/70 max-w-lg mx-auto">
          This apartment scores highest across your priorities, especially for commute time and location quality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <motion.div
          className="glass-elevated rounded-[20px] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white/90 mb-6">Performance Across Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 13 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#00D4AA"
                  fill="#00D4AA"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Priority Sliders */}
        <motion.div
          className="glass-elevated rounded-[20px] p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white/90 mb-6">Your Priorities</h3>
          <div className="space-y-6">
            {Object.entries(priorities).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-white/75 capitalize">{key}</label>
                  <span className="text-sm font-semibold text-[#00D4AA]">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(val) => handlePriorityChange(key, val)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 glass-subtle rounded-xl p-4">
            <p className="text-sm text-white/65">
              💡 <strong className="text-white/85">Tip:</strong> Adjust these sliders to see how different priorities affect your match score.
              Your choices help our AI learn what matters most to you.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decision Factors */}
      <motion.div
        className="glass-elevated rounded-[20px] p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-white/90 mb-4">Why This Choice?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)" }}>
            <div className="text-2xl mb-2">✅</div>
            <h4 className="font-semibold text-white/90 mb-1">Strengths</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• 15-minute commute to your office</li>
              <li>• Walkable neighborhood (Walk Score: 95)</li>
              <li>• Pet-friendly with outdoor space</li>
              <li>• In-unit washer/dryer</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl" style={{ background: "rgba(255,193,7,0.07)", border: "1px solid rgba(255,193,7,0.2)" }}>
            <div className="text-2xl mb-2">⚠️</div>
            <h4 className="font-semibold text-white/90 mb-1">Trade-offs</h4>
            <ul className="text-sm text-white/70 space-y-1">
              <li>• Slightly above budget ($200/mo)</li>
              <li>• Only 1 bathroom for 2 bedrooms</li>
              <li>• No dishwasher in unit</li>
              <li>• Street parking only</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="bg-[#00D4AA] text-[#050d1f] px-12 py-4 rounded-[24px] text-lg font-semibold hover:bg-[#00c49a] transition-colors glow-teal">
          I'm Ready — Schedule a Tour
        </button>
      </motion.div>
    </div>
  );
}
