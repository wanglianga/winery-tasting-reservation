<script lang="ts">
  import { Clock, Footprints, Wine, Gauge, Car } from 'lucide-svelte';
  import Badge from './ui/Badge.svelte';
  import type { Tour } from '../types';

  export let tour: Tour;

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
</script>

<div class="group cursor-pointer bg-cream-50 rounded-xl border border-cream-200 overflow-hidden shadow-elegant transition-all duration-300 hover:shadow-card hover:-translate-y-1">
  <div class="relative h-44 overflow-hidden">
    <img
      src={tour.imageUrl}
      alt={tour.name}
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {#if tour.originalPrice}
      <div class="absolute top-3 left-3">
        <Badge color="wine">
          特惠
        </Badge>
      </div>
    {/if}
    <div class="absolute bottom-3 right-3 bg-cream-50/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
      <span class="font-display text-xl font-bold text-wine-700">¥{tour.price}</span>
      {#if tour.originalPrice}
        <span class="ml-2 text-sm text-gray-500 line-through">¥{tour.originalPrice}</span>
      {/if}
    </div>
  </div>

  <div class="p-4">
    <h3 class="font-display text-xl font-bold text-wine-800 mb-2">{tour.name}</h3>
    <p class="text-sm text-gray-600 mb-4 line-clamp-2">{tour.description}</p>

    <div class="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
      <div class="flex items-center gap-1">
        <Clock class="w-4 h-4 text-oak-600" />
        <span>{tour.duration}分钟</span>
      </div>
      <div class="flex items-center gap-1">
        <Footprints class="w-4 h-4 text-oak-600" />
        <span>{tour.distance}米</span>
      </div>
      <div class="flex items-center gap-1">
        <Wine class="w-4 h-4 text-wine-600" />
        <span>{tour.wineCount}款</span>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <Badge color={paceColors[tour.pace] as any} size="sm">
        <Gauge class="w-3 h-3 mr-1" />
        {paceLabels[tour.pace]}
      </Badge>
      {#if tour.drivingSuitable}
        <Badge color="vineyard" size="sm">
          <Car class="w-3 h-3 mr-1" />
          可驾车
        </Badge>
      {:else}
        <Badge color="oak" size="sm">
          <Car class="w-3 h-3 mr-1" />
          请勿驾车
        </Badge>
      {/if}
    </div>
  </div>
</div>
