import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { CheckCircle2, Circle, PartyPopper } from 'lucide-react';
import { StageHeader } from '../components/shared/StageHeader';
import { mockSettleItems } from '../utils/mockData';
import type { SettleItem } from '../types';

const categoryLabels: Record<SettleItem['category'], string> = {
  utilities: 'Utilities & Services',
  'address-change': 'Address Changes',
  neighborhood: 'Explore Your Neighborhood',
  setup: 'Home Setup',
};

const categoryOrder: SettleItem['category'][] = ['setup', 'utilities', 'address-change', 'neighborhood'];

export function Settle() {
  const [items, setItems] = useState<SettleItem[]>(mockSettleItems);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPct = Math.round((completedCount / items.length) * 100);
  const allDone = completedCount === items.length;

  const grouped = useMemo(() => {
    const groups: Record<string, SettleItem[]> = {};
    for (const cat of categoryOrder) {
      groups[cat] = items.filter(i => i.category === cat);
    }
    return groups;
  }, [items]);

  return (
    <>
      <StageHeader
        title="Settle"
        subtitle="Get comfortable in your new home"
      />

      <div className="space-y-8">
        {/* Progress Card */}
        <motion.div
          className={`rounded-[20px] p-8 text-center transition-colors duration-500 ${
            allDone
              ? 'bg-gradient-to-br from-[#00D4AA]/20 to-[#00D4AA]/5'
              : 'bg-white shadow-[0_2px_12px_rgba(26,26,26,0.06)]'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            {allDone ? (
              <motion.div
                key="done"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <PartyPopper className="w-16 h-16 text-[#00D4AA] mx-auto mb-4" />
                <h2 className="text-[30px] font-bold text-[#1A1A1A] mb-2" style={{ letterSpacing: '-0.5px' }}>
                  You're All Settled!
                </h2>
                <p className="text-[15px] text-[#8A8A85] max-w-md mx-auto">
                  Welcome to your new home in San Francisco. You crushed it.
                </p>
              </motion.div>
            ) : (
              <motion.div key="progress">
                <div className="text-[48px] font-bold text-[#00D4AA] mb-1" style={{ letterSpacing: '-1px' }}>
                  {progressPct}%
                </div>
                <p className="text-[15px] text-[#8A8A85]">
                  {completedCount} of {items.length} tasks done
                </p>

                {/* Progress bar */}
                <div className="w-full max-w-sm mx-auto h-2.5 bg-[#E8E6DD] rounded-full overflow-hidden mt-4">
                  <motion.div
                    className="h-full bg-[#00D4AA] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grouped Checklists */}
        {categoryOrder.map((cat, catIdx) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.08 }}
          >
            <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-3">
              {categoryLabels[cat]}
            </h3>

            <div className="space-y-2">
              {grouped[cat]?.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-[16px] text-left transition-all
                    ${item.completed
                      ? 'bg-[#00D4AA]/5 border border-[#00D4AA]/15'
                      : 'bg-white border border-[#D0CEC5]/50 hover:border-[#00D4AA]/30 shadow-[0_1px_4px_rgba(26,26,26,0.04)]'
                    }
                  `}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: catIdx * 0.08 + i * 0.03 }}
                >
                  {/* Icon / Emoji */}
                  <span className="text-xl w-8 text-center flex-shrink-0">{item.icon}</span>

                  {/* Checkbox */}
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#D0CEC5] flex-shrink-0" />
                  )}

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-[15px] font-medium ${
                        item.completed ? 'text-[#8A8A85] line-through' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {item.title}
                    </div>
                    {item.description && (
                      <p className="text-[13px] text-[#8A8A85] mt-0.5">{item.description}</p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Neighborhood Guide */}
        <motion.div
          className="bg-[#F2F0E8] rounded-[20px] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🗺️</div>
            <div>
              <h4 className="font-semibold text-[#1A1A1A] mb-2">Your New Neighborhood</h4>
              <p className="text-[15px] text-[#1A1A1A] leading-relaxed mb-4">
                The Mission District is one of SF's most vibrant neighborhoods. Here are some
                highlights to explore:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-[12px]">
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">🌮 Food</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    La Taqueria, Tartine, Bi-Rite Creamery
                  </p>
                </div>
                <div className="p-3 bg-white rounded-[12px]">
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">☕ Coffee</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    Four Barrel, Ritual, Sightglass
                  </p>
                </div>
                <div className="p-3 bg-white rounded-[12px]">
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">🌳 Parks</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    Dolores Park, Balmy Alley murals
                  </p>
                </div>
                <div className="p-3 bg-white rounded-[12px]">
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">🚇 Transit</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    16th St BART, 24th St BART, J-Church
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
