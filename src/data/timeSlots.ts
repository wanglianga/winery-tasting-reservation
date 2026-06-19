import type { TimeSlot } from '../types';

const generateDate = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

const times = ['10:00', '12:00', '14:00', '16:00', '18:00'];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const tours = ['tour-casual', 'tour-professional', 'tour-cellar-deep', 'tour-dinner'];
  const bookedPatterns = [
    [0, 2, 5, 8, 12],
    [3, 6, 9, 11, 15],
    [1, 4, 7, 10, 13],
    [0, 3, 6, 8, 10]
  ];

  for (let day = 0; day < 7; day++) {
    const date = generateDate(day);
    tours.forEach((tourId, tourIndex) => {
      const capacities = [15, 10, 6, 12];
      times.forEach((time, timeIndex) => {
        const baseBooked = bookedPatterns[tourIndex][timeIndex];
        const dayVariation = day % 3;
        const booked = Math.max(0, baseBooked + dayVariation - 1);
        const capacity = capacities[tourIndex];
        const ratio = booked / capacity;
        
        let status: TimeSlot['status'] = 'available';
        if (day === 0 && timeIndex < 2) {
          status = 'closed';
        } else if (ratio >= 1) {
          status = 'full';
        } else if (ratio >= 0.7) {
          status = 'limited';
        }

        slots.push({
          id: `slot-${date}-${tourId}-${time}`,
          date,
          time,
          tourId,
          capacity,
          booked,
          status,
          guideId: `guide-00${(tourIndex % 3) + 1}`
        });
      });
    });
  }

  return slots;
};

export const timeSlots: TimeSlot[] = generateTimeSlots();

export const getTimeSlotById = (id: string): TimeSlot | undefined => {
  return timeSlots.find(slot => slot.id === id);
};

export const getTimeSlotsByTour = (tourId: string): TimeSlot[] => {
  return timeSlots.filter(slot => slot.tourId === tourId);
};

export const getTimeSlotsByDate = (date: string): TimeSlot[] => {
  return timeSlots.filter(slot => slot.date === date);
};

export const getTimeSlotsByTourAndDate = (tourId: string, date: string): TimeSlot[] => {
  return timeSlots.filter(slot => slot.tourId === tourId && slot.date === date);
};

export const getAvailableDates = (tourId?: string): string[] => {
  const slots = tourId ? getTimeSlotsByTour(tourId) : timeSlots;
  const dates = [...new Set(slots.filter(s => s.status !== 'closed').map(s => s.date))];
  return dates.sort();
};
