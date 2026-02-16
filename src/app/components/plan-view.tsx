import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Circle, Calendar, Clock, AlertCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: "overdue" | "due-soon" | "on-track" | "completed";
  category: string;
  description?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Submit rental application",
    dueDate: "Feb 18, 2026",
    status: "overdue",
    category: "Application",
    description: "Complete application for 456 Park Avenue",
  },
  {
    id: "2",
    title: "Schedule move-in inspection",
    dueDate: "Feb 20, 2026",
    status: "due-soon",
    category: "Inspection",
    description: "Walk-through with landlord to document condition",
  },
  {
    id: "3",
    title: "Book moving company",
    dueDate: "Feb 25, 2026",
    status: "on-track",
    category: "Moving",
    description: "Get quotes from 3+ companies",
  },
  {
    id: "4",
    title: "Transfer utilities",
    dueDate: "Feb 28, 2026",
    status: "on-track",
    category: "Utilities",
    description: "Set up electric, gas, internet",
  },
  {
    id: "5",
    title: "Update mailing address",
    dueDate: "Mar 1, 2026",
    status: "on-track",
    category: "Admin",
    description: "USPS, bank, employer, subscriptions",
  },
  {
    id: "6",
    title: "Pack kitchen items",
    dueDate: "Feb 15, 2026",
    status: "completed",
    category: "Packing",
  },
  {
    id: "7",
    title: "Pack bedroom items",
    dueDate: "Feb 16, 2026",
    status: "completed",
    category: "Packing",
  },
];

export function PlanView() {
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "on-track" : "completed",
            }
          : task
      )
    );
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "overdue":
        return {
          bg: "bg-[#FF6B6B]/10",
          border: "border-[#FF6B6B]/30",
          text: "text-[#FF6B6B]",
          icon: AlertCircle,
        };
      case "due-soon":
        return {
          bg: "bg-[#FFC107]/10",
          border: "border-[#FFC107]/30",
          text: "text-[#FFC107]",
          icon: Clock,
        };
      case "on-track":
        return {
          bg: "bg-[#00D4AA]/10",
          border: "border-[#00D4AA]/30",
          text: "text-[#00D4AA]",
          icon: Calendar,
        };
      case "completed":
        return {
          bg: "bg-[#C8C6BD]/30",
          border: "border-[#C8C6BD]",
          text: "text-[#8A8A85]",
          icon: CheckCircle2,
        };
    }
  };

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalCount = tasks.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div
        className="bg-white rounded-[20px] p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Moving Progress</h3>
            <p className="text-[#8A8A85]">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#00D4AA]">{progressPercentage}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-[#E8E6DD] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#00D4AA]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#FF6B6B]">
              {tasks.filter((t) => t.status === "overdue").length}
            </div>
            <div className="text-sm text-[#8A8A85]">Overdue</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#FFC107]">
              {tasks.filter((t) => t.status === "due-soon").length}
            </div>
            <div className="text-sm text-[#8A8A85]">Due Soon</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#00D4AA]">
              {tasks.filter((t) => t.status === "on-track").length}
            </div>
            <div className="text-sm text-[#8A8A85]">On Track</div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#1A1A1A]">Your Timeline</h3>
        {tasks.map((task, index) => {
          const statusStyle = getStatusColor(task.status);
          const StatusIcon = statusStyle.icon;

          return (
            <motion.div
              key={task.id}
              className={`bg-white rounded-[20px] p-6 border-2 ${statusStyle.border} ${statusStyle.bg} transition-all hover:shadow-md`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#D0CEC5] hover:text-[#00D4AA] transition-colors" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4
                        className={`text-base font-semibold ${
                          task.status === "completed"
                            ? "text-[#8A8A85] line-through"
                            : "text-[#1A1A1A]"
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-[#8A8A85] mt-1">{task.description}</p>
                      )}
                    </div>
                    <StatusIcon className={`w-5 h-5 ${statusStyle.text} flex-shrink-0 ml-4`} />
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm text-[#8A8A85]">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="px-3 py-1 bg-[#F2F0E8] rounded-full text-xs font-medium text-[#1A1A1A]">
                      {task.category}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Suggestions */}
      <motion.div
        className="bg-[#F2F0E8] rounded-[20px] p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl">🤖</div>
          <div>
            <h4 className="font-semibold text-[#1A1A1A] mb-2">AI Task Suggestions</h4>
            <ul className="space-y-2 text-sm text-[#1A1A1A]">
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-0.5">→</span>
                <span>
                  <strong>Consider:</strong> Scheduling your move-out cleaning 2 days before your
                  lease ends to avoid last-minute stress.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-0.5">→</span>
                <span>
                  <strong>Pro tip:</strong> Take photos/videos of your new place before moving in
                  for security deposit protection.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-0.5">→</span>
                <span>
                  <strong>Reminder:</strong> Your building requires 48-hour notice for elevator
                  reservation on move-in day.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}