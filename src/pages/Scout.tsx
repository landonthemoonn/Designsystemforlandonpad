import { motion } from 'motion/react';
import { StageHeader } from '../components/shared/StageHeader';
import { AIInput } from '../components/scout/AIInput';
import { FilterPills } from '../components/scout/FilterPills';
import { ListingCard } from '../components/scout/ListingCard';
import { FloatingCompare } from '../components/scout/FloatingCompare';
import { useListings } from '../contexts/ListingsContext';
import { useJourney } from '../contexts/JourneyContext';
import { filterOptions } from '../utils/mockData';

export function Scout() {
  const {
    filteredListings,
    savedIds,
    toggleSave,
    activeFilters,
    setActiveFilters,
    setSearchQuery,
  } = useListings();
  const { setActiveStage } = useJourney();

  const handleFilterToggle = (filter: string) => {
    if (filter === 'All Listings') {
      setActiveFilters(['All Listings']);
    } else {
      let next = activeFilters.filter(f => f !== 'All Listings');
      if (activeFilters.includes(filter)) {
        next = next.filter(f => f !== filter);
        if (next.length === 0) next = ['All Listings'];
      } else {
        next.push(filter);
      }
      setActiveFilters(next);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <StageHeader
        title="Scout"
        subtitle="Discover your perfect place with AI-powered search"
      />

      {/* AI Input */}
      <div className="mb-8">
        <AIInput onSubmit={handleSearch} />
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <ListingCard
              listing={listing}
              isSaved={savedIds.includes(listing.id)}
              onSave={toggleSave}
              onClick={() => {}}
            />
          </motion.div>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No matches found</h3>
          <p className="text-[#8A8A85]">Try adjusting your filters</p>
        </div>
      )}

      {/* Floating Compare Button */}
      <FloatingCompare
        count={savedIds.length}
        show={savedIds.length >= 2}
        onClick={() => setActiveStage('compare')}
      />
    </>
  );
}
