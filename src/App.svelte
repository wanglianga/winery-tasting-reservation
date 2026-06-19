<script lang="ts">
  import { Router, Route, navigate } from 'svelte-routing';
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';
  import TourSelection from './pages/TourSelection.svelte';
  import TourDetail from './pages/TourDetail.svelte';
  import Booking from './pages/Booking.svelte';
  import Confirmation from './pages/Confirmation.svelte';
  import Success from './pages/Success.svelte';
  import Reception from './pages/Reception.svelte';
  import { bookingStore, bookingTour } from './stores/bookingStore';
  import { getTourById, getTourBySlug } from './data/tours';
  import type { Tour } from './types';

  let currentTour: Tour | null = null;
  let currentPath = '/';
  let unsubscribe: (() => void) | null = null;
  let isReception = false;

  $: {
    isReception = currentPath.includes('/reception');
    const state = $bookingStore;
    if (state.tourId) {
      currentTour = getTourById(state.tourId) || null;
    } else {
      currentTour = null;
    }
  }

  onMount(() => {
    currentPath = window.location.pathname;
    handleRouteChange(currentPath);

    unsubscribe = bookingStore.subscribe((state) => {
      if (state.step === 2 && state.tourId && !window.location.pathname.includes('/booking') && !window.location.pathname.includes('/tour/') && !window.location.pathname.includes('/reception')) {
        navigate('/booking', { replace: true });
      }
      if (state.step === 4 && !window.location.pathname.includes('/confirmation') && !window.location.pathname.includes('/reception')) {
        navigate('/confirmation', { replace: true });
      }
      if (state.step === 5 && !window.location.pathname.includes('/success') && !window.location.pathname.includes('/reception')) {
        navigate('/success', { replace: true });
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function handleRouteChange(path: string) {
    currentPath = path;
  }

  function loadTourBySlug(slug: string): Tour | undefined {
    const tour = getTourBySlug(slug);
    if (tour) {
      bookingStore.setTour(tour.id);
      currentTour = tour;
    }
    return tour;
  }

  function loadTourById(id: string): Tour | undefined {
    const tour = getTourById(id);
    if (tour) {
      bookingStore.setTour(tour.id);
      currentTour = tour;
    }
    return tour;
  }
</script>

<Router url={currentPath}>
  {#if isReception}
    <div in:fade={{ duration: 300 }} class="min-h-screen bg-cream-100">
      <Route path="/reception">
        <Reception />
      </Route>
    </div>
  {:else}
    <div
      in:fade={{ duration: 300 }}
      class="min-h-screen max-w-xl mx-auto bg-cream-50"
    >
      <Route path="/">
        <TourSelection />
      </Route>

      <Route path="/tour/:slug" let:params={params}>
        {#if params.slug && loadTourBySlug(params.slug)}
          <TourDetail tour={currentTour!} />
        {:else}
          <TourSelection />
        {/if}
      </Route>

      <Route path="/tour/id/:id" let:params={params}>
        {#if params.id && loadTourById(params.id)}
          <TourDetail tour={currentTour!} />
        {:else}
          <TourSelection />
        {/if}
      </Route>

      <Route path="/booking">
        {#if currentTour}
          <Booking />
        {:else}
          <TourSelection />
        {/if}
      </Route>

      <Route path="/confirmation">
        {#if currentTour}
          <Confirmation />
        {:else}
          <TourSelection />
        {/if}
      </Route>

      <Route path="/success">
        {#if currentTour}
          <Success />
        {:else}
          <TourSelection />
        {/if}
      </Route>
    </div>
  {/if}
</Router>
