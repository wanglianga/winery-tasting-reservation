<script lang="ts">
  import { Car, Wine } from 'lucide-svelte';
  import type { AddonService } from '../types';

  export let addon: AddonService;
  export let selected = false;
  export let onToggle: () => void = () => {};

  const icons: Record<string, any> = {
    camera: Car,
    gift: Wine,
    user: Car,
    car: Car,
    utensils: Wine
  };

  const getIcon = () => {
    if (addon.id === 'addon-transport') return Car;
    if (addon.id === 'addon-private') return Car;
    return Wine;
  };
</script>

<button
  type="button"
  class="w-full p-4 rounded-xl border-2 transition-all duration-300 text-left"
  class:border-wine-500={selected}
  class:bg-wine-50={selected}
  class:border-cream-200={!selected}
  class:bg-cream-50={!selected}
  on:click={onToggle}
>
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0">
      <div
        class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
        class:bg-wine-100={selected}
        class:bg-cream-200={!selected}
      >
        {#if addon.id === 'addon-transport'}
          <span class={selected ? 'text-wine-600' : 'text-oak-600'}>
            <Car class="w-5 h-5 transition-colors duration-200" />
          </span>
        {:else}
          <span class={selected ? 'text-wine-600' : 'text-oak-600'}>
            <Wine class="w-5 h-5 transition-colors duration-200" />
          </span>
        {/if}
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between mb-1">
        <h4
          class="font-display font-bold text-lg"
          class:text-wine-800={selected}
          class:text-gray-800={!selected}
        >
          {addon.name}
        </h4>
        <span
          class="font-bold"
          class:text-wine-600={selected}
          class:text-oak-600={!selected}
        >
          ¥{addon.price}
        </span>
      </div>
      <p class="text-sm text-gray-600">{addon.description}</p>
    </div>

    <div class="flex-shrink-0">
      <div
        class="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200"
        class:border-wine-500={selected}
        class:bg-wine-500={selected}
        class:border-gray-300={!selected}
        class:bg-white={!selected}
      >
        {#if selected}
          <svg class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        {/if}
      </div>
    </div>
  </div>
</button>
