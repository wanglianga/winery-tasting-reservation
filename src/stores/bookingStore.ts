import { writable, derived } from 'svelte/store';
import type { ContactInfo, Booking } from '../types';
import { getTourById, getAddonsByIds } from '../data/tours';
import { getTimeSlotById } from '../data/timeSlots';

interface BookingState {
  step: number;
  tourId: string | null;
  date: string | null;
  timeSlotId: string | null;
  guestCount: number;
  addonIds: string[];
  contactInfo: ContactInfo;
  loading: boolean;
  error: string | null;
  currentBooking: Booking | null;
}

const initialState: BookingState = {
  step: 1,
  tourId: null,
  date: null,
  timeSlotId: null,
  guestCount: 2,
  addonIds: [],
  contactInfo: {
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  },
  loading: false,
  error: null,
  currentBooking: null
};

function createBookingStore() {
  const { subscribe, set, update } = writable<BookingState>(initialState);

  return {
    subscribe,

    setStep: (step: number) => {
      update(state => ({ ...state, step }));
    },

    nextStep: () => {
      update(state => ({ ...state, step: Math.min(state.step + 1, 5) }));
    },

    prevStep: () => {
      update(state => ({ ...state, step: Math.max(state.step - 1, 1) }));
    },

    setTour: (tourId: string) => {
      update(state => ({ ...state, tourId, step: 2 }));
    },

    setDate: (date: string) => {
      update(state => ({ ...state, date }));
    },

    setTimeSlot: (timeSlotId: string) => {
      update(state => ({ ...state, timeSlotId, step: 3 }));
    },

    setGuestCount: (count: number) => {
      update(state => ({ ...state, guestCount: Math.max(1, count) }));
    },

    toggleAddon: (addonId: string) => {
      update(state => {
        const hasAddon = state.addonIds.includes(addonId);
        return {
          ...state,
          addonIds: hasAddon
            ? state.addonIds.filter(id => id !== addonId)
            : [...state.addonIds, addonId]
        };
      });
    },

    setContactInfo: (info: Partial<ContactInfo>) => {
      update(state => ({
        ...state,
        contactInfo: { ...state.contactInfo, ...info }
      }));
    },

    validateStep: (step: number): boolean => {
      const state = initialState;
      switch (step) {
        case 1:
          return !!state.tourId;
        case 2:
          return !!state.tourId && !!state.date && !!state.timeSlotId;
        case 3:
          return state.guestCount >= 1;
        case 4:
          return (
            !!state.contactInfo.name &&
            !!state.contactInfo.email &&
            !!state.contactInfo.phone
          );
        default:
          return true;
      }
    },

    submitBooking: async (): Promise<Booking | null> => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const state = initialState;
        const tour = getTourById(state.tourId!);
        const timeSlot = getTimeSlotById(state.timeSlotId!);
        const addons = getAddonsByIds(state.addonIds);

        if (!tour || !timeSlot) {
          throw new Error('预约信息不完整');
        }

        const addonsTotal = addons.reduce((sum, a) => sum + (a?.price || 0), 0);
        const totalPrice = tour.price * state.guestCount + addonsTotal;

        const booking: Booking = {
          id: `booking-${Date.now()}`,
          tourId: state.tourId!,
          date: state.date!,
          timeSlotId: state.timeSlotId!,
          guestCount: state.guestCount,
          addonIds: state.addonIds,
          contactInfo: { ...state.contactInfo },
          status: 'confirmed',
          totalPrice,
          createdAt: new Date().toISOString(),
          guideId: timeSlot.guideId
        };

        update(state => ({
          ...state,
          loading: false,
          currentBooking: booking,
          step: 5
        }));

        return booking;
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : '预约提交失败'
        }));
        return null;
      }
    },

    reset: () => {
      set(initialState);
    }
  };
}

export const bookingStore = createBookingStore();

export const bookingTour = derived(bookingStore, $state => {
  return $state.tourId ? getTourById($state.tourId) : null;
});

export const bookingTimeSlot = derived(bookingStore, $state => {
  return $state.timeSlotId ? getTimeSlotById($state.timeSlotId) : null;
});

export const bookingAddons = derived(bookingStore, $state => {
  return getAddonsByIds($state.addonIds);
});

export const bookingPriceBreakdown = derived(bookingStore, $state => {
  const tour = $state.tourId ? getTourById($state.tourId) : null;
  const addons = getAddonsByIds($state.addonIds);

  const tourTotal = tour ? tour.price * $state.guestCount : 0;
  const addonsTotal = addons.reduce((sum, a) => sum + (a?.price || 0), 0);
  const total = tourTotal + addonsTotal;

  return {
    tourPrice: tour?.price || 0,
    guestCount: $state.guestCount,
    tourTotal,
    addons: addons.map(a => ({ name: a!.name, price: a!.price })),
    addonsTotal,
    total
  };
});

export const canProceed = derived(bookingStore, $state => {
  switch ($state.step) {
    case 1:
      return !!$state.tourId;
    case 2:
      return !!$state.tourId && !!$state.date && !!$state.timeSlotId;
    case 3:
      return $state.guestCount >= 1;
    case 4:
      return (
        !!$state.contactInfo.name &&
        !!$state.contactInfo.email &&
        !!$state.contactInfo.phone
      );
    default:
      return false;
  }
});
