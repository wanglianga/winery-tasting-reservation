<script lang="ts">
  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';

  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let loading = false;
  export let disabled = false;
  export let href: string | undefined = undefined;
  export let type: 'button' | 'submit' | 'reset' = 'button';

  const baseClasses = 'inline-flex items-center justify-center font-body font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses: Record<Variant, string> = {
    primary: 'bg-wine-600 text-white hover:bg-wine-700 focus:ring-wine-500 shadow-elegant',
    secondary: 'bg-oak-600 text-white hover:bg-oak-700 focus:ring-oak-500 shadow-elegant',
    outline: 'border-2 border-wine-600 text-wine-600 hover:bg-wine-50 focus:ring-wine-500',
    ghost: 'text-wine-600 hover:bg-wine-50 focus:ring-wine-500'
  };

  const sizeClasses: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-7 py-3.5 text-lg gap-2.5'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';
</script>

{#if href}
  <a
    {href}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {disabled || loading ? disabledClasses : ''}"
  >
    {#if loading}
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    {/if}
    <slot />
  </a>
{:else}
  <button
    {type}
    {disabled}
    class="{baseClasses} {variantClasses[variant]} {sizeClasses[size]} {disabled || loading ? disabledClasses : ''}"
  >
    {#if loading}
      <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    {/if}
    <slot />
  </button>
{/if}
