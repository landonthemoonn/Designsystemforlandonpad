import { motion } from "motion/react";
import { useState } from "react";

type Stage = {
  id: string;
  emoji: string;
  label: string;
  completed: boolean;
};

const stages: Stage[] = [
  { id: "scout", emoji: "🔍", label: "Scout", completed: true },
  { id: "compare", emoji: "⚖️", label: "Compare", completed: false },
  { id: "decide", emoji: "✨", label: "Decide", completed: false },
  { id: "secure", emoji: "🔐", label: "Secure", completed: false },
  { id: "plan", emoji: "📋", label: "Plan", completed: false },
  { id: "settle", emoji: "🏡", label: "Settle", completed: false },
];

interface CurvedNavigationProps {
  activeStage: string;
  onStageChange?: (stageId: string) => void;
}

export function CurvedNavigation({ activeStage, onStageChange }: CurvedNavigationProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <svg width="80" height="600" className="absolute">
        {/* Curved path connecting all stages */}
        <path
          d="M 40 30 Q 60 120 40 180 Q 20 240 40 300 Q 60 360 40 420 Q 20 480 40 540"
          fill="none"
          stroke="#D0CEC5"
          strokeWidth="2"
        />
      </svg>

      <div className="relative flex flex-col gap-16">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeStage;
          const isHovered = stage.id === hoveredStage;
          const yOffset = index * 102; // Spacing between nodes

          return (
            <div key={stage.id} className="flex items-center gap-4" style={{ marginTop: index === 0 ? '0' : '-6px' }}>
              <motion.button
                onClick={() => onStageChange?.(stage.id)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-12 h-12 bg-[#00D4AA] shadow-lg"
                    : stage.completed
                    ? "w-10 h-10 bg-[#C8C6BD]"
                    : "w-10 h-10 bg-white border border-[#D0CEC5]"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xl">{stage.emoji}</span>
              </motion.button>

              {/* Label that appears on hover */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isHovered || isActive ? 1 : 0,
                  x: isHovered || isActive ? 0 : -10,
                }}
                className="text-sm font-medium text-[#1A1A1A] whitespace-nowrap pointer-events-none"
              >
                {stage.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
