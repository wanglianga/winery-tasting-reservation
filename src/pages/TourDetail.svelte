<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { ArrowLeft, Clock, Footprints, Wine, Car, AlertCircle, Lightbulb, Utensils } from 'lucide-svelte';
  import Button from '../components/ui/Button.svelte';
  import Badge from '../components/ui/Badge.svelte';
  import VineyardMap from '../components/VineyardMap.svelte';
  import Timeline from '../components/Timeline.svelte';
  import WineLabel from '../components/WineLabel.svelte';
  import { bookingStore, bookingTour } from '../stores/bookingStore';
  import { getWinesByIds } from '../data/wines';
  import type { Tour } from '../types';

  export let tour: Tour;

  let tourWines = getWinesByIds(tour.wineIds);

  const paceLabels: Record<string, string> = {
    relaxed: '轻松',
    moderate: '适中',
    intensive: '深入'
  };

  const paceColors: Record<string, string> = {
    relaxed: 'vineyard',
    moderate: 'oak',
    intensive: 'wine'
  };

  function goBack() {
    window.history.back();
  }

  function bookNow() {
    bookingStore.setStep(2);
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-cream-100 to-cream-50 pb-24">
  <div class="relative">
    <div class="h-64 overflow-hidden">
      <img
        src={tour.imageUrl}
        alt={tour.name}
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-wine-900/80 via-wine-900/40 to-transparent"></div>
    </div>

    <button
      on:click={goBack}
      class="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-elegant z-10"
      transition:fade={{ duration: 300 }}
    >
      <ArrowLeft class="w-5 h-5 text-wine-700" />
    </button>

    <div class="absolute bottom-4 left-4 right-4" transition:slide={{ duration: 400, y: 20 }}>
      <div class="flex items-center gap-2 mb-2">
        <Badge color={paceColors[tour.pace] as any}>
          {paceLabels[tour.pace]}节奏
        </Badge>
        {#if tour.originalPrice}
          <Badge color="wine">
            限时特惠
          </Badge>
        {/if}
      </div>
      <h1 class="font-display text-3xl font-bold text-white mb-1">{tour.name}</h1>
      <div class="flex items-center gap-2 text-cream-200">
        <span class="font-display text-2xl font-bold text-champagne-300">¥{tour.price}</span>
        {#if tour.originalPrice}
          <span class="text-cream-300 line-through">¥{tour.originalPrice}</span>
        {/if}
        <span class="text-sm">/ 位</span>
      </div>
    </div>
  </div>

  <main class="px-4 py-6 space-y-8 -mt-4 relative z-10">
    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 200, y: 20 }}
    >
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="w-10 h-10 rounded-full bg-oak-100 flex items-center justify-center mx-auto mb-2">
            <Clock class="w-5 h-5 text-oak-600" />
          </div>
          <p class="font-display text-xl font-bold text-wine-800">{tour.duration}</p>
          <p class="text-xs text-gray-500">分钟</p>
        </div>
        <div>
          <div class="w-10 h-10 rounded-full bg-vineyard-100 flex items-center justify-center mx-auto mb-2">
            <Footprints class="w-5 h-5 text-vineyard-600" />
          </div>
          <p class="font-display text-xl font-bold text-wine-800">{tour.distance}</p>
          <p class="text-xs text-gray-500">米</p>
        </div>
        <div>
          <div class="w-10 h-10 rounded-full bg-wine-100 flex items-center justify-center mx-auto mb-2">
            <Wine class="w-5 h-5 text-wine-600" />
          </div>
          <p class="font-display text-xl font-bold text-wine-800">{tour.wineCount}</p>
          <p class="text-xs text-gray-500">款佳酿</p>
        </div>
      </div>
    </div>

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 300, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-3">行程介绍</h2>
      <p class="text-gray-600 leading-relaxed">{tour.description}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        {#each tour.highlights as highlight}
          <span class="px-3 py-1 bg-champagne-100 text-champagne-700 rounded-full text-sm">
            ✨ {highlight}
          </span>
        {/each}
      </div>
    </div>

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 400, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-wine-100 flex items-center justify-center text-sm">🗺️</span>
        酒庄地图
      </h2>
      <VineyardMap points={tour.mapPoints} height={200} />
    </div>

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 500, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-wine-100 flex items-center justify-center text-sm">📋</span>
        行程安排
      </h2>
      <Timeline steps={tour.timeline} activeStep={0} />
    </div>

    <div
      transition:slide={{ duration: 400, delay: 600, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-wine-100 flex items-center justify-center text-sm">🍷</span>
        品鉴酒单
      </h2>
      <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
        {#each tourWines as wine}
          <WineLabel {wine} />
        {/each}
      </div>
    </div>

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 700, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-3 flex items-center gap-2">
        <Lightbulb class="w-5 h-5 text-oak-500" />
        醒酒建议
      </h2>
      <ul class="space-y-2">
        {#each tour.decantingTips as tip, index}
          <li class="flex items-start gap-2 text-gray-600">
            <span class="w-5 h-5 rounded-full bg-oak-100 text-oak-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            {tip}
          </li>
        {/each}
      </ul>
    </div>

    <div
      class="bg-cream-50 rounded-2xl p-5 shadow-elegant"
      transition:slide={{ duration: 400, delay: 800, y: 20 }}
    >
      <h2 class="font-display text-xl font-bold text-wine-800 mb-3 flex items-center gap-2">
        <Utensils class="w-5 h-5 text-oak-500" />
        品鉴搭配建议
      </h2>
      <ul class="space-y-2">
        {#each tour.pairingSuggestions as suggestion, index}
          <li class="flex items-start gap-2 text-gray-600">
            <span class="w-5 h-5 rounded-full bg-vineyard-100 text-vineyard-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            {suggestion}
          </li>
        {/each}
      </ul>
    </div>

    {#if !tour.drivingSuitable}
      <div
        class="bg-wine-50 border border-wine-200 rounded-2xl p-5"
        transition:slide={{ duration: 400, delay: 900, y: 20 }}
      >
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-wine-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle class="w-5 h-5 text-wine-600" />
          </div>
          <div>
            <h3 class="font-bold text-wine-800 mb-1">请勿驾车</h3>
            <p class="text-sm text-wine-700">
              此品鉴行程包含多款葡萄酒品鉴，为了您的安全，请勿驾车前来。
              我们提供市区往返接送服务，可在预订时选择。
            </p>
            <div class="mt-3 flex items-center gap-2 text-wine-600 text-sm">
              <Car class="w-4 h-4" />
              <span>可选择接送服务 +¥188</span>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </main>

  <div class="fixed bottom-0 left-0 right-0 bg-cream-50 border-t border-cream-200 p-4 z-20">
    <div class="max-w-xl mx-auto">
      <Button
        variant="primary"
        size="lg"
        class="w-full"
        on:click={bookNow}
      >
        立即预订
        <span class="ml-2 font-display">¥{tour.price}</span>
      </Button>
    </div>
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
