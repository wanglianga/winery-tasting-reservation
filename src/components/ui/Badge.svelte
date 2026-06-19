<script lang="ts">
  type Color = 'wine' | 'oak' | 'vineyard' | 'champagne' | 'gray';

  export let color: Color = 'wine';
  export let size: 'sm' | 'md' = 'md';

  const colorClasses: Record<Color, string> = {
    wine: 'bg-wine-100 text-wine-700',
    oak: 'bg-oak-100 text-oak-700',
    vineyard: 'bg-vineyard-100 text-vineyard-700',
    champagne: 'bg-champagne-100 text-champagne-700',
    gray: 'bg-gray-100 text-gray-700'
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };
</script>

<span
  class="inline-flex items-center font-medium rounded-full {colorClasses[color]} {sizeClasses[size]}"
>
  <slot />
</span>
