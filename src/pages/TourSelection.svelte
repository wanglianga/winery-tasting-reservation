<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import TourCard from '../components/TourCard.svelte';
  import VineyardMap from '../components/VineyardMap.svelte';
  import Button from '../components/ui/Button.svelte';
  import { tours } from '../data/tours';
  import { bookingStore } from '../stores/bookingStore';
  import { navigate } from '../lib/router';

  function selectTour(tourId: string) {
    bookingStore.setTour(tourId);
    const tour = tours.find(t => t.id === tourId);
    if (tour) {
      navigate(`/tour/${tour.slug}`);
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-cream-100 to-cream-50">
  <header class="relative overflow-hidden bg-wine-800 text-white py-12 px-6">
    <div class="absolute inset-0 opacity-20">
      <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <pattern id="grapePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="3" fill="#C9A961" opacity="0.6" />
            <circle cx="22" cy="22" r="2" fill="#C9A961" opacity="0.4" />
            <circle cx="8" cy="22" r="2" fill="#C9A961" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#grapePattern)" />
      </svg>
    </div>

    <div class="relative z-10 text-center max-w-lg mx-auto">
      <h1
        transition:fade={{ duration: 600 }}
        class="font-display text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-champagne-200 to-champagne-400 bg-clip-text text-transparent"
      >
        拉菲酒庄
      </h1>
      <p
        transition:slide={{ duration: 500, delay: 200, y: 20 }}
        class="font-body text-cream-200 text-lg"
      >
        品味百年传承，探索葡萄美酒的奥秘
      </p>
      <div
        transition:fade={{ duration: 500, delay: 400 }}
        class="mt-4 flex justify-center gap-2"
      >
        <span class="px-3 py-1 bg-champagne-500/20 rounded-full text-champagne-200 text-sm">
          🍇 有机种植
        </span>
        <span class="px-3 py-1 bg-champagne-500/20 rounded-full text-champagne-200 text-sm">
          🏆 百年名庄
        </span>
        <span class="px-3 py-1 bg-champagne-500/20 rounded-full text-champagne-200 text-sm">
          🌟 专业导览
        </span>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-cream-100 to-transparent"></div>
  </header>

  <main class="px-4 py-8 max-w-6xl mx-auto">
    <section
      transition:slide={{ duration: 500, delay: 600, y: 30 }}
      class="mb-10"
    >
      <h2 class="font-display text-2xl font-bold text-wine-800 mb-2 text-center">
        选择您的品鉴之旅
      </h2>
      <p class="text-gray-600 text-center mb-6">
        从轻松入门到深度探索，总有一款适合您
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each tours as tour, index}
          <button
            type="button"
            transition:slide={{ duration: 500, delay: 800 + index * 150, y: 30 }}
            on:click={() => selectTour(tour.id)}
            class="text-left"
          >
            <TourCard {tour} />
          </button>
        {/each}
      </div>
    </section>

    <section
      transition:fade={{ duration: 500, delay: 1400 }}
      class="mb-8"
    >
      <h3 class="font-display text-xl font-bold text-wine-800 mb-4 flex items-center justify-center gap-2">
        <span class="w-8 h-8 rounded-full bg-wine-100 flex items-center justify-center">🗺️</span>
        酒庄导览
      </h3>
      <div class="max-w-2xl mx-auto">
        <VineyardMap points={tours[0]?.mapPoints || []} height={180} />
      </div>
    </section>

    <section
      transition:fade={{ duration: 500, delay: 1600 }}
      class="text-center py-8 border-t border-cream-200"
    >
      <p class="text-gray-500 text-sm mb-4">需要帮助选择？</p>
      <Button variant="outline" size="sm">
        联系我们的品鉴顾问
      </Button>
    </section>
  </main>
</div>
