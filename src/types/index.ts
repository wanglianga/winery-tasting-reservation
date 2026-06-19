export interface Wine {
  id: string;
  name: string;
  vintage: number;
  variety: string;
  region: string;
  country: string;
  tastingNotes: string[];
  decantingTime: number;
  abv: number;
  price: number;
  imageUrl: string;
  description: string;
  foodPairing: string[];
}

export interface TimelineStep {
  id: string;
  time: string;
  title: string;
  description: string;
  duration: number;
  icon: string;
}

export interface MapPoint {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  type: 'vineyard' | 'cellar' | 'tasting' | 'dining' | 'giftshop' | 'factory';
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  tourId: string;
  capacity: number;
  booked: number;
  guideId?: string;
  status: 'available' | 'limited' | 'full' | 'closed';
}

export interface AddonService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface Guide {
  id: string;
  name: string;
  avatarUrl: string;
  languages: string[];
  specialties: string[];
  status: 'available' | 'busy' | 'off' | 'training';
  rating: number;
  experience: number;
  bio: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  location: string;
  currentBookingId?: string;
}

export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: number;
  distance: number;
  wineCount: number;
  drivingSuitable: boolean;
  pace: 'relaxed' | 'moderate' | 'intensive';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  timeline: TimelineStep[];
  mapPoints: MapPoint[];
  wineIds: string[];
  pairingSuggestions: string[];
  decantingTips: string[];
  highlights: string[];
  maxGuests: number;
  minGuests: number;
  availableAddons: string[];
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface Booking {
  id: string;
  tourId: string;
  date: string;
  timeSlotId: string;
  guestCount: number;
  addonIds: string[];
  contactInfo: ContactInfo;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: string;
  guideId?: string;
  tableId?: string;
}
