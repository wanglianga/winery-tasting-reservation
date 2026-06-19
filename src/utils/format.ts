export const formatPrice = (price: number, currency: string = 'CNY'): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? '下午' : '上午';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${period} ${displayHour}:${minutes}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `约${hours}小时`;
  }
  return `约${hours}小时${mins}分钟`;
};

export const formatDate = (dateString: string, format: 'short' | 'long' | 'full' = 'short'): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? '2-digit' : 'long',
    day: '2-digit',
    weekday: format === 'full' ? 'long' : undefined
  };
  return date.toLocaleDateString('zh-CN', options);
};

export const formatDateRelative = (dateString: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '明天';
  if (diffDays === 2) return '后天';
  if (diffDays === -1) return '昨天';
  if (diffDays < 0) return `${Math.abs(diffDays)}天前`;
  if (diffDays <= 7) return `${diffDays}天后`;

  return formatDate(dateString, 'short');
};

export const formatDateTime = (dateString: string, timeString?: string): string => {
  const date = formatDate(dateString, 'long');
  const time = timeString ? formatTime(timeString) : '';
  return `${date} ${time}`.trim();
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${meters}米`;
  }
  return `${(meters / 1000).toFixed(1)}公里`;
};

export const formatAbv = (abv: number): string => {
  return `${abv.toFixed(1)}%`;
};

export const formatDecantingTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}分钟`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}小时`;
  }
  return `${hours}小时${mins}分钟`;
};

export const formatGuests = (count: number): string => {
  return `${count}位客人`;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  }
  return phone;
};

export const formatBookingId = (id: string): string => {
  return id.toUpperCase().replace(/[^A-Z0-9]/g, '');
};

export const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    available: '可预订',
    limited: '紧张',
    full: '已满',
    closed: '已关闭',
    pending: '待确认',
    confirmed: '已确认',
    in_progress: '进行中',
    completed: '已完成',
    cancelled: '已取消',
    busy: '服务中',
    off: '休息',
    training: '培训中',
    occupied: '使用中',
    reserved: '已预留',
    cleaning: '清洁中'
  };
  return statusMap[status] || status;
};

export const formatPace = (pace: string): string => {
  const paceMap: Record<string, string> = {
    relaxed: '轻松',
    moderate: '适中',
    intensive: '紧凑'
  };
  return paceMap[pace] || pace;
};
