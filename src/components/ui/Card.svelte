<script lang="ts">
  export let hoverable = true;
  export let padded = true;
</script>

<div
  class="bg-cream-50 rounded-xl border border-cream-200 shadow-elegant transition-all duration-300 {padded ? 'p-5' : ''} {hoverable ? 'hover:shadow-card hover:-translate-y-1' : ''}"
>
  <slot />
</div>
