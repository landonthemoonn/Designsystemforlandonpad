import { motion } from 'motion/react';
import { useState } from 'react';
import { useJourney } from '../../contexts/JourneyContext';
import type { StageId } from '../../types';

/**
 * CurvedPath — the signature ADHD-friendly arc menu.
 *
 * Desktop: fixed right side with S-curve SVG path connecting 6 stage nodes.
 * Mobile: hidden (mobile uses bottom bar in App shell).
 *
 * Key ADHD features:
 *  - Non-linear navigation (jump to any stage)
 *  - Clear visual progress without pressure
 *  - Current location always obvious
 *  - Smooth 400ms cubic-bezier animations
 */

const STAGE_SPACING = 90;
const SVG_WIDTH = 80;
const NODE_OFFSET_Y = 40; // padding top

// Positions for 6 nodes along a sinusoidal S-curve
function getNodePositions(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const y = NODE_OFFSET_Y + i * STAGE_SPACING;
    // S-curve: alternates left/right of center
    const x = SVG_WIDTH / 2 + Math.sin((i * Math.PI) / 2.5) * 12;
    return { x, y };
  });
}

function buildCurvePath(positions: { x: number; y: number }[]) {
  if (positions.length < 2) return '';
  let d = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const cpY = (prev.y + curr.y) / 2;
    // Alternate control point direction for S-curve feel
    const cpX = i % 2 === 0 ? SVG_WIDTH / 2 + 18 : SVG_WIDTH / 2 - 18;
    d += ` Q ${cpX} ${cpY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function CurvedPath() {
  const { activeStage, setActiveStage, stages } = useJourney();
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const positions = getNodePositions(stages.length);
  const svgHeight = NODE_OFFSET_Y * 2 + (stages.length - 1) * STAGE_SPACING;
  const pathD = buildCurvePath(positions);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex items-center"
      aria-label="Journey stages"
    >
      <div className="relative" style={{ width: SVG_WIDTH, height: svgHeight }}>
        {/* SVG curve path */}
        <svg
          width={SVG_WIDTH}
          height={svgHeight}
          className="absolute inset-0 pointer-events-none"
        >
          <path
            d={pathD}
            fill="none"
            stroke="#D0CEC5"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Stage nodes */}
        {stages.map((stage, i) => {
          const pos = positions[i];
          const isActive = stage.id === activeStage;
          const isHovered = stage.id === hoveredStage;
          const size = isActive ? 48 : 40;

          return (
            <div
              key={stage.id}
              className="absolute flex items-center"
              style={{
                left: pos.x - size / 2,
                top: pos.y - size / 2,
              }}
            >
              <motion.button
                onClick={() => setActiveStage(stage.id as StageId)}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`
                  relative flex items-center justify-center rounded-full
                  transition-colors duration-300 focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#00D4AA] focus-visible:ring-offset-2
                  ${isActive
                    ? 'bg-[#00D4AA] shadow-[0_4px_16px_rgba(0,212,170,0.35)]'
                    : stage.completed
                      ? 'bg-[#C8C6BD]'
                      : 'bg-white border border-[#D0CEC5]'
                  }
                `}
                style={{ width: size, height: size }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                aria-label={`${stage.name} stage`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={`text-lg select-none ${isActive ? '' : ''}`}>
                  {stage.emoji}
                </span>
              </motion.button>

              {/* Tooltip label — appears on hover or when active */}
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{
                  opacity: isHovered || isActive ? 1 : 0,
                  x: isHovered || isActive ? -size - 8 : 8,
                }}
                transition={{ duration: 0.25 }}
                className="absolute right-full mr-3 text-[13px] font-medium text-[#1A1A1A]
                           whitespace-nowrap pointer-events-none select-none"
              >
                {stage.name}
              </motion.span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
