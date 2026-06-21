<script lang="ts">
  import { fade, slide, scale } from 'svelte/transition';
  import { CheckCircle, Calendar, Clock, Users, MapPin, Ticket } from 'lucide-svelte';
  import Button from '../components/ui/Button.svelte';
  import { bookingStore, bookingTour, bookingTimeSlot } from '../stores/bookingStore';
  import { navigate } from '../lib/router';
  import type { Tour, TimeSlot, Booking } from '../types';

  let tour: Tour | null = null;
  let timeSlot: TimeSlot | null = null;
  let booking: Booking | null = null;
  let showAnimation = true;

  $: {
    const state = $bookingStore;
    tour = $bookingTour;
    timeSlot = $bookingTimeSlot;
    booking = state.currentBooking;
  }

  function viewBooking() {
    alert('查看预订详情功能');
  }

  function backToHome() {
    bookingStore.reset();
    navigate('/');
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`;
  }

  function generateQRPlaceholder() {
    const id = booking?.id || 'booking';
    const seed = encodeURIComponent(id);
    return `https://picsum.photos/seed/${seed}/200/200`;
  }
</script>

<div class="min-h-screen bg-gradient-to-b from-cream-100 to-cream-50">
  <main class="px-4 py-8 max-w-xl mx-auto">
    <div class="text-center mb-8" transition:fade={{ duration: 600 }}>
      <div
        class="relative inline-block mb-6"
        transition:scale={{ duration: 500, delay: 200, start: 0.5 }}
      >
        <div class="w-24 h-24 rounded-full bg-vineyard-100 flex items-center justify-center">
          <CheckCircle class="w-16 h-16 text-vineyard-600" stroke-width={1.5} />
        </div>
        <div class="absolute inset-0 rounded-full bg-vineyard-500/20 animate-ping"></div>
      </div>

      <h1
        class="font-display text-3xl font-bold text-wine-800 mb-2"
        transition:slide={{ duration: 500, delay: 400, y: 20 }}
      >
        预订成功！
      </h1>
      <p
        class="text-gray-600"
        transition:fade={{ duration: 500, delay: 600 }}
      >
        我们已发送确认信息至您的手机
      </p>
    </div>

    <div
      class="bg-cream-50 rounded-2xl overflow-hidden shadow-card mb-6"
      transition:slide={{ duration: 500, delay: 500, y: 30 }}
    >
      <div class="bg-gradient-to-r from-wine-700 to-wine-800 p-5 text-white">
        <div class="flex items-center justify-between mb-2">
          <span class="text-champagne-300 text-sm">预订编号</span>
          <div class="flex items-center gap-1 text-champagne-300">
            <Ticket class="w-4 h-4" />
            <span class="font-mono text-sm">{booking?.id.toUpperCase().slice(0, 12)}</span>
          </div>
        </div>
        <h2 class="font-display text-2xl font-bold">{tour?.name}</h2>
      </div>

      <div class="p-5">
        <div class="flex justify-center mb-5">
          <div class="w-40 h-40 bg-white p-2 rounded-xl shadow-elegant">
            <img
              src={generateQRPlaceholder()}
              alt="QR Code"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-wine-100 flex items-center justify-center flex-shrink-0">
              <Calendar class="w-5 h-5 text-wine-600" />
            </div>
            <div>
              <p class="text-sm text-gray-500">日期</p>
              <p class="font-medium text-gray-800">{timeSlot ? formatDate(timeSlot.date) : '-'}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-oak-100 flex items-center justify-center flex-shrink-0">
              <Clock class="w-5 h-5 text-oak-600" />
            </div>
            <div>
              <p class="text-sm text-gray-500">时间</p>
              <p class="font-medium text-gray-800">{timeSlot?.time || '-'}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-vineyard-100 flex items-center justify-center flex-shrink-0">
              <Users class="w-5 h-5 text-vineyard-600" />
            </div>
            <div>
              <p class="text-sm text-gray-500">访客</p>
              <p class="font-medium text-gray-800">{booking?.guestCount || 0} 位</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center flex-shrink-0">
              <MapPin class="w-5 h-5 text-champagne-600" />
            </div>
            <div>
              <p class="text-sm text-gray-500">集合地点</p>
              <p class="font-medium text-gray-800">酒庄主接待中心</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t-2 border-dashed border-cream-200 px-5 py-4 flex items-center justify-between">
        <span class="text-gray-600">预订总价</span>
        <span class="font-display text-2xl font-bold text-wine-700">¥{booking?.totalPrice || 0}</span>
      </div>
    </div>

    <div
      class="bg-oak-50 border border-oak-200 rounded-2xl p-4 mb-6"
      transition:fade={{ duration: 500, delay: 700 }}
    >
      <p class="text-sm text-oak-700">
        <span class="font-medium">温馨提示：</span>
        请在行程开始前15分钟到达接待中心签到。建议穿着舒适的鞋子，部分行程涉及步行。
      </p>
    </div>

    <div
      class="space-y-3"
      transition:slide={{ duration: 500, delay: 800, y: 20 }}
    >
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onclick={viewBooking}
      >
        查看预订
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="w-full"
        href="/"
        onclick={backToHome}
      >
        返回首页
      </Button>
    </div>
  </main>
</div>
