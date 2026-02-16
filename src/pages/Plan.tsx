import { motion } from 'motion/react';
import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  AlertCircle,
  Zap,
  Battery,
  BatteryMedium,
} from 'lucide-react';
import { StageHeader } from '../components/shared/StageHeader';
import { mockTasks } from '../utils/mockData';
import type { MovingTask, TaskStatus } from '../types';

const statusConfig: Record<
  TaskStatus,
  { bg: string; border: string; text: string; icon: typeof AlertCircle }
> = {
  overdue: {
    bg: 'bg-[#FF6B6B]/8',
    border: 'border-[#FF6B6B]/25',
    text: 'text-[#FF6B6B]',
    icon: AlertCircle,
  },
  'due-soon': {
    bg: 'bg-[#FFC107]/8',
    border: 'border-[#FFC107]/25',
    text: 'text-[#FFC107]',
    icon: Clock,
  },
  'on-track': {
    bg: 'bg-[#00D4AA]/8',
    border: 'border-[#00D4AA]/25',
    text: 'text-[#00D4AA]',
    icon: Calendar,
  },
  completed: {
    bg: 'bg-[#C8C6BD]/15',
    border: 'border-[#C8C6BD]',
    text: 'text-[#8A8A85]',
    icon: CheckCircle2,
  },
};

const energyIcons = {
  low: Battery,
  medium: BatteryMedium,
  high: Zap,
};

export function Plan() {
  const [tasks, setTasks] = useState<MovingTask[]>(mockTasks);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'on-track' : ('completed' as TaskStatus) }
          : t
      )
    );
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);

  return (
    <>
      <StageHeader
        title="Plan"
        subtitle="Organize your moving timeline"
      />

      <div className="space-y-8">
        {/* Progress Overview */}
        <motion.div
          className="bg-white rounded-[20px] p-8 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[22px] font-bold text-[#1A1A1A]">Moving Progress</h3>
              <p className="text-[#8A8A85] text-[15px]">
                {completedCount} of {tasks.length} tasks completed
              </p>
            </div>
            {/* Progress ring */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40" cy="40" r="34"
                  stroke="#E8E6DD" strokeWidth="6" fill="none"
                />
                <motion.circle
                  cx="40" cy="40" r="34"
                  stroke="#00D4AA" strokeWidth="6" fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 34}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - progressPct / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[17px] font-bold text-[#00D4AA]">{progressPct}%</span>
              </div>
            </div>
          </div>

          {/* Status counts */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-[22px] font-bold text-[#FF6B6B]">
                {tasks.filter(t => t.status === 'overdue').length}
              </div>
              <div className="text-[13px] text-[#8A8A85]">Overdue</div>
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#FFC107]">
                {tasks.filter(t => t.status === 'due-soon').length}
              </div>
              <div className="text-[13px] text-[#8A8A85]">Due Soon</div>
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#00D4AA]">
                {tasks.filter(t => t.status === 'on-track').length}
              </div>
              <div className="text-[13px] text-[#8A8A85]">On Track</div>
            </div>
          </div>
        </motion.div>

        {/* Task Timeline */}
        <div className="space-y-3">
          <h3 className="text-[17px] font-semibold text-[#1A1A1A]">Your Timeline</h3>

          {tasks.map((task, i) => {
            const config = statusConfig[task.status];
            const StatusIcon = config.icon;
            const EnergyIcon = task.energyLevel ? energyIcons[task.energyLevel] : null;

            return (
              <motion.div
                key={task.id}
                className={`bg-white rounded-[20px] p-5 border-2 ${config.border} ${config.bg}
                           transition-all hover:shadow-md`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex items-start gap-4">
                  {/* Toggle checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 flex-shrink-0"
                    aria-label={`Mark ${task.title} as ${task.status === 'completed' ? 'incomplete' : 'complete'}`}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                    ) : (
                      <Circle className="w-6 h-6 text-[#D0CEC5] hover:text-[#00D4AA] transition-colors" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-[15px] font-semibold ${
                          task.status === 'completed'
                            ? 'text-[#8A8A85] line-through'
                            : 'text-[#1A1A1A]'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <StatusIcon className={`w-5 h-5 ${config.text} flex-shrink-0`} />
                    </div>

                    {task.description && (
                      <p className="text-[13px] text-[#8A8A85] mt-1">{task.description}</p>
                    )}

                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <div className="flex items-center gap-1.5 text-[13px] text-[#8A8A85]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{task.dueDate}</span>
                      </div>
                      <div className="px-2.5 py-0.5 bg-[#F2F0E8] rounded-full text-[11px] font-medium text-[#1A1A1A]">
                        {task.category}
                      </div>
                      {EnergyIcon && task.status !== 'completed' && (
                        <div className="flex items-center gap-1 text-[11px] text-[#8A8A85]">
                          <EnergyIcon className="w-3.5 h-3.5" />
                          <span>{task.energyLevel} energy</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Task Suggestions */}
        <motion.div
          className="bg-[#F2F0E8] rounded-[20px] p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">🤖</div>
            <div>
              <h4 className="font-semibold text-[#1A1A1A] mb-3">AI Task Suggestions</h4>
              <ul className="space-y-2.5 text-[13px] text-[#1A1A1A]">
                <li className="flex items-start gap-2">
                  <span className="text-[#00D4AA] mt-0.5 font-bold">→</span>
                  <span>
                    <strong>Consider:</strong> Schedule your move-out cleaning 2 days before
                    your lease ends to avoid last-minute stress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D4AA] mt-0.5 font-bold">→</span>
                  <span>
                    <strong>Pro tip:</strong> Take photos/videos of your new place before moving
                    in for security deposit protection.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00D4AA] mt-0.5 font-bold">→</span>
                  <span>
                    <strong>SF tip:</strong> Book your moving elevator slot ASAP — most SF
                    buildings require 48-hour advance reservation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
