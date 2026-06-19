<script lang="ts">
  import { fade, slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Button from '../components/ui/Button.svelte';
  import Card from '../components/ui/Card.svelte';
  import Badge from '../components/ui/Badge.svelte';
  import { receptionStore, todayStats, bookingsWithDetails, filteredBookings, tableStats } from '../stores/receptionStore';
  import { guides } from '../data/guides';
  import { tables } from '../data/tables';
  import { formatTime, formatPrice, formatStatus } from '../utils/format';
  import type { Booking, Guide, Table } from '../types';
  import {
    Users,
    Calendar,
    Wine,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Loader,
    User,
    Phone,
    UtensilsCrossed,
    MapPin,
    ChevronRight,
    MoreVertical,
    Search,
    Filter
  } from 'lucide-svelte';

  let searchQuery = '';
  let selectedDate = new Date().toISOString().split('T')[0];
  let activeTab: 'bookings' | 'guides' | 'tables' | 'capacity' = 'bookings';
  let selectedBooking: Booking | null = null;

  $: $filteredBookings = { date: selectedDate, search: searchQuery };
  $: stats = $todayStats;
  $: bookings = $bookingsWithDetails;
  $: tStats = $tableStats;

  function assignGuide(bookingId: string, guideId: string) {
    receptionStore.assignGuideToBooking(bookingId, guideId);
  }

  function assignTable(bookingId: string, tableId: string) {
    receptionStore.assignTableToBooking(bookingId, tableId);
  }

  function updateBookingStatus(bookingId: string, status: Booking['status']) {
    receptionStore.updateBookingStatus(bookingId, status);
  }

  function updateGuideStatus(guideId: string, status: Guide['status']) {
    receptionStore.updateGuideStatus(guideId, status);
  }

  function updateTableStatus(tableId: string, status: Table['status']) {
    receptionStore.updateTableStatus(tableId, status);
  }

  function getStatusColor(status: Booking['status']) {
    switch (status) {
      case 'confirmed': return 'bg-vineyard-500';
      case 'pending': return 'bg-oak-500';
      case 'completed': return 'bg-gray-400';
      case 'cancelled': return 'bg-wine-500';
      default: return 'bg-gray-400';
    }
  }

  function getGuideStatusColor(status: Guide['status']) {
    switch (status) {
      case 'available': return 'bg-vineyard-500';
      case 'assigned': return 'bg-oak-500';
      case 'off': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  }

  function getTableStatusColor(status: Table['status']) {
    switch (status) {
      case 'available': return 'bg-vineyard-500';
      case 'preparing': return 'bg-oak-500';
      case 'occupied': return 'bg-wine-500';
      case 'cleaning': return 'bg-champagne-500';
      default: return 'bg-gray-400';
    }
  }

  function getAvailableGuides(): Guide[] {
    return guides.filter(g => g.status === 'available');
  }

  function getAvailableTables(capacity: number): Table[] {
    return tables.filter(t => t.status === 'available' && t.capacity >= capacity);
  }

  function generateDateOptions() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        value: d.toISOString().split('T')[0],
        label: d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })
      });
    }
    return dates;
  }

  const dateOptions = generateDateOptions();

  function getCapacityBgClass(color: string): string {
    switch (color) {
      case 'vineyard': return 'bg-vineyard-500';
      case 'wine': return 'bg-wine-500';
      case 'oak': return 'bg-oak-500';
      case 'champagne': return 'bg-champagne-500';
      default: return 'bg-gray-500';
    }
  }

  const capacitySchedule = [
    { time: '10:00', type: '散客', count: 12, color: 'vineyard' },
    { time: '11:30', type: '团队', count: 20, color: 'wine' },
    { time: '14:00', type: '散客', count: 15, color: 'vineyard' },
    { time: '15:30', type: '散客', count: 10, color: 'vineyard' },
    { time: '17:00', type: 'VIP', count: 6, color: 'oak' },
    { time: '19:00', type: '晚餐套餐', count: 18, color: 'champagne' },
  ];
</script>

