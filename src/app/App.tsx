import { motion, AnimatePresence } from 'motion/react';
import { JourneyProvider, useJourney } from '../contexts/JourneyContext';
import { ListingsProvider } from '../contexts/ListingsContext';
import { CurvedPath } from '../components/navigation/CurvedPath';
import { Scout } from '../pages/Scout';
import { Compare } from '../pages/Compare';
import { Decide } from '../pages/Decide';
import { Secure } from '../pages/Secure';
import { Plan } from '../pages/Plan';
import { Settle } from '../pages/Settle';
import type { StageId } from '../types';

/** Maps stage id to page component */
const stageComponents: Record<StageId, React.ComponentType> = {
  scout: Scout,
  compare: Compare,
  decide: Decide,
  secure: Secure,
  plan: Plan,
  settle: Settle,
};

function AppShell() {
  const { activeStage, setActiveStage, stages } = useJourney();
  const ActivePage = stageComponents[activeStage] || Scout;

  return (
    <div className="min-h-screen bg-[#E8E6DD]">
      {/* Desktop: Curved path navigation on right side */}
      <CurvedPath />

      {/* Main content area */}
      <main className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-12 lg:pr-28 pt-10 pb-28 lg:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom navigation bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md
                   border-t border-[#D0CEC5] z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-label="Journey stages"
      >
        <div className="flex items-center justify-around py-2 px-3">
          {stages.map(stage => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id as StageId)}
                className={`
                  flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 rounded-xl
                  transition-all duration-300 min-w-[48px]
                  ${isActive ? 'scale-110' : 'scale-100'}
                `}
                aria-label={`${stage.name} stage`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive
                      ? 'bg-[#00D4AA] shadow-[0_2px_8px_rgba(0,212,170,0.4)]'
                      : stage.completed
                        ? 'bg-[#C8C6BD]'
                        : 'bg-transparent'
                    }
                  `}
                >
                  <span className="text-lg">{stage.emoji}</span>
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-[#00D4AA]' : 'text-[#8A8A85]'
                  }`}
                >
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <JourneyProvider>
      <ListingsProvider>
        <AppShell />
      </ListingsProvider>
    </JourneyProvider>
  );
}
