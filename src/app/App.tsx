import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CurvedNavigation } from "./components/curved-navigation";
import { StageHeader } from "./components/stage-header";
import { AIInput } from "./components/ai-input";
import { FilterPills } from "./components/filter-pills";
import { ListingCard } from "./components/listing-card";
import { FloatingActionButton } from "./components/floating-action-button";
import { CompareView } from "./components/compare-view";
import { DecideView } from "./components/decide-view";
import { PlanView } from "./components/plan-view";
import { SecureView } from "./components/secure-view";
import { SettleView } from "./components/settle-view";

const mobileStages = [
  { emoji: "🔍", id: "scout",   label: "Scout"   },
  { emoji: "⚖️", id: "compare", label: "Compare" },
  { emoji: "✨", id: "decide",  label: "Decide"  },
  { emoji: "🔐", id: "secure",  label: "Secure"  },
  { emoji: "📋", id: "plan",    label: "Plan"    },
  { emoji: "🏡", id: "settle",  label: "Settle"  },
];

// Mock apartment listings data
const mockListings = [
  {
    id: "1",
    price: 2800,
    address: "456 Park Avenue",
    neighborhood: "Upper East Side",
    beds: 2,
    baths: 2,
    sqft: 1200,
    imageUrl: "https://images.unsplash.com/photo-1663756915301-2ba688e078cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MTE2MjA2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: { text: "Just Listed", color: "teal" as const },
    aiInsight: "This matches your preference for natural light and is close to 3 subway lines. Pet-friendly building with a rooftop garden.",
    petFriendly: true,
    hasLaundry: true,
    nearTransit: true,
    availableDate: "Mar 1, 2026",
  },
  {
    id: "2",
    price: 3200,
    address: "789 Broadway",
    neighborhood: "SoHo",
    beds: 1,
    baths: 1,
    sqft: 900,
    imageUrl: "https://images.unsplash.com/photo-1611095459865-47682ae3c41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTIzMzYxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    badge: { text: "Price Drop", color: "amber" as const },
    aiInsight: "Great location for your commute. Building has washer/dryer in unit - perfect for your busy schedule.",
    petFriendly: false,
    hasLaundry: true,
    nearTransit: true,
    availableDate: "Feb 20, 2026",
  },
  {
    id: "3",
    price: 4100,
    address: "123 West Street",
    neighborhood: "Tribeca",
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    imageUrl: "https://images.unsplash.com/photo-1696986681606-b156ccd761c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVufGVufDF8fHx8MTc3MTI1NzQwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    aiInsight: "Spacious kitchen with chef-grade appliances. Extra bedroom could work as your home office.",
    petFriendly: false,
    hasLaundry: false,
    nearTransit: false,
    availableDate: "Apr 15, 2026",
  },
  {
    id: "4",
    price: 2600,
    address: "321 Riverside Drive",
    neighborhood: "Upper West Side",
    beds: 2,
    baths: 1.5,
    sqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1768118422932-4cdcca2ced8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwdmlld3xlbnwxfHx8fDE3NzEyNTU1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: { text: "View Available", color: "teal" as const },
    aiInsight: "Park-facing with outdoor space. Quiet building perfect for focus time. Pet policy allows dogs up to 50lbs.",
    petFriendly: true,
    hasLaundry: false,
    nearTransit: true,
    availableDate: "Jan 30, 2026",
  },
  {
    id: "5",
    price: 3500,
    address: "567 Fifth Avenue",
    neighborhood: "Midtown",
    beds: 2,
    baths: 2,
    sqft: 1350,
    imageUrl: "https://images.unsplash.com/photo-1595515106886-43b1443a2e8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBiYXRocm9vbXxlbnwxfHx8fDE3NzExODIyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    aiInsight: "Modern finishes throughout. Building amenities include gym and co-working space - reduces monthly expenses.",
    petFriendly: false,
    hasLaundry: false,
    nearTransit: true,
    availableDate: "Mar 10, 2026",
  },
  {
    id: "6",
    price: 2950,
    address: "890 Lafayette Street",
    neighborhood: "NoHo",
    beds: 1,
    baths: 1,
    sqft: 850,
    imageUrl: "https://images.unsplash.com/photo-1740416249095-2380ee85a75d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGxvZnQlMjBzcGFjZXxlbnwxfHx8fDE3NzEyNTc0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    badge: { text: "Hot Property", color: "coral" as const },
    aiInsight: "Loft-style with high ceilings. Walkable to 15+ coffee shops and restaurants. Available immediately.",
    petFriendly: false,
    hasLaundry: false,
    nearTransit: false,
    availableDate: "Feb 15, 2026",
  },
];

const filterOptions = [
  "All Listings",
  "Under $3000",
  "Pet Friendly",
  "In-Unit Laundry",
  "Near Transit",
  "Recently Listed",
  "Move-in Ready",
];