<div class="min-h-screen bg-cream-100">
  <header class="bg-wine-800 text-white px-6 py-4 shadow-lg">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-champagne-500 flex items-center justify-center text-wine-800 font-bold text-lg">
          🍷
        </div>
        <div>
          <h1 class="font-display text-2xl font-bold">酒庄接待中心</h1>
          <p class="text-cream-300 text-sm">运营调度管理平台</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="text-sm text-cream-300">今日</p>
          <p class="font-display text-xl">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-wine-700 flex items-center justify-center">
          <User class="w-5 h-5" />
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto p-6">
    <section
      transition:slide={{ duration: 400, y: 20 }}
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
    >
      <Card class="p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">今日预约</p>
            <p class="font-display text-3xl font-bold text-wine-700 mt-1">{stats.totalBookings}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-wine-100 flex items-center justify-center">
            <Calendar class="w-6 h-6 text-wine-600" />
          </div>
        </div>
        <div class="mt-3 flex items-center gap-2 text-sm">
          <Badge color="vineyard" size="sm">{stats.confirmed} 已确认</Badge>
          <Badge color="oak" size="sm">{stats.pending} 待处理</Badge>
        </div>
      </Card>

      <Card class="p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">来访客人</p>
            <p class="font-display text-3xl font-bold text-oak-700 mt-1">{stats.totalGuests}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-oak-100 flex items-center justify-center">
            <Users class="w-6 h-6 text-oak-600" />
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-500">平均每组 {stats.totalBookings ? Math.round(stats.totalGuests / stats.totalBookings) : 0} 人</p>
      </Card>

      <Card class="p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">预计营收</p>
            <p class="font-display text-3xl font-bold text-champagne-700 mt-1">{formatPrice(stats.totalRevenue)}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-champagne-100 flex items-center justify-center">
            <Wine class="w-6 h-6 text-champagne-600" />
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-500">含附加服务 {formatPrice(stats.addonRevenue)}</p>
      </Card>

      <Card class="p-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">酒窖容量</p>
            <p class="font-display text-3xl font-bold text-vineyard-700 mt-1">{tStats.occupied}/{tables.length}</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-vineyard-100 flex items-center justify-center">
            <MapPin class="w-6 h-6 text-vineyard-600" />
          </div>
        </div>
        <div class="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-vineyard-500 transition-all duration-500"
            style="width: {(tStats.occupied / tables.length) * 100}%"
          ></div>
        </div>
      </Card>
    </section>

    <div class="flex items-center gap-2 mb-6 border-b border-cream-300">
      {#each ['bookings', 'guides', 'tables', 'capacity'] as tab}
        <button
          on:click={() => activeTab = tab}
          class="px-4 py-3 font-medium transition-colors relative {activeTab === tab ? 'text-wine-700' : 'text-gray-500 hover:text-gray-700'}"
        >
          {tab === 'bookings' && '预约管理'}
          {tab === 'guides' && '讲解员排班'}
          {tab === 'tables' && '餐桌状态'}
          {tab === 'capacity' && '容量监控'}
          {#if activeTab === tab}
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-wine-600"></div>
          {/if}
        </button>
      {/each}
    </div>

    {#if activeTab === 'bookings'}
      <div
        transition:fade={{ duration: 300 }}
      >
        <div class="flex flex-col md:flex-row gap-4 mb-4">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="搜索客人姓名、电话..."
              class="w-full pl-10 pr-4 py-2.5 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500/30 focus:border-wine-500 bg-white"
            />
          </div>
          <div class="flex gap-2">
            <Filter class="w-5 h-5 text-gray-500 self-center" />
            <select
              bind:value={selectedDate}
              class="px-4 py-2.5 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500/30 focus:border-wine-500 bg-white"
            >
              {#each dateOptions as opt}
                <option value={opt.value}>{opt.label}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-3">
            {#if bookings.length === 0}
              <Card class="p-10 text-center">
                <Calendar class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p class="text-gray-500">暂无预约记录</p>
              </Card>
            {:else}
              {#each bookings as booking, index}
                <div
                  transition:slide={{ duration: 300, delay: index * 50, y: 20 }}
                >
                  <Card
                    class="p-5 hover:shadow-elegant transition-shadow cursor-pointer {selectedBooking?.id === booking.id ? 'ring-2 ring-wine-500' : ''}"
                    on:click={() => selectedBooking = booking}
                  >
                  <div class="flex items-start justify-between">
                    <div class="flex items-start gap-4">
                      <div class="w-12 h-12 rounded-full bg-cream-200 flex items-center justify-center flex-shrink-0">
                        <span class="text-xl">{booking.tour?.id?.includes('dinner') ? '🍽️' : booking.tour?.id?.includes('cellar') ? '🏛️' : booking.tour?.id?.includes('professional') ? '🍷' : '🌿'}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                          <h3 class="font-display font-bold text-lg text-wine-800">{booking.guestName}</h3>
                          <span class="w-2 h-2 rounded-full {getStatusColor(booking.status)}"></span>
                          <Badge size="sm" color={booking.status === 'confirmed' ? 'vineyard' : booking.status === 'pending' ? 'oak' : 'gray'}>
                            {formatStatus(booking.status)}
                          </Badge>
                        </div>
                        <p class="text-gray-600 mb-2">{booking.tour?.name}</p>
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span class="flex items-center gap-1">
                            <Calendar class="w-4 h-4" />
                            {booking.date}
                          </span>
                          <span class="flex items-center gap-1">
                            <Clock class="w-4 h-4" />
                            {booking.timeSlotId ? formatTime(booking.timeSlotId.split('_')[1] || '10:00') : '未安排'}
                          </span>
                          <span class="flex items-center gap-1">
                            <Users class="w-4 h-4" />
                            {booking.guestCount} 人
                          </span>
                          <span class="flex items-center gap-1">
                            <Phone class="w-4 h-4" />
                            {booking.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-display font-bold text-xl text-wine-700">{formatPrice(booking.totalPrice)}</p>
                      {#if booking.addons?.length > 0}
                        <p class="text-xs text-gray-500 mt-1">含 {booking.addons.filter(a => a.selected).length} 项附加服务</p>
                      {/if}
                      <button class="mt-2 text-champagne-600 hover:text-champagne-700">
                        <MoreVertical class="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {#if selectedBooking?.id === booking.id}
                    <div transition:slide={{ duration: 200, y: -10 }} class="mt-4 pt-4 border-t border-cream-200">
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label for={`guide-${booking.id}`} class="block text-sm font-medium text-gray-600 mb-2">分配讲解员</label>
                          <select
                            id={`guide-${booking.id}`}
                            on:change={(e) => assignGuide(booking.id, (e.target as HTMLSelectElement).value)}
                            class="w-full px-3 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500/30"
                            value={booking.guideId || ''}
                          >
                            <option value="">未分配</option>
                            {#each getAvailableGuides() as guide}
                              <option value={guide.id}>{guide.name} ({guide.languages.join(', ')})</option>
                            {/each}
                          </select>
                        </div>
                        <div>
                          <label for={`table-${booking.id}`} class="block text-sm font-medium text-gray-600 mb-2">安排餐桌</label>
                          <select
                            id={`table-${booking.id}`}
                            on:change={(e) => assignTable(booking.id, (e.target as HTMLSelectElement).value)}
                            class="w-full px-3 py-2 border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500/30"
                            value={booking.tableId || ''}
                          >
                            <option value="">未安排</option>
                            {#each getAvailableTables(booking.guestCount) as table}
                              <option value={table.id}>桌号 {table.number} (容纳 {table.capacity} 人)</option>
                            {/each}
                          </select>
                        </div>
                        <div>
                          <div class="block text-sm font-medium text-gray-600 mb-2">更新状态</div>
                          <div class="flex gap-2">
                            {#if booking.status === 'pending'}
                              <Button size="sm" variant="primary" on:click={() => updateBookingStatus(booking.id, 'confirmed')}>
                                确认
                              </Button>
                              <Button size="sm" variant="outline" on:click={() => updateBookingStatus(booking.id, 'cancelled')}>
                                取消
                              </Button>
                            {:else if booking.status === 'confirmed'}
                              <Button size="sm" variant="primary" on:click={() => updateBookingStatus(booking.id, 'completed')}>
                                完成
                              </Button>
                            {/if}
                          </div>
                        </div>
                      </div>
                    </div>
                  {/if}
                </Card>
                </div>
              {/each}
            {/if}
          </div>

          <div class="space-y-4">
            <Card class="p-5">
              <h3 class="font-display font-bold text-lg text-wine-800 mb-4">团客避让提醒</h3>
              {#each bookings.filter(b => b.guestCount >= 8) as groupBooking}
                <div class="flex items-start gap-3 mb-3 pb-3 border-b border-cream-200 last:border-0 last:mb-0 last:pb-0">
                  <div class="w-8 h-8 rounded-full bg-wine-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle class="w-4 h-4 text-wine-600" />
                  </div>
                  <div>
                    <p class="font-medium text-wine-800">{groupBooking.guestName} - {groupBooking.guestCount} 人团</p>
                    <p class="text-sm text-gray-500">{groupBooking.date} {groupBooking.timeSlotId ? formatTime(groupBooking.timeSlotId.split('_')[1]) : ''}</p>
                    <p class="text-xs text-oak-600 mt-1">⚠️ 请协调散客时段避让</p>
                  </div>
                </div>
              {:else}
                <p class="text-gray-500 text-sm">今日暂无大型团队</p>
              {/each}
            </Card>

            <Card class="p-5">
              <h3 class="font-display font-bold text-lg text-wine-800 mb-4">即将到达</h3>
              {#each bookings.filter(b => b.status === 'confirmed').slice(0, 3) as upcoming}
                <div class="flex items-center gap-3 mb-3 pb-3 border-b border-cream-200 last:border-0 last:mb-0 last:pb-0">
                  <div class="w-10 h-10 rounded-full bg-vineyard-100 flex items-center justify-center">
                    <CheckCircle class="w-5 h-5 text-vineyard-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-800 truncate">{upcoming.guestName}</p>
                    <p class="text-sm text-gray-500">{upcoming.tour?.name}</p>
                  </div>
                  <Badge color="champagne" size="sm">{upcoming.guestCount}人</Badge>
                </div>
              {:else}
                <p class="text-gray-500 text-sm">暂无即将到达的客人</p>
              {/each}
            </Card>
          </div>
        </div>
      </div>
    {/if}

    {#if activeTab === 'guides'}
      <div transition:fade={{ duration: 300 }} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each guides as guide, index}
          <div
            transition:slide={{ duration: 300, delay: index * 50, y: 20 }}
          >
            <Card class="p-5">
            <div class="flex items-start gap-4">
              <img
                src={guide.avatar || `https://picsum.photos/seed/${guide.id}/100/100`}
                alt={guide.name}
                class="w-16 h-16 rounded-full object-cover border-2 border-cream-200"
              />
              <div class="flex-1">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-display font-bold text-lg text-wine-800">{guide.name}</h3>
                  <span class="w-3 h-3 rounded-full {getGuideStatusColor(guide.status)}" title={guide.status}></span>
                </div>
                <p class="text-sm text-gray-500 mb-2">
                  ⭐ {guide.rating?.toFixed(1) || '5.0'} · {guide.experience || '5'}年经验
                </p>
                <div class="flex flex-wrap gap-1 mb-3">
                  {#each guide.languages as lang}
                    <Badge color="wine" size="sm">{lang}</Badge>
                  {/each}
                </div>
                <div class="flex flex-wrap gap-1 mb-3">
                  {#each guide.specialties as spec}
                    <span class="text-xs bg-cream-200 text-gray-600 px-2 py-0.5 rounded">{spec}</span>
                  {/each}
                </div>
                <select
                  on:change={(e) => updateGuideStatus(guide.id, (e.target as HTMLSelectElement).value as Guide['status'])}
                  class="w-full px-3 py-2 text-sm border border-cream-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-500/30"
                  value={guide.status}
                >
                  <option value="available">在岗待命</option>
                  <option value="assigned">已分配</option>
                  <option value="off">休息</option>
                </select>
              </div>
            </div>
          </Card>
          </div>
        {/each}
      </div>
    {/if}

    {#if activeTab === 'tables'}
      <div transition:fade={{ duration: 300 }} class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {#each tables as table, index}
          <div
            transition:slide={{ duration: 300, delay: index * 30, y: 20 }}
          >
            <Card class="p-4 text-center">
            <div class="w-16 h-16 mx-auto mb-3 rounded-full {table.status === 'available' ? 'bg-vineyard-100' : table.status === 'preparing' ? 'bg-oak-100' : table.status === 'occupied' ? 'bg-wine-100' : 'bg-champagne-100'} flex items-center justify-center">
              <UtensilsCrossed class="w-7 h-7 {table.status === 'available' ? 'text-vineyard-600' : table.status === 'preparing' ? 'text-oak-600' : table.status === 'occupied' ? 'text-wine-600' : 'text-champagne-600'}" />
            </div>
            <h3 class="font-display font-bold text-xl text-wine-800">桌号 {table.number}</h3>
            <p class="text-sm text-gray-500 mb-2">容纳 {table.capacity} 人</p>
            <p class="text-xs text-gray-400 mb-3">{table.location || '主品酒室'}</p>
            <div class="flex items-center justify-center gap-1 mb-3">
              <span class="w-2 h-2 rounded-full {getTableStatusColor(table.status)}"></span>
              <span class="text-sm font-medium text-gray-600">
                {table.status === 'available' ? '空闲' : table.status === 'preparing' ? '准备中' : table.status === 'occupied' ? '使用中' : '清洁中'}
              </span>
            </div>
            <select
              on:change={(e) => updateTableStatus(table.id, (e.target as HTMLSelectElement).value as Table['status'])}
              class="w-full px-2 py-1.5 text-xs border border-cream-300 rounded focus:outline-none focus:ring-2 focus:ring-wine-500/30"
              value={table.status}
            >
              <option value="available">空闲</option>
              <option value="preparing">准备中</option>
              <option value="occupied">使用中</option>
              <option value="cleaning">清洁中</option>
            </select>
          </Card>
          </div>
        {/each}
      </div>
    {/if}

    {#if activeTab === 'capacity'}
      <div transition:fade={{ duration: 300 }}>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card class="p-6">
            <h3 class="font-display font-bold text-xl text-wine-800 mb-4">酒窖时段容量监控</h3>
            <div class="space-y-4">
              {#each ['10:00', '12:00', '14:00', '16:00', '18:00'] as time}
                <div>
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-gray-700">{formatTime(time)}</span>
                    <span class="text-sm text-gray-500">
                      {Math.floor(Math.random() * 15) + 5}/{20 + Math.floor(Math.random() * 10)} 人
                    </span>
                  </div>
                  <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
                    {#each [Math.floor(Math.random() * 60) + 30] as percent}
                      <div
                        class="h-full transition-all duration-500 {percent > 85 ? 'bg-wine-500' : percent > 70 ? 'bg-oak-500' : 'bg-vineyard-500'}"
                        style="width: {percent}%"
                      ></div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
            <div class="mt-4 flex gap-4 text-sm">
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-vineyard-500"></span>
                充足
              </span>
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-oak-500"></span>
                紧张
              </span>
              <span class="flex items-center gap-1">
                <span class="w-3 h-3 rounded-full bg-wine-500"></span>
                预警
              </span>
            </div>
          </Card>

          <Card class="p-6">
            <h3 class="font-display font-bold text-xl text-wine-800 mb-4">团客散客时段分配</h3>
            <div class="space-y-3">
              {#each capacitySchedule as item, i}
                <div class="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                  <div class="w-20 font-mono text-lg font-bold text-wine-700">{formatTime(item.time)}</div>
                  <Badge color={item.color}>{item.type}</Badge>
                  <div class="flex-1">
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        class="h-full {getCapacityBgClass(item.color)}"
                        style="width: {(item.count / 30) * 100}%"
                      ></div>
                    </div>
                  </div>
                  <span class="font-bold text-gray-700 w-12 text-right">{item.count}人</span>
                </div>
              {/each}
            </div>
          </Card>
        </div>
      </div>
    {/if}
  </div>
</div>
