import { writable, derived } from 'svelte/store';
import type { Guide, Table, Booking } from '../types';
import { guides, getGuideById, getAvailableGuides } from '../data/guides';
import { tables, getTableById, getAvailableTables } from '../data/tables';
import { getTourById } from '../data/tours';

interface ReceptionState {
  loading: boolean;
  error: string | null;
  guides: Guide[];
  tables: Table[];
  bookings: Booking[];
  selectedDate: string;
  searchQuery: string;
  filterStatus: string;
}

const today = new Date().toISOString().split('T')[0];

const mockBookings: Booking[] = [
  {
    id: 'booking-001',
    tourId: 'tour-casual',
    date: today,
    timeSlotId: `slot-${today}-tour-casual-14:00`,
    guestCount: 2,
    addonIds: [],
    contactInfo: { name: '张三', email: 'zhang@example.com', phone: '13800138001' },
    status: 'confirmed',
    totalPrice: 596,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    guideId: 'guide-001',
    tableId: 'table-002'
  },
  {
    id: 'booking-002',
    tourId: 'tour-professional',
    date: today,
    timeSlotId: `slot-${today}-tour-professional-14:00`,
    guestCount: 4,
    addonIds: ['addon-photo'],
    contactInfo: { name: '李四', email: 'li@example.com', phone: '13800138002' },
    status: 'confirmed',
    totalPrice: 2690,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    guideId: 'guide-002',
    tableId: 'table-004'
  },
  {
    id: 'booking-003',
    tourId: 'tour-cellar-deep',
    date: today,
    timeSlotId: `slot-${today}-tour-cellar-deep-16:00`,
    guestCount: 6,
    addonIds: ['addon-souvenir', 'addon-private'],
    contactInfo: { name: '王五', email: 'wang@example.com', phone: '13800138003' },
    status: 'in_progress',
    totalPrice: 8916,
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    guideId: 'guide-003',
    tableId: 'table-007'
  },
  {
    id: 'booking-004',
    tourId: 'tour-dinner',
    date: today,
    timeSlotId: `slot-${today}-tour-dinner-18:00`,
    guestCount: 8,
    addonIds: ['addon-transport'],
    contactInfo: { name: '赵六', email: 'zhao@example.com', phone: '13800138004', specialRequests: '庆祝结婚纪念日' },
    status: 'pending',
    totalPrice: 15292,
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    guideId: 'guide-001',
    tableId: 'table-009'
  },
  {
    id: 'booking-005',
    tourId: 'tour-casual',
    date: today,
    timeSlotId: `slot-${today}-tour-casual-16:00`,
    guestCount: 3,
    addonIds: [],
    contactInfo: { name: '钱七', email: 'qian@example.com', phone: '13800138005' },
    status: 'completed',
    totalPrice: 894,
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    guideId: 'guide-003'
  }
];

const initialState: ReceptionState = {
  loading: false,
  error: null,
  guides,
  tables,
  bookings: mockBookings,
  selectedDate: today,
  searchQuery: '',
  filterStatus: 'all'
};

function createReceptionStore() {
  const { subscribe, set, update } = writable<ReceptionState>(initialState);

  return {
    subscribe,

    loadData: async () => {
      update(state => ({ ...state, loading: true, error: null }));
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        update(state => ({ ...state, loading: false }));
      } catch (error) {
        update(state => ({
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : '加载失败'
        }));
      }
    },

    setSelectedDate: (date: string) => {
      update(state => ({ ...state, selectedDate: date }));
    },

    setSearchQuery: (query: string) => {
      update(state => ({ ...state, searchQuery: query }));
    },

    setFilterStatus: (status: string) => {
      update(state => ({ ...state, filterStatus: status }));
    },

    updateGuideStatus: (guideId: string, status: Guide['status']) => {
      update(state => ({
        ...state,
        guides: state.guides.map(g =>
          g.id === guideId ? { ...g, status } : g
        )
      }));
    },

    updateTableStatus: (tableId: string, status: Table['status'], bookingId?: string) => {
      update(state => ({
        ...state,
        tables: state.tables.map(t =>
          t.id === tableId
            ? { ...t, status, currentBookingId: bookingId }
            : t
        )
      }));
    },

    updateBookingStatus: (bookingId: string, status: Booking['status']) => {
      update(state => ({
        ...state,
        bookings: state.bookings.map(b =>
          b.id === bookingId ? { ...b, status } : b
        )
      }));
    },

    assignTableToBooking: (bookingId: string, tableId: string) => {
      update(state => {
        const bookings = state.bookings.map(b =>
          b.id === bookingId ? { ...b, tableId } : b
        );
        const tables = state.tables.map(t =>
          t.id === tableId
            ? { ...t, status: 'reserved' as const, currentBookingId: bookingId }
            : t
        );
        return { ...state, bookings, tables };
      });
    },

    assignGuideToBooking: (bookingId: string, guideId: string) => {
      update(state => ({
        ...state,
        bookings: state.bookings.map(b =>
          b.id === bookingId ? { ...b, guideId } : b
        )
      }));
    },

    reset: () => {
      set(initialState);
    }
  };
}

export const receptionStore = createReceptionStore();

export const filteredBookings = derived(receptionStore, $state => {
  return $state.bookings
    .filter(b => b.date === $state.selectedDate)
    .filter(b => {
      if ($state.filterStatus === 'all') return true;
      return b.status === $state.filterStatus;
    })
    .filter(b => {
      if (!$state.searchQuery) return true;
      const query = $state.searchQuery.toLowerCase();
      return (
        b.contactInfo.name.toLowerCase().includes(query) ||
        b.contactInfo.phone.includes(query) ||
        b.id.toLowerCase().includes(query)
      );
    });
});

export const bookingsWithDetails = derived(filteredBookings, $bookings => {
  return $bookings.map(booking => ({
    ...booking,
    tour: getTourById(booking.tourId),
    guide: booking.guideId ? getGuideById(booking.guideId) : undefined,
    table: booking.tableId ? getTableById(booking.tableId) : undefined
  }));
});

export const availableGuidesNow = derived(receptionStore, () => {
  return getAvailableGuides();
});

export const availableTablesNow = derived(receptionStore, () => {
  return getAvailableTables();
});

export const todayStats = derived(receptionStore, $state => {
  const todayBookings = $state.bookings.filter(b => b.date === $state.selectedDate);
  return {
    total: todayBookings.length,
    confirmed: todayBookings.filter(b => b.status === 'confirmed').length,
    pending: todayBookings.filter(b => b.status === 'pending').length,
    inProgress: todayBookings.filter(b => b.status === 'in_progress').length,
    completed: todayBookings.filter(b => b.status === 'completed').length,
    totalGuests: todayBookings.reduce((sum, b) => sum + b.guestCount, 0),
    totalRevenue: todayBookings.reduce((sum, b) => sum + b.totalPrice, 0)
  };
});

export const tableStats = derived(receptionStore, $state => {
  return {
    total: $state.tables.length,
    available: $state.tables.filter(t => t.status === 'available').length,
    occupied: $state.tables.filter(t => t.status === 'occupied').length,
    reserved: $state.tables.filter(t => t.status === 'reserved').length,
    cleaning: $state.tables.filter(t => t.status === 'cleaning').length
  };
});
