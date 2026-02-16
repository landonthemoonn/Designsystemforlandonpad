import { useState } from "react";
import { CurvedNavigation } from "./components/curved-navigation";
import { StageHeader } from "./components/stage-header";
import { AIInput } from "./components/ai-input";
import { FilterPills } from "./components/filter-pills";
import { ListingCard } from "./components/listing-card";
import { FloatingActionButton } from "./components/floating-action-button";
import { CompareView } from "./components/compare-view";
import { DecideView } from "./components/decide-view";
import { PlanView } from "./components/plan-view";

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
    // In a real app, this would trigger an API call
    console.log("Searching for:", query);
  };

  // Get saved apartments for comparison
  const savedApartments = mockListings.filter((listing) => savedListings.includes(listing.id));

  // Stage configuration
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
    <div className="min-h-screen bg-[#E8E6DD] pb-24">
      {/* Curved Navigation */}
      <CurvedNavigation activeStage={activeStage} onStageChange={setActiveStage} />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 lg:pr-32 pt-12">
        <StageHeader title={currentStage.title} subtitle={currentStage.subtitle} />

        {/* Scout Stage */}
        {activeStage === "scout" && (
          <>
            {/* AI Input */}
            <div className="mb-8">
              <AIInput onSearch={handleSearch} />
            </div>

            {/* Filter Pills */}
            <div className="mb-10">
              <FilterPills
                filters={filterOptions}
                activeFilters={activeFilters}
                onFilterToggle={handleFilterToggle}
              />
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  saved={savedListings.includes(listing.id)}
                  onSave={handleSave}
                  onClick={(id) => console.log("Clicked listing:", id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Compare Stage */}
        {activeStage === "compare" && <CompareView apartments={savedApartments} />}

        {/* Decide Stage */}
        {activeStage === "decide" && <DecideView apartments={savedApartments} />}

        {/* Plan Stage */}
        {activeStage === "plan" && <PlanView />}

        {/* Placeholder for other stages */}
        {["secure", "settle"].includes(activeStage) && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">
              {activeStage === "secure" ? "🔐" : "🏡"}
            </div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Coming Soon</h3>
            <p className="text-[#8A8A85]">This stage is under development</p>
          </div>
        )}
      </div>

      {/* Floating Action Button - only show on Scout stage */}
      {activeStage === "scout" && (
        <FloatingActionButton
          label="Compare Saved"
          count={savedListings.length}
          show={savedListings.length > 0}
          onClick={() => {
            setActiveStage("compare");
          }}
        />
      )}

      {/* Floating Action Button for Compare stage */}
      {activeStage === "compare" && savedApartments.length >= 1 && (
        <FloatingActionButton
          label="Help Me Decide"
          show={true}
          onClick={() => {
            setActiveStage("decide");
          }}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D0CEC5] z-40">
        <div className="flex items-center justify-around py-3 px-4">
          {["🔍", "⚖️", "✨", "🔐", "📋", "🏡"].map((emoji, index) => {
            const stages = ["scout", "compare", "decide", "secure", "plan", "settle"];
            const isActive = activeStage === stages[index];
            return (
              <button
                key={index}
                onClick={() => setActiveStage(stages[index])}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                  isActive ? "bg-[#00D4AA] scale-110" : "bg-transparent"
                }`}
              >
                <span className="text-xl">{emoji}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}