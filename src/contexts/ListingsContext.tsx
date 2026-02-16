import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Listing } from '../types';
import { mockListings } from '../utils/mockData';

interface ListingsContextValue {
  listings: Listing[];
  savedIds: string[];
  toggleSave: (id: string) => void;
  getSavedListings: () => Listing[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilters: string[];
  setActiveFilters: (f: string[]) => void;
  filteredListings: Listing[];
}

const ListingsContext = createContext<ListingsContextValue | null>(null);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings] = useState<Listing[]>(mockListings);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['All Listings']);

  const toggleSave = useCallback((id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const getSavedListings = useCallback(() => {
    return listings.filter(l => savedIds.includes(l.id));
  }, [listings, savedIds]);

  // Apply filters
  const filteredListings = listings.filter(listing => {
    if (activeFilters.includes('All Listings')) return true;

    return activeFilters.every(filter => {
      switch (filter) {
        case 'Perfect Matches':
          return listing.aiMatch === 'perfect';
        case 'Worth a Look':
          return listing.aiMatch === 'maybe';
        case 'Saved':
          return savedIds.includes(listing.id);
        case 'Under $3000':
          return listing.price < 3000;
        case 'Pet Friendly':
          return listing.petFriendly;
        case 'In-Unit Laundry':
          return listing.hasLaundry;
        case 'Near Transit':
          return listing.nearTransit;
        default:
          return true;
      }
    });
  });

  return (
    <ListingsContext.Provider
      value={{
        listings,
        savedIds,
        toggleSave,
        getSavedListings,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        filteredListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error('useListings must be used within ListingsProvider');
  return ctx;
}
