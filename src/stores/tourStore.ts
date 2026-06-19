import { writable, derived } from 'svelte/store';
import type { Tour, Wine } from '../types';
import { tours, getTourById, getTourBySlug, addonServices } from '../data/tours';
import { wines, getWinesByIds } from '../data/wines';
import { getTimeSlotsByTourAndDate } from '../data/timeSlots';

interface TourState {
  loading: boolean;
  error: string | null;
  selectedTourId: string | null;
  selectedDate: string | null;
  tours: Tour[];
  allWines: Wine[];
}

const initialState: TourState = {
  loading: false,
  error: null,
  selectedTourId: null,
  selectedDate: null,
  tours,
  allWines: wines
};

function createTourStore() {
  const { subscribe, set, update } = writable<TourState>(initialState);

  return {
    subscribe,

    loadTours: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        update(state => ({ ...state, loading: false, tours }));
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : '加载失败'
        }));
      }
    },

    selectTour: (tourId: string) => {
      update(state => ({ ...state, selectedTourId: tourId }));
    },

    selectTourBySlug: (slug: string) => {
      const tour = getTourBySlug(slug);
      if (tour) {
        update(state => ({ ...state, selectedTourId: tour.id }));
      }
    },

    selectDate: (date: string) => {
      update(state => ({ ...state, selectedDate: date }));
    },

    clearSelection: () => {
      update(state => ({ ...state, selectedTourId: null, selectedDate: null }));
    },

    reset: () => {
      set(initialState);
    }
  };
}

export const tourStore = createTourStore();

export const selectedTour = derived(tourStore, $state => {
  if (!$state.selectedTourId) return null;
  return getTourById($state.selectedTourId) || null;
});

export const selectedTourWines = derived(tourStore, $state => {
  if (!$state.selectedTourId) return [];
  const tour = getTourById($state.selectedTourId);
  return tour ? getWinesByIds(tour.wineIds) : [];
});

export const selectedTourAddons = derived(tourStore, $state => {
  if (!$state.selectedTourId) return [];
  const tour = getTourById($state.selectedTourId);
  return tour
    ? addonServices.filter(addon => tour.availableAddons.includes(addon.id))
    : [];
});

export const availableTimeSlots = derived(tourStore, $state => {
  if (!$state.selectedTourId || !$state.selectedDate) return [];
  return getTimeSlotsByTourAndDate($state.selectedTourId, $state.selectedDate);
});

export const filteredTours = (filter: {
  pace?: string;
  maxDuration?: number;
  drivingSuitable?: boolean;
  search?: string;
}) =>
  derived(tourStore, $state => {
    return $state.tours.filter(tour => {
      if (filter.pace && tour.pace !== filter.pace) return false;
      if (filter.maxDuration && tour.duration > filter.maxDuration) return false;
      if (filter.drivingSuitable !== undefined && tour.drivingSuitable !== filter.drivingSuitable) return false;
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        return (
          tour.name.toLowerCase().includes(searchLower) ||
          tour.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  });
