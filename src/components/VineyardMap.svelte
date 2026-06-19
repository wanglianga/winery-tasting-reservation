<script lang="ts">
  import { onMount } from 'svelte';
  import type { MapPoint } from '../types';

  export let points: MapPoint[] = [];
  export let height = 200;

  let hoveredPoint: MapPoint | null = null;
  let pathD = '';
  let showPaths = false;

  const typeColors: Record<string, string> = {
    vineyard: '#4F7A4F',
    cellar: '#8B6914',
    tasting: '#7B2838',
    dining: '#C9A961',
    giftshop: '#AB863D',
    factory: '#6A5210'
  };

  const typeLabels: Record<string, string> = {
    vineyard: '葡萄园',
    cellar: '酒窖',
    tasting: '品酒室',
    dining: '餐厅',
    giftshop: '礼品店',
    factory: '车间'
  };

  onMount(() => {
    if (points.length >= 2) {
      pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    }
    setTimeout(() => {
      showPaths = true;
    }, 100);
  });

  const getPathLength = () => {
    return 1000;
  };
</script>

<div class="relative w-full bg-cream-100 rounded-xl overflow-hidden" style="height: {height}px">
  <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <pattern id="vineyardPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="0.8" fill="#4F7A4F" opacity="0.2" />
      </pattern>
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect x="0" y="0" width="100" height="100" fill="url(#vineyardPattern)" />

    {#if showPaths && pathD}
      <path
        d={pathD}
        fill="none"
        stroke="#C9A961"
        stroke-width="0.8"
        stroke-dasharray="1000"
        stroke-dashoffset="1000"
        class="transition-all duration-1500 ease-out"
        style:stroke-dashoffset="0"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    {/if}

    {#each points as point, index}
      <g
        role="button"
        tabindex="0"
        class="cursor-pointer transition-all duration-300"
        on:mouseenter={() => (hoveredPoint = point)}
        on:mouseleave={() => (hoveredPoint = null)}
        on:focus={() => (hoveredPoint = point)}
        on:blur={() => (hoveredPoint = null)}
        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); } }}
      >
        <circle
          cx={point.x}
          cy={point.y}
          r={hoveredPoint?.id === point.id ? "3" : "2"}
          fill={typeColors[point.type]}
          stroke="white"
          stroke-width="0.5"
          filter={hoveredPoint?.id === point.id ? "url(#glow)" : undefined}
          class="transition-all duration-300"
        />
        {#if index === 0 || index === points.length - 1}
          <text
            x={point.x}
            y={point.y - 4}
            text-anchor="middle"
            font-size="2.5"
            fill="#7B2838"
            font-weight="bold"
          >
            {index + 1}
          </text>
        {/if}
      </g>
    {/each}
  </svg>

  {#if hoveredPoint}
    <div
      class="absolute z-10 bg-white px-3 py-2 rounded-lg shadow-card text-sm pointer-events-none animate-fade-in"
      style="left: {hoveredPoint.x}%; top: {hoveredPoint.y}%; transform: translate(-50%, -120%)"
    >
      <p class="font-bold text-wine-800">{hoveredPoint.name}</p>
      <p class="text-xs text-gray-500">{typeLabels[hoveredPoint.type]}</p>
    </div>
  {/if}

  <div class="absolute bottom-2 right-2 flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
    {#each Object.entries(typeLabels) as [type, label]}
      {#if points.some(p => p.type === type)}
        <div class="flex items-center gap-1 text-xs">
          <div class="w-2 h-2 rounded-full" style="background-color: {typeColors[type]}"></div>
          <span class="text-gray-600">{label}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>
