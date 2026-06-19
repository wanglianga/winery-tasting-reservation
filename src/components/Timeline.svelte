<script lang="ts">
  import { MapPin, Clock } from 'lucide-svelte';
  import type { TimelineStep } from '../types';

  export let steps: TimelineStep[];
  export let activeStep = 0;

  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      welcome: '👋',
      vineyard: '🍇',
      factory: '🏭',
      wine: '🍷',
      vip: '⭐',
      cellar: '🏛️',
      lab: '🔬',
      chef: '👨‍🍳',
      champagne: '🥂',
      dining: '🍽️',
      dinner: '🍴',
      dessert: '🍰'
    };
    return icons[iconName] || '📍';
  };
</script>

<div class="relative pl-8">
  {#each steps as step, index}
    <div class="relative pb-8 last:pb-0">
      {#if index < steps.length - 1}
        <div
          class="absolute left-[-1.375rem] top-6 w-0.5 h-full transition-colors duration-300"
          class:bg-champagne-400={index < activeStep}
          class:bg-cream-300={index >= activeStep}
        ></div>
      {/if}

      <div
        class="absolute left-[-1.75rem] top-0 w-7 h-7 rounded-full flex items-center justify-center text-base border-2 transition-all duration-300"
        class:bg-champagne-100={index === activeStep}
        class:border-champagne-500={index === activeStep}
        class:bg-wine-100={index < activeStep}
        class:border-wine-500={index < activeStep}
        class:bg-cream-100={index > activeStep}
        class:border-cream-300={index > activeStep}
        class:shadow-gold={index === activeStep}
      >
        {getIcon(step.icon)}
      </div>

      <div
        class="transition-all duration-300"
        class:opacity-100={index <= activeStep}
        class:opacity-60={index > activeStep}
      >
        <div class="flex items-center gap-2 mb-1">
          <h4
            class="font-display font-bold"
            class:text-wine-800={index === activeStep}
            class:text-gray-700={index !== activeStep}
          >
            {step.title}
          </h4>
          <span class="text-xs text-gray-500 flex items-center gap-1">
            <Clock class="w-3 h-3" />
            {step.duration}分钟
          </span>
        </div>

        <p class="text-sm text-gray-600 mb-2">{step.description}</p>

        <div class="flex items-center gap-1 text-xs text-oak-600">
          <MapPin class="w-3 h-3" />
          <span>{step.time}</span>
        </div>
      </div>
    </div>
  {/each}
</div>
