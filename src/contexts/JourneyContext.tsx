import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { StageId, Stage } from '../types';

interface JourneyContextValue {
  activeStage: StageId;
  setActiveStage: (stage: StageId) => void;
  stages: Stage[];
  completeStage: (stageId: StageId) => void;
}

const defaultStages: Stage[] = [
  { id: 'scout', name: 'Scout', emoji: '🔍', completed: false },
  { id: 'compare', name: 'Compare', emoji: '⚖️', completed: false },
  { id: 'decide', name: 'Decide', emoji: '✨', completed: false },
  { id: 'secure', name: 'Secure', emoji: '📝', completed: false },
  { id: 'plan', name: 'Plan', emoji: '📦', completed: false },
  { id: 'settle', name: 'Settle', emoji: '🏠', completed: false },
];

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [activeStage, setActiveStage] = useState<StageId>('scout');
  const [stages, setStages] = useState<Stage[]>(defaultStages);

  const completeStage = useCallback((stageId: StageId) => {
    setStages(prev =>
      prev.map(s => (s.id === stageId ? { ...s, completed: true } : s))
    );
  }, []);

  return (
    <JourneyContext.Provider value={{ activeStage, setActiveStage, stages, completeStage }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used within JourneyProvider');
  return ctx;
}
