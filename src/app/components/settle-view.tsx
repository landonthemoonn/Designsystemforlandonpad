import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Circle, MapPin, Coffee, Dumbbell, ShoppingBag, Train, Utensils, Trees, Star } from "lucide-react";

interface SettleTask {
  id: string;
  label: string;
  category: string;
  done: boolean;
}

const settleTasks: SettleTask[] = [
  { id: "s1", label: "Take move-in photos of every room", category: "Documentation", done: false },
  { id: "s2", label: "Locate circuit breaker & water shutoff", category: "Safety", done: false },
  { id: "s3", label: "Set up WiFi & streaming services", category: "Tech", done: true },
  { id: "s4", label: "Register with building management", category: "Admin", done: false },
  { id: "s5", label: "Update driver's license address", category: "Admin", done: false },
  { id: "s6", label: "Introduce yourself to neighbors", category: "Community", done: false },
  { id: "s7", label: "Find the nearest grocery store", category: "Essentials", done: true },
  { id: "s8", label: "Locate nearest urgent care clinic", category: "Safety", done: false },
];

const neighborhood = {
  name: "Upper East Side",
  walkScore: 97,
  transitScore: 89,
  bikeScore: 72,
  highlights: [
    { icon: Coffee, label: "Café", name: "Blue Bottle Coffee", distance: "0.2 mi", rating: 4.8 },
    { icon: Dumbbell, label: "Gym", name: "Equinox 74th", distance: "0.3 mi", rating: 4.7 },
    { icon: ShoppingBag, label: "Market", name: "Whole Foods", distance: "0.4 mi", rating: 4.5 },
    { icon: Train, label: "Subway", name: "86 St (4/5/6)", distance: "0.1 mi", rating: 4.6 },
    { icon: Utensils, label: "Restaurant", name: "Café Boulud", distance: "0.5 mi", rating: 4.9 },
    { icon: Trees, label: "Park", name: "Central Park", distance: "0.6 mi", rating: 5.0 },
  ],
};

export function SettleView() {
  const [tasks, setTasks] = useState(settleTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        className="glass rounded-[20px] p-8 overflow-hidden relative"
        style={{ background: "rgba(0,212,170,0.07)", borderColor: "rgba(0,212,170,0.2)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Decorative orb */}
        <div
          className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative">
          <div className="text-4xl mb-3">🏡</div>
          <h2 className="text-3xl font-bold text-white/90 mb-2">Welcome Home!</h2>
          <p className="text-white/60 mb-6 max-w-lg">
            You've moved in to <strong className="text-white/85">456 Park Avenue</strong>. Here's everything you need to settle in and make it yours.
          </p>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#00D4AA]">{doneCount}/{tasks.length}</div>
              <div className="text-xs text-white/45 mt-0.5">Tasks done</div>
            </div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#00D4AA]"
                style={{ boxShadow: "0 0 8px rgba(0,212,170,0.5)" }}
                initial={{ width: 0 }}
                animate={{ width: `${(doneCount / tasks.length) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settle-in Checklist */}
        <motion.div
          className="glass-elevated rounded-[20px] p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h3 className="text-xl font-semibold text-white/90 mb-5">Settle-in Checklist</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="flex items-center gap-3 cursor-pointer group"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.04 }}
                onClick={() => toggleTask(task.id)}
              >
                <button className="flex-shrink-0">
                  {task.done ? (
                    <CheckCircle2 className="w-5 h-5 text-[#00D4AA]" />
                  ) : (
                    <Circle className="w-5 h-5 text-white/25 group-hover:text-white/50 transition-colors" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm ${task.done ? "text-white/40 line-through" : "text-white/80"}`}>
                    {task.label}
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 glass-subtle rounded-full text-white/45 flex-shrink-0">
                  {task.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Neighborhood Guide */}
        <motion.div
          className="glass-elevated rounded-[20px] p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-white/90">Your Neighborhood</h3>
            <div className="flex items-center gap-1.5 text-white/50 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{neighborhood.name}</span>
            </div>
          </div>

          {/* Walk / Transit / Bike scores */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Walk", score: neighborhood.walkScore, color: "#00D4AA" },
              { label: "Transit", score: neighborhood.transitScore, color: "#FFC107" },
              { label: "Bike", score: neighborhood.bikeScore, color: "#FF6B6B" },
            ].map(({ label, score, color }) => (
              <div key={label} className="glass-subtle rounded-[14px] p-3 text-center">
                <div className="text-2xl font-bold mb-0.5" style={{ color }}>{score}</div>
                <div className="text-xs text-white/45">{label} Score</div>
              </div>
            ))}
          </div>

          {/* Nearby Places */}
          <div className="space-y-3">
            {neighborhood.highlights.map((place, index) => {
              const Icon = place.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 py-2 border-b border-white/6 last:border-0"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div className="w-8 h-8 glass-subtle rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#00D4AA]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white/85 truncate">{place.name}</div>
                    <div className="text-xs text-white/40">{place.label} · {place.distance}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3 h-3 text-[#FFC107] fill-[#FFC107]" />
                    <span className="text-xs text-white/55">{place.rating}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* AI Welcome Message */}
      <motion.div
        className="glass rounded-[20px] p-6"
        style={{ background: "rgba(0,212,170,0.04)", borderColor: "rgba(0,212,170,0.12)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl">✨</div>
          <div>
            <h4 className="font-semibold text-white/90 mb-2">AI Move-in Assistant</h4>
            <p className="text-white/65 text-sm leading-relaxed">
              Based on your lifestyle preferences, I recommend stopping by{" "}
              <strong className="text-white/85">Blue Bottle Coffee</strong> on your first morning — they know the building and have great regulars from your floor.
              Also, <strong className="text-white/85">Central Park</strong> is 0.6 miles away and a great spot for your morning runs. You've got an amazing home!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
