<script lang="ts">
  import type { Wine } from '../types';

  export let wine: Wine;

  const getImageUrl = (id: string) => {
    const seed = encodeURIComponent(id);
    return `https://picsum.photos/seed/${seed}/400/600`;
  };
</script>

<div class="perspective-1000 w-40 h-60 flex-shrink-0">
  <div class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d hover:rotate-y-180">
    <div class="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-card bg-wine-800">
      <div class="relative w-full h-full">
        <img
          src={getImageUrl(wine.id)}
          alt={wine.name}
          class="w-full h-full object-cover opacity-90"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-wine-900/90 via-wine-900/30 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h4 class="font-display text-lg font-bold leading-tight">{wine.name}</h4>
          <p class="text-champagne-300 text-sm mt-1">{wine.vintage} · {wine.variety}</p>
        </div>
      </div>
    </div>

    <div class="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-card bg-cream-50 rotate-y-180 p-4 flex flex-col">
      <div class="mb-3">
        <h4 class="font-display text-base font-bold text-wine-800 leading-tight">{wine.name}</h4>
        <p class="text-xs text-gray-500 mt-0.5">{wine.region}, {wine.country}</p>
      </div>

      <div class="flex gap-4 text-xs text-gray-600 mb-3">
        <div>
          <span class="text-wine-600 font-medium">ABV</span>
          <p class="font-bold">{wine.abv}%</p>
        </div>
        <div>
          <span class="text-wine-600 font-medium">醒酒</span>
          <p class="font-bold">{wine.decantingTime}分钟</p>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <p class="text-xs text-wine-600 font-medium mb-1">品鉴笔记</p>
        <div class="flex flex-wrap gap-1">
          {#each wine.tastingNotes.slice(0, 4) as note}
            <span class="text-xs bg-cream-200 text-gray-700 px-2 py-0.5 rounded-full">
              {note}
            </span>
          {/each}
        </div>
      </div>

      <div class="mt-2 pt-2 border-t border-cream-200">
        <p class="text-right font-display text-lg font-bold text-wine-700">¥{wine.price}</p>
      </div>
    </div>
  </div>
</div>

<style>
  .perspective-1000 {
    perspective: 1000px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  .hover\:rotate-y-180:hover {
    transform: rotateY(180deg);
  }
</style>
