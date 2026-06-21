<script lang="ts">
  import { onMount } from 'svelte';
  import { router, navigate, matchPath } from './lib/router';
  import { bookingStore } from './stores/bookingStore';
  import { getTourById, getTourBySlug } from './data/tours';
  import type { Tour } from './types';
  import TourSelection from './pages/TourSelection.svelte';
  import TourDetail from './pages/TourDetail.svelte';
  import Booking from './pages/Booking.svelte';
  import Confirmation from './pages/Confirmation.svelte';
  import Success from './pages/Success.svelte';
  import Reception from './pages/Reception.svelte';

  let currentPath = '/';
  let currentTour: Tour | null = null;
  let routeParams: Record<string, string> = {};

  $: {
    currentPath = $router;
    currentTour = $bookingStore.tourId ? (getTourById($bookingStore.tourId) || null) : null;
  }

  $: currentPage = resolvePage(currentPath);

  function resolvePage(path: string): string {
    if (path === '/') return 'home';
    if (path === '/booking') return 'booking';
    if (path === '/confirmation') return 'confirmation';
    if (path === '/success') return 'success';
    if (path === '/reception') return 'reception';
    if (matchPath('/tour/:slug', path)) return 'tour-detail';
    if (matchPath('/tour/id/:id', path)) return 'tour-detail';
    return 'home';
  }

  $: {
    if (currentPage === 'tour-detail') {
      const slugMatch = matchPath('/tour/:slug', currentPath);
      const idMatch = matchPath('/tour/id/:id', currentPath);
      if (slugMatch) {
        const tour = getTourBySlug(slugMatch.slug);
        if (tour) {
          routeParams = slugMatch;
          bookingStore.setTour(tour.id);
          currentTour = tour;
        }
      } else if (idMatch) {
        const tour = getTourById(idMatch.id);
        if (tour) {
          routeParams = idMatch;
          bookingStore.setTour(tour.id);
          currentTour = tour;
        }
      }
    } else {
      routeParams = {};
    }
  }

  onMount(() => {
    router.init();
  });
</script>

{#if currentPage === 'reception'}
  <div class="min-h-screen bg-cream-100">
    <Reception />
  </div>
{:else if currentPage === 'home'}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    <TourSelection />
  </div>
{:else if currentPage === 'tour-detail' && currentTour}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    <TourDetail tour={currentTour} />
  </div>
{:else if currentPage === 'booking'}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    {#if currentTour}
      <Booking />
    {:else}
      <TourSelection />
    {/if}
  </div>
{:else if currentPage === 'confirmation'}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    {#if currentTour}
      <Confirmation />
    {:else}
      <TourSelection />
    {/if}
  </div>
{:else if currentPage === 'success'}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    {#if currentTour}
      <Success />
    {:else}
      <TourSelection />
    {/if}
  </div>
{:else}
  <div class="min-h-screen max-w-xl mx-auto bg-cream-50">
    <TourSelection />
  </div>
{/if}