export default function App() {
  const [activeStage, setActiveStage] = useState("scout");
  const [activeFilters, setActiveFilters] = useState<string[]>(["All Listings"]);
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterToggle = (filter: string) => {
    if (filter === "All Listings") {
      setActiveFilters(["All Listings"]);
    } else {
      let newFilters = activeFilters.filter((f) => f !== "All Listings");
      if (activeFilters.includes(filter)) {
        newFilters = newFilters.filter((f) => f !== filter);
        if (newFilters.length === 0) {
          newFilters = ["All Listings"];
        }
      } else {
        newFilters.push(filter);
      }
      setActiveFilters(newFilters);
    }
  };

  const handleSave = (id: string) => {
    setSavedListings((prev) =>
      prev.includes(id) ? prev.filter((listingId) => listingId !== id) : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const savedApartments = mockListings.filter((listing) => savedListings.includes(listing.id));

  // ── Real filter + search logic ──────────────────────────────────────────
  const filteredListings = useMemo(() => {
    let results = mockListings;

    if (!activeFilters.includes("All Listings")) {
      results = results.filter((l) =>
        activeFilters.every((f) => {
          switch (f) {
            case "Under $3000":     return l.price < 3000;
            case "Pet Friendly":    return l.petFriendly;
            case "In-Unit Laundry": return l.hasLaundry;
            case "Near Transit":    return l.nearTransit;
            case "Recently Listed": return l.badge?.text === "Just Listed";
            case "Move-in Ready": {
              const d = new Date(l.availableDate);
              const diffDays = (d.getTime() - Date.now()) / 86_400_000;
              return diffDays <= 45;
            }
            default: return true;
          }
        })
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (l) =>
          l.address.toLowerCase().includes(q) ||
          l.neighborhood.toLowerCase().includes(q) ||
          l.aiInsight?.toLowerCase().includes(q)
      );
    }

    return results;
  }, [activeFilters, searchQuery]);

  const stageConfig = {
    scout: {
      title: "Scout",
      subtitle: "Discover your perfect place with AI-powered search",
    },
    compare: {
      title: "Compare",
      subtitle: "Side-by-side analysis of your saved apartments",
    },
    decide: {
      title: "Decide",
      subtitle: "Let AI help you make the final choice",
    },
    secure: {
      title: "Secure",
      subtitle: "Application and documentation checklist",
    },
    plan: {
      title: "Plan",
      subtitle: "Organize your moving timeline",
    },
    settle: {
      title: "Settle",
      subtitle: "Get comfortable in your new home",
    },
  };

  const currentStage = stageConfig[activeStage as keyof typeof stageConfig] || stageConfig.scout;

  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden">
      {/* ── Glassmorphism Background ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #050d1f 0%, #0d1b3e 35%, #150d2e 65%, #0a0f24 100%)",
        }}
      >
        {/* Ambient glow orbs */}
        <div
          className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[25%] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(120,80,255,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-150px] left-[25%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-[60%] left-[-50px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,107,107,0.04) 0%, transparent 70%)" }}
        />
      </div>

      {/* Curved Navigation */}
      <CurvedNavigation activeStage={activeStage} onStageChange={setActiveStage} />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 lg:pr-32 pt-12">
        <StageHeader title={currentStage.title} subtitle={currentStage.subtitle} />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Scout Stage */}
            {activeStage === "scout" && (
              <>
                <div className="mb-8">
                  <AIInput onSearch={handleSearch} />
                </div>

                <div className="mb-10">
                  <FilterPills
                    filters={filterOptions}
                    activeFilters={activeFilters}
                    onFilterToggle={handleFilterToggle}
                  />
                </div>

                {filteredListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <ListingCard
                        key={listing.id}
                        {...listing}
                        saved={savedListings.includes(listing.id)}
                        onSave={handleSave}
                        onClick={(id) => console.log("Clicked listing:", id)}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="glass rounded-[20px] p-12 text-center"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-white/85 mb-2">No listings match</h3>
                    <p className="text-white/50 mb-6">
                      Try adjusting your filters or search query.
                    </p>
                    <button
                      onClick={() => {
                        setActiveFilters(["All Listings"]);
                        setSearchQuery("");
                      }}
                      className="bg-[#00D4AA] text-[#050d1f] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#00c49a] transition-colors"
                    >
                      Clear filters
                    </button>
                  </motion.div>
                )}
              </>
            )}

            {activeStage === "compare" && <CompareView apartments={savedApartments} />}
            {activeStage === "decide" && <DecideView apartments={savedApartments} />}
            {activeStage === "plan" && <PlanView />}
            {activeStage === "secure" && <SecureView />}
            {activeStage === "settle" && <SettleView />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Button — Scout */}
      {activeStage === "scout" && (
        <FloatingActionButton
          label="Compare Saved"
          count={savedListings.length}
          show={savedListings.length > 0}
          onClick={() => setActiveStage("compare")}
        />
      )}

      {/* Floating Action Button — Compare */}
      {activeStage === "compare" && savedApartments.length >= 1 && (
        <FloatingActionButton
          label="Help Me Decide"
          show={true}
          onClick={() => setActiveStage("decide")}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/10"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-1">
          {mobileStages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 ${
                  isActive ? "text-[#00D4AA]" : "text-white/40"
                }`}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "rgba(0,212,170,0.1)" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <span
                  className={`relative text-[18px] transition-transform duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {stage.emoji}
                </span>
                <span className="relative text-[10px] font-medium leading-none">
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
