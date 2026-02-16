// ============================================
// land.on/pad - Type Definitions
// ============================================

/** AI match quality for a listing */
export type AIMatchType = 'perfect' | 'maybe' | 'dealbreaker';

/** Badge color variants */
export type BadgeColor = 'teal' | 'amber' | 'coral';

/** Journey stage identifiers */
export type StageId = 'scout' | 'compare' | 'decide' | 'secure' | 'plan' | 'settle';

/** A single apartment listing */
export interface Listing {
  id: string;
  price: number;
  address: string;
  neighborhood: string;
  floor: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl?: string;
  aiMatch: AIMatchType;
  aiInsight: string;
  saved: boolean;
  petFriendly: boolean;
  hasLaundry: boolean;
  nearTransit: boolean;
  availableDate: string;
  badge?: {
    text: string;
    color: BadgeColor;
  };
}

/** A journey stage node */
export interface Stage {
  id: StageId;
  name: string;
  emoji: string;
  completed: boolean;
}

/** Task status for the Plan stage */
export type TaskStatus = 'overdue' | 'due-soon' | 'on-track' | 'completed';

/** A moving task */
export interface MovingTask {
  id: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  category: string;
  description?: string;
  energyLevel?: 'low' | 'medium' | 'high';
}

/** Secure stage document */
export interface Document {
  id: string;
  name: string;
  type: 'id' | 'income' | 'reference' | 'other';
  uploaded: boolean;
  required: boolean;
}

/** Application status */
export type ApplicationStatus = 'not-started' | 'in-progress' | 'submitted' | 'approved' | 'denied';

/** Secure stage application */
export interface Application {
  id: string;
  address: string;
  status: ApplicationStatus;
  submittedDate?: string;
  documents: Document[];
  notes?: string;
}

/** Settle stage checklist item */
export interface SettleItem {
  id: string;
  title: string;
  description?: string;
  category: 'utilities' | 'address-change' | 'neighborhood' | 'setup';
  completed: boolean;
  icon?: string;
}

/** Decision factor for radar chart */
export interface DecisionFactor {
  category: string;
  score: number;
  fullMark: number;
}

/** Filter pill options */
export type FilterOption =
  | 'All Listings'
  | 'Perfect Matches'
  | 'Worth a Look'
  | 'Saved'
  | 'Under $3000'
  | 'Pet Friendly'
  | 'In-Unit Laundry'
  | 'Near Transit';
