<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { ArrowLeft, Calendar, Clock, Users, Wine, ShoppingBag, CheckCircle } from 'lucide-svelte';
  import Button from '../components/ui/Button.svelte';
  import {
    bookingStore,
    bookingTour,
    bookingTimeSlot,
    bookingAddons,
    bookingPriceBreakdown
  } from '../stores/bookingStore';
  import { getAddonsByIds } from '../data/tours';
  import { navigate } from '../lib/router';
  import type { Tour, TimeSlot } from '../types';

  let tour: Tour | null = null;
  let timeSlot: TimeSlot | null = null;
  let guestCount = 2;
  let addons: any[] = [];
  let loading = false;
  let priceBreakdown: any = {};

  $: {
    const state = $bookingStore;
    tour = $bookingTour;
    timeSlot = $bookingTimeSlot;
    guestCount = state.guestCount;
    addons = $bookingAddons;
    priceBreakdown = $bookingPriceBreakdown;
    loading = state.loading;
  }

  function goBack() {
    bookingStore.prevStep();
    navigate('/booking');
  }

  async function confirmBooking() {
    loading = true;
    await bookingStore.submitBooking();
    loading = false;
    navigate('/success');
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-cream-100 to-cream-50 pb-24">
  <header class="bg-cream-50 border-b border-cream-200 sticky top-0 z-30">
    <div class="flex items-center justify-between px-4 py-3 max-w-xl mx-auto">
      <button
        on:click={goBack}
        class="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center"
      >
        <ArrowLeft class="w-5 h-5 text-wine-700" />
      </button>
      <h1 class="font-display text-xl font-bold text-wine-800">确认预订</h1>
      <div class="w-10"></div>
    </div>

    <div class="px-4 pb-4 max-w-xl mx-auto">
      <div class="flex items-center justify-between">
        {#each [1, 2, 3] as step}
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              class:bg-wine-600={step <= 3}
              class:text-white={step <= 3}
              class:bg-cream-200={step > 3}
              class:text-gray-500={step > 3}
            >
              {#if step < 3}
                {step}
              {:else}
                <CheckCircle class="w-5 h-5" />
              {/if}
            </div>
            <span
              class="ml-2 text-sm transition-colors duration-300"
              class:text-wine-700={step <= 3}
              class:text-gray-500={step > 3}
            >
              {step === 1 ? '选择' : step === 2 ? '详情' : '确认'}
            </span>
            {#if step < 3}
              <div
                class="w-12 h-0.5 mx-2 transition-colors duration-300"
                class:bg-wine-500={step < 3}
                class:bg-cream-200={step >= 3}
              ></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </header>

  <main class="px-4 py-6 max-w-xl mx-auto space-y-6">
    <div
      class="bg-gradient-to-br from-wine-700 to-wine-900 rounded-2xl p-6 text-white shadow-card"
      transition:slide={{ duration: 400, y: 20 }}
    >
      <div class="flex items-start justify-between mb-4">
        <div>
          <p class="text-champagne-300 text-sm mb-1">您选择的行程</p>
          <h2 class="font-display text-2xl font-bold">{tour?.name}</h2>
        </div>
        <div class="w-12 h-12 rounded-full bg-champagne-500/20 flex items-center justify-center">
          <Wine class="w-6 h-6 text-champagne-300" />
        </div>
      </div>

      <div class="space-y-3 text-cream-100">
        <div class="flex items-center gap-3">
          <Calendar class="w-5 h-5 text-champagne-300" />
          <span>{timeSlot ? formatDate(timeSlot.date) : '-'}</span>
        </div>
        <div class="flex items-center gap-3">
          <Clock class="w-5 h-5 text-champagne-300" />
          <span>{timeSlot?.time || '-'}</span>
        </div>
        <div class="flex items-center gap-3">
          <Users class="w-5 h-5 text-champagne-300" />
          <span>{guestCount} 位访客</span>
        </div>
      </div>
    </div>

    {#if addons.length > 0}
      <div
        class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
        transition:slide={{ duration: 400, delay: 100, y: 20 }}
      >
        <h3 class="font-display text-lg font-bold text-wine-800 mb-4 flex items-center gap-2">
          <ShoppingBag class="w-5 h-5 text-wine-600" />
          附加服务
        </h3>
        <div class="space-y-3">
          {#each addons as addon}
            <div class="flex items-center justify-between py-2 border-b border-cream-200 last:border-0">
              <span class="text-gray-700">{addon?.name}</span>
              <span class="font-medium text-wine-700">¥{addon?.price}</span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 200, y: 20 }}
    >
      <h3 class="font-display text-lg font-bold text-wine-800 mb-4">费用明细</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between text-gray-600">
          <span>{tour?.name} × {guestCount}位</span>
          <span>¥{priceBreakdown.tourTotal}</span>
        </div>
        {#each priceBreakdown.addons as addon}
          <div class="flex items-center justify-between text-gray-600">
            <span>{addon.name}</span>
            <span>¥{addon.price}</span>
          </div>
        {/each}
        <div class="border-t-2 border-dashed border-cream-200 pt-3 mt-3">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-700">总价</span>
            <span class="font-display text-2xl font-bold text-wine-700">
              ¥{priceBreakdown.total}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-oak-50 border border-oak-200 rounded-2xl p-4"
      transition:fade={{ duration: 400, delay: 300 }}
    >
      <p class="text-sm text-oak-700">
        <span class="font-medium">温馨提示：</span>
        确认预订后，我们将发送确认短信至您的手机。如需取消，请提前24小时通知。
      </p>
    </div>
  </main>

  <div class="fixed bottom-0 left-0 right-0 bg-cream-50 border-t border-cream-200 p-4 z-20">
    <div class="max-w-xl mx-auto">
      <Button
        variant="primary"
        size="lg"
        className="w-full relative overflow-hidden"
        {loading}
        onclick={confirmBooking}
      >
        <span class="relative z-10">确认预订</span>
        <span class="relative z-10 ml-2 font-display">¥{priceBreakdown.total}</span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse-soft"></div>
      </Button>
      <p class="text-center text-xs text-gray-500 mt-2">
        点击确认即表示您同意我们的服务条款和隐私政策
      </p>
    </div>
  </div>
</div>
