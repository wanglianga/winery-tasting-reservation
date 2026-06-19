<script lang="ts">
  import { Clock, Users, Calendar } from 'lucide-svelte';
  import type { TimeSlot } from '../types';
  import { onMount } from 'svelte';

  export let timeSlots: TimeSlot[] = [];
  export let selectedSlot: TimeSlot | null = null;
  export let onSelect: (slot: TimeSlot) => void = () => {};

  let availableDates: string[] = [];
  let selectedDate: string | null = null;
  let filteredSlots: TimeSlot[] = [];

  onMount(() => {
    availableDates = [...new Set(timeSlots.filter(s => s.status !== 'closed').map(s => s.date))].sort();
    if (availableDates.length > 0) {
      selectedDate = availableDates[0];
      filterSlots();
    }
  });

  $: if (selectedDate) {
    filterSlots();
  }

  function filterSlots() {
    filteredSlots = timeSlots.filter(s => s.date === selectedDate && s.status !== 'closed');
  }

  function selectDate(date: string) {
    selectedDate = date;
  }

  function selectSlot(slot: TimeSlot) {
    selectedSlot = slot;
    onSelect(slot);
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      day: date.getDate(),
      weekday: weekdays[date.getDay()],
      month: date.getMonth() + 1
    };
  }

  function getSlotStatusColor(status: TimeSlot['status']) {
    switch (status) {
      case 'available':
        return 'bg-vineyard-500';
      case 'limited':
        return 'bg-oak-500';
      case 'full':
        return 'bg-wine-500';
      default:
        return 'bg-gray-300';
    }
  }

  function getCapacityPercent(slot: TimeSlot) {
    return (slot.booked / slot.capacity) * 100;
  }

  function getAvailableCount(slot: TimeSlot) {
    return slot.capacity - slot.booked;
  }
</script>

<div class="space-y-4">
  <div class="flex items-center gap-2 mb-4">
    <Calendar class="w-5 h-5 text-wine-600" />
    <h3 class="font-display text-lg font-bold text-wine-800">选择日期</h3>
  </div>

  <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
    {#each availableDates as date}
      {@const formatted = formatDate(date)}
      <button
        type="button"
        class="flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 min-w-[70px]"
        class:border-wine-500={selectedDate === date}
        class:bg-wine-50={selectedDate === date}
        class:border-cream-200={selectedDate !== date}
        class:bg-cream-50={selectedDate !== date}
        on:click={() => selectDate(date)}
      >
        <span class="text-xs text-gray-500">{formatted.month}月</span>
        <span
          class="text-xl font-bold"
          class:text-wine-700={selectedDate === date}
          class:text-gray-700={selectedDate !== date}
        >
          {formatted.day}
        </span>
        <span
          class="text-xs"
          class:text-wine-600={selectedDate === date}
          class:text-gray-500={selectedDate !== date}
        >
          {formatted.weekday}
        </span>
      </button>
    {/each}
  </div>

  <div class="flex items-center gap-2 mb-4">
    <Clock class="w-5 h-5 text-wine-600" />
    <h3 class="font-display text-lg font-bold text-wine-800">选择时间</h3>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {#each filteredSlots as slot}
      <button
        type="button"
        class="p-4 rounded-xl border-2 transition-all duration-200 text-left"
        class:border-wine-500={selectedSlot?.id === slot.id}
        class:bg-wine-50={selectedSlot?.id === slot.id}
        class:border-cream-200={selectedSlot?.id !== slot.id}
        class:bg-cream-50={selectedSlot?.id !== slot.id}
        class:opacity-50={slot.status === 'full'}
        class:cursor-not-allowed={slot.status === 'full'}
        disabled={slot.status === 'full'}
        on:click={() => selectSlot(slot)}
      >
        <div class="flex items-center justify-between mb-2">
          <span
            class="font-display text-xl font-bold"
            class:text-wine-700={selectedSlot?.id === slot.id}
            class:text-gray-700={selectedSlot?.id !== slot.id}
          >
            {slot.time}
          </span>
          <span
            class="flex items-center gap-1 text-xs"
            class:text-wine-600={selectedSlot?.id === slot.id}
            class:text-gray-500={selectedSlot?.id !== slot.id}
          >
            <Users class="w-3 h-3" />
            {getAvailableCount(slot)} 位可用
          </span>
        </div>

        <div class="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-300 {getSlotStatusColor(slot.status)}"
            style="width: {getCapacityPercent(slot)}%"
          ></div>
        </div>

        <div class="flex items-center justify-between mt-2 text-xs">
          <span class="text-gray-500">
            {slot.booked}/{slot.capacity} 已预约
          </span>
          <span
            class="px-2 py-0.5 rounded-full text-xs font-medium"
            class:bg-vineyard-100={slot.status === 'available'}
            class:text-vineyard-700={slot.status === 'available'}
            class:bg-oak-100={slot.status === 'limited'}
            class:text-oak-700={slot.status === 'limited'}
            class:bg-wine-100={slot.status === 'full'}
            class:text-wine-700={slot.status === 'full'}
          >
            {slot.status === 'available' ? '充足' : slot.status === 'limited' ? '紧张' : '已满'}
          </span>
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
