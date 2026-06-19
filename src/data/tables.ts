import type { Table } from '../types';

export const tables: Table[] = [
  {
    id: 'table-001',
    number: 1,
    capacity: 2,
    status: 'available',
    location: '主品酒室 - 窗边'
  },
  {
    id: 'table-002',
    number: 2,
    capacity: 2,
    status: 'occupied',
    location: '主品酒室 - 中央',
    currentBookingId: 'booking-001'
  },
  {
    id: 'table-003',
    number: 3,
    capacity: 4,
    status: 'available',
    location: '主品酒室 - 角落'
  },
  {
    id: 'table-004',
    number: 4,
    capacity: 4,
    status: 'reserved',
    location: '主品酒室 - 靠窗',
    currentBookingId: 'booking-002'
  },
  {
    id: 'table-005',
    number: 5,
    capacity: 6,
    status: 'cleaning',
    location: '专业品酒室 - A区'
  },
  {
    id: 'table-006',
    number: 6,
    capacity: 6,
    status: 'available',
    location: '专业品酒室 - B区'
  },
  {
    id: 'table-007',
    number: 7,
    capacity: 8,
    status: 'occupied',
    location: 'VIP品鉴室 - 主桌',
    currentBookingId: 'booking-003'
  },
  {
    id: 'table-008',
    number: 8,
    capacity: 8,
    status: 'available',
    location: 'VIP品鉴室 - 副桌'
  },
  {
    id: 'table-009',
    number: 9,
    capacity: 10,
    status: 'reserved',
    location: '主厨餐厅 - 大包厢',
    currentBookingId: 'booking-004'
  },
  {
    id: 'table-010',
    number: 10,
    capacity: 10,
    status: 'available',
    location: '观景露台 - 大桌'
  }
];

export const getTableById = (id: string): Table | undefined => {
  return tables.find(table => table.id === id);
};

export const getTableByNumber = (number: number): Table | undefined => {
  return tables.find(table => table.number === number);
};

export const getAvailableTables = (): Table[] => {
  return tables.filter(table => table.status === 'available');
};

export const getTablesByCapacity = (minCapacity: number): Table[] => {
  return tables.filter(table => table.capacity >= minCapacity);
};

export const getTablesByLocation = (location: string): Table[] => {
  return tables.filter(table => table.location.includes(location));
};
