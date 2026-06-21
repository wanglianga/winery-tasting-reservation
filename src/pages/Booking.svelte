<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { ArrowLeft, Users, Phone, User, Plus, Minus } from 'lucide-svelte';
  import Button from '../components/ui/Button.svelte';
  import TimeSlotPicker from '../components/TimeSlotPicker.svelte';
  import AddonServiceCard from '../components/AddonServiceCard.svelte';
  import {
    bookingStore,
    bookingTour,
    bookingTimeSlot,
    bookingAddons,
    canProceed,
    bookingPriceBreakdown
  } from '../stores/bookingStore';
  import { addonServices, getTourById } from '../data/tours';
  import { getTimeSlotsByTour } from '../data/timeSlots';
  import { navigate } from '../lib/router';
  import type { TimeSlot, AddonService, Tour } from '../types';

  let tour: Tour | null = null;
  let tourTimeSlots: TimeSlot[] = [];
  let availableAddons: AddonService[] = [];
  let currentStep = 2;
  let guestCount = 2;
  let selectedSlot: TimeSlot | null = null;
  let name = '';
  let phone = '';
  let selectedAddonIds: string[] = [];

  $: {
    const state = $bookingStore;
    tour = state.tourId ? getTourById(state.tourId) || null : null;
    currentStep = state.step;
    guestCount = state.guestCount;
    selectedSlot = $bookingTimeSlot;
    name = state.contactInfo.name;
    phone = state.contactInfo.phone;
    selectedAddonIds = state.addonIds;

    if (tour) {
      tourTimeSlots = getTimeSlotsByTour(tour.id);
      availableAddons = addonServices.filter(a => tour!.availableAddons.includes(a.id));
    }
  }

  function goBack() {
    bookingStore.prevStep();
    if (currentStep === 2) {
      navigate('/');
    }
  }

  function handleSlotSelect(slot: TimeSlot) {
    bookingStore.setTimeSlot(slot.id);
  }

  function updateGuestCount(delta: number) {
    const newCount = Math.max(tour?.minGuests || 1, Math.min(tour?.maxGuests || 15, guestCount + delta));
    bookingStore.setGuestCount(newCount);
  }

  function toggleAddon(addonId: string) {
    bookingStore.toggleAddon(addonId);
  }

  function updateName(e: Event) {
    bookingStore.setContactInfo({ name: (e.target as HTMLInputElement).value });
  }

  function updatePhone(e: Event) {
    bookingStore.setContactInfo({ phone: (e.target as HTMLInputElement).value });
  }

  function continueNext() {
    if (currentStep === 2) {
      bookingStore.nextStep();
    } else if (currentStep === 3) {
      bookingStore.nextStep();
      navigate('/confirmation');
    }
  }

  const steps = [
    { number: 1, label: '选择' },
    { number: 2, label: '详情' },
    { number: 3, label: '确认' }
  ];
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
      <h1 class="font-display text-xl font-bold text-wine-800">
        {tour ? tour.name : '预订'}
      </h1>
      <div class="w-10"></div>
    </div>

    <div class="px-4 pb-4 max-w-xl mx-auto">
      <div class="flex items-center justify-between">
        {#each steps as step, index}
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              class:bg-wine-600={currentStep >= step.number}
              class:text-white={currentStep >= step.number}
              class:bg-cream-200={currentStep < step.number}
              class:text-gray-500={currentStep < step.number}
            >
              {step.number}
            </div>
            <span
              class="ml-2 text-sm transition-colors duration-300"
              class:text-wine-700={currentStep >= step.number}
              class:text-gray-500={currentStep < step.number}
            >
              {step.label}
            </span>
            {#if index < steps.length - 1}
              <div
                class="w-12 h-0.5 mx-2 transition-colors duration-300"
                class:bg-wine-500={currentStep > step.number}
                class:bg-cream-200={currentStep <= step.number}
              ></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </header>

  <main class="px-4 py-6 max-w-xl mx-auto space-y-6">
    {#if currentStep === 2}
      <div transition:fade={{ duration: 300 }}>
        <TimeSlotPicker
          timeSlots={tourTimeSlots}
          selectedSlot={selectedSlot}
          onSelect={handleSlotSelect}
        />
      </div>
    {/if}

    {#if currentStep === 3}
      <div transition:fade={{ duration: 300 }} class="space-y-6">
        <div
          class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
          transition:slide={{ duration: 400, delay: 100, y: 20 }}
        >
          <h3 class="font-display text-lg font-bold text-wine-800 mb-4 flex items-center gap-2">
            <Users class="w-5 h-5 text-wine-600" />
            访客人数
          </h3>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600">共 {guestCount} 位访客</p>
              <p class="text-sm text-gray-500 mt-1">
                最多 {tour?.maxGuests} 位，最少 {tour?.minGuests} 位
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center transition-colors hover:bg-cream-300"
                on:click={() => updateGuestCount(-1)}
                disabled={guestCount <= (tour?.minGuests || 1)}
              >
                <Minus class="w-5 h-5 text-wine-700" />
              </button>
              <span class="font-display text-2xl font-bold text-wine-800 w-8 text-center">
                {guestCount}
              </span>
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center transition-colors hover:bg-cream-300"
                on:click={() => updateGuestCount(1)}
                disabled={guestCount >= (tour?.maxGuests || 15)}
              >
                <Plus class="w-5 h-5 text-wine-700" />
              </button>
            </div>
          </div>
        </div>

        {#if availableAddons.length > 0}
          <div transition:slide={{ duration: 400, delay: 200, y: 20 }}>
            <h3 class="font-display text-lg font-bold text-wine-800 mb-4">附加服务</h3>
            <div class="space-y-3">
              {#each availableAddons as addon}
                <AddonServiceCard
                  addon={addon}
                  selected={selectedAddonIds.includes(addon.id)}
                  onToggle={() => toggleAddon(addon.id)}
                />
              {/each}
            </div>
          </div>
        {/if}

        <div
          class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
          transition:slide={{ duration: 400, delay: 300, y: 20 }}
        >
          <h3 class="font-display text-lg font-bold text-wine-800 mb-4 flex items-center gap-2">
            <Phone class="w-5 h-5 text-wine-600" />
            联系信息
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                <User class="w-4 h-4 inline mr-1" />
                姓名
              </label>
              <input
                type="text"
                value={name}
                on:input={updateName}
                placeholder="请输入您的姓名"
                class="w-full px-4 py-3 rounded-xl border-2 border-cream-200 bg-cream-50 focus:border-wine-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                <Phone class="w-4 h-4 inline mr-1" />
                手机号码
              </label>
              <input
                type="tel"
                value={phone}
                on:input={updatePhone}
                placeholder="请输入手机号码"
                class="w-full px-4 py-3 rounded-xl border-2 border-cream-200 bg-cream-50 focus:border-wine-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <div class="fixed bottom-0 left-0 right-0 bg-cream-50 border-t border-cream-200 p-4 z-20">
    <div class="max-w-xl mx-auto space-y-2">
      {#if $canProceed}
        <div class="flex items-center justify-between text-sm text-gray-600">
          <span>预估总价</span>
          <span class="font-display text-xl font-bold text-wine-700">
            ¥{$bookingPriceBreakdown.total}
          </span>
        </div>
      {/if}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!$canProceed}
        onclick={continueNext}
      >
        {currentStep === 2 ? '继续' : currentStep === 3 ? '确认预订' : '继续'}
      </Button>
    </div>
  </div>
</div>
