import type { Tour } from '../types';

export const tours: Tour[] = [
  {
    id: 'tour-casual',
    name: '轻松参观',
    slug: 'casual',
    description: '适合初次到访的客人，轻松愉快的酒庄入门体验。在专业导游带领下，了解酒庄历史和基础酿酒知识，品尝两款精选佳酿。',
    duration: 60,
    distance: 500,
    wineCount: 2,
    drivingSuitable: true,
    pace: 'relaxed',
    price: 298,
    originalPrice: 358,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&h=500&fit=crop',
    timeline: [
      {
        id: 'tl-1-1',
        time: '00:00',
        title: '欢迎签到',
        description: '在酒庄接待处签到，领取参观手册和欢迎饮品',
        duration: 10,
        icon: 'welcome'
      },
      {
        id: 'tl-1-2',
        time: '00:10',
        title: '葡萄园漫步',
        description: '参观葡萄园，了解葡萄品种和种植知识',
        duration: 20,
        icon: 'vineyard'
      },
      {
        id: 'tl-1-3',
        time: '00:30',
        title: '酿酒车间',
        description: '参观现代化酿酒车间，了解酿酒工艺流程',
        duration: 15,
        icon: 'factory'
      },
      {
        id: 'tl-1-4',
        time: '00:45',
        title: '品酒体验',
        description: '在专业品酒师指导下，品尝两款精选葡萄酒',
        duration: 15,
        icon: 'wine'
      }
    ],
    mapPoints: [
      {
        id: 'mp-1-1',
        name: '接待中心',
        description: '酒庄主入口，游客签到和咨询处',
        x: 10,
        y: 50,
        type: 'giftshop'
      },
      {
        id: 'mp-1-2',
        name: '赤霞珠葡萄园',
        description: '种植于1998年的赤霞珠葡萄园',
        x: 30,
        y: 30,
        type: 'vineyard'
      },
      {
        id: 'mp-1-3',
        name: '酿酒车间',
        description: '现代化葡萄酒酿造设施',
        x: 50,
        y: 60,
        type: 'cellar'
      },
      {
        id: 'mp-1-4',
        name: '主品酒室',
        description: '优雅的品酒区域',
        x: 70,
        y: 40,
        type: 'tasting'
      }
    ],
    wineIds: ['wine-001', 'wine-006'],
    pairingSuggestions: [
      '清淡的白葡萄酒适合搭配海鲜和白肉',
      '红葡萄酒适合搭配红肉和野味',
      '品酒时由轻到重，循序渐进'
    ],
    decantingTips: [
      '年轻的白葡萄酒通常不需要醒酒',
      '冰镇后饮用口感更佳',
      '建议饮用温度：白葡萄酒8-12°C'
    ],
    highlights: [
      '适合驾车人士',
      '轻松无压力',
      '专业导览',
      '入门级体验'
    ],
    maxGuests: 15,
    minGuests: 1,
    availableAddons: ['addon-photo', 'addon-souvenir']
  },
  {
    id: 'tour-professional',
    name: '专业品评',
    slug: 'professional',
    description: '为葡萄酒爱好者设计的深度体验。深入了解酿酒工艺，学习专业品酒技巧，品尝五款来自不同产区的精选葡萄酒。',
    duration: 120,
    distance: 1200,
    wineCount: 5,
    drivingSuitable: false,
    pace: 'moderate',
    price: 598,
    originalPrice: 698,
    imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&h=500&fit=crop',
    timeline: [
      {
        id: 'tl-2-1',
        time: '00:00',
        title: 'VIP接待',
        description: '专属接待，领取专业品酒套装',
        duration: 10,
        icon: 'vip'
      },
      {
        id: 'tl-2-2',
        time: '00:10',
        title: '葡萄园深度游',
        description: '参观多个葡萄园区块，了解土壤和微气候对葡萄的影响',
        duration: 30,
        icon: 'vineyard'
      },
      {
        id: 'tl-2-3',
        time: '00:40',
        title: '酒窖探秘',
        description: '进入地下酒窖，了解橡木桶陈酿和瓶中陈年过程',
        duration: 20,
        icon: 'cellar'
      },
      {
        id: 'tl-2-4',
        time: '01:00',
        title: '酿酒实验室',
        description: '参观实验室，了解葡萄酒调配和品质控制',
        duration: 15,
        icon: 'lab'
      },
      {
        id: 'tl-2-5',
        time: '01:15',
        title: '专业品酒课',
        description: '学习品酒技巧，品尝五款精选葡萄酒并做笔记',
        duration: 45,
        icon: 'wine'
      }
    ],
    mapPoints: [
      {
        id: 'mp-2-1',
        name: 'VIP接待中心',
        description: '高端游客专属接待区域',
        x: 15,
        y: 45,
        type: 'giftshop'
      },
      {
        id: 'mp-2-2',
        name: '老藤葡萄园',
        description: '树龄超过50年的珍稀葡萄藤',
        x: 25,
        y: 20,
        type: 'vineyard'
      },
      {
        id: 'mp-2-3',
        name: '霞多丽园',
        description: '向阳坡地的霞多丽葡萄园',
        x: 40,
        y: 35,
        type: 'vineyard'
      },
      {
        id: 'mp-2-4',
        name: '地下酒窖',
        description: '恒温恒湿的陈年酒窖',
        x: 55,
        y: 65,
        type: 'cellar'
      },
      {
        id: 'mp-2-5',
        name: '酿酒实验室',
        description: '葡萄酒品质分析中心',
        x: 65,
        y: 50,
        type: 'cellar'
      },
      {
        id: 'mp-2-6',
        name: '专业品酒室',
        description: '配备专业品酒设备的品鉴室',
        x: 80,
        y: 35,
        type: 'tasting'
      }
    ],
    wineIds: ['wine-001', 'wine-002', 'wine-004', 'wine-006', 'wine-007'],
    pairingSuggestions: [
      '根据酒体轻重搭配相应的食物',
      '高单宁红葡萄酒适合搭配高脂肪食物',
      '高酸度白葡萄酒适合搭配油腻食物',
      '甜酒适合搭配蓝纹奶酪或甜点'
    ],
    decantingTips: [
      '年轻的红葡萄酒建议醒酒1-2小时',
      '陈年葡萄酒需要小心换瓶去除沉淀',
      '不同品种的葡萄酒醒酒时间不同',
      '醒酒过程中可以观察酒的变化'
    ],
    highlights: [
      '五款佳酿品鉴',
      '专业品酒课程',
      '地下酒窖参观',
      '专属品酒笔记'
    ],
    maxGuests: 10,
    minGuests: 2,
    availableAddons: ['addon-photo', 'addon-souvenir', 'addon-private', 'addon-transport']
  },
  {
    id: 'tour-cellar-deep',
    name: '酒窖深度游',
    slug: 'cellar-deep',
    description: '终极葡萄酒朝圣之旅。探索酒庄最深处的秘密，与酿酒师面对面交流，品尝七款稀世珍酿，体验垂直年份品鉴。',
    duration: 180,
    distance: 1800,
    wineCount: 7,
    drivingSuitable: false,
    pace: 'intensive',
    price: 1288,
    originalPrice: 1588,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=500&fit=crop',
    timeline: [
      {
        id: 'tl-3-1',
        time: '00:00',
        title: '私人接待',
        description: '专属管家接待，赠送定制礼品',
        duration: 15,
        icon: 'vip'
      },
      {
        id: 'tl-3-2',
        time: '00:15',
        title: '全园参观',
        description: '参观所有葡萄园区块，了解不同风土特色',
        duration: 40,
        icon: 'vineyard'
      },
      {
        id: 'tl-3-3',
        time: '00:55',
        title: '酿酒师分享',
        description: '与首席酿酒师面对面交流，了解酿造哲学',
        duration: 25,
        icon: 'chef'
      },
      {
        id: 'tl-3-4',
        time: '01:20',
        title: '神秘酒窖',
        description: '探访不对外开放的珍藏酒窖',
        duration: 20,
        icon: 'cellar'
      },
      {
        id: 'tl-3-5',
        time: '01:40',
        title: '橡木桶车间',
        description: '了解橡木桶制作和对葡萄酒的影响',
        duration: 15,
        icon: 'factory'
      },
      {
        id: 'tl-3-6',
        time: '01:55',
        title: '珍藏品鉴',
        description: '品尝七款稀世珍酿，包括垂直年份对比',
        duration: 65,
        icon: 'wine'
      }
    ],
    mapPoints: [
      {
        id: 'mp-3-1',
        name: '私人会所',
        description: 'VIP会员专属接待会所',
        x: 12,
        y: 48,
        type: 'dining'
      },
      {
        id: 'mp-3-2',
        name: '名园区块',
        description: '酒庄最精华的葡萄园',
        x: 22,
        y: 18,
        type: 'vineyard'
      },
      {
        id: 'mp-3-3',
        name: '实验园',
        description: '新品种和新种植方式试验区',
        x: 35,
        y: 28,
        type: 'vineyard'
      },
      {
        id: 'mp-3-4',
        name: '首席酿酒师办公室',
        description: '酿酒研发中心',
        x: 50,
        y: 45,
        type: 'cellar'
      },
      {
        id: 'mp-3-5',
        name: '珍藏酒窖',
        description: '存放稀有年份和限量版葡萄酒',
        x: 60,
        y: 70,
        type: 'cellar'
      },
      {
        id: 'mp-3-6',
        name: '橡木桶车间',
        description: '橡木桶维护和更新区域',
        x: 72,
        y: 55,
        type: 'factory'
      },
      {
        id: 'mp-3-7',
        name: 'VIP品鉴室',
        description: '私密的高端品鉴空间',
        x: 85,
        y: 40,
        type: 'tasting'
      }
    ],
    wineIds: ['wine-001', 'wine-002', 'wine-003', 'wine-004', 'wine-005', 'wine-007', 'wine-008'],
    pairingSuggestions: [
      '老年份葡萄酒适合搭配简单精致的食物',
      '复杂的葡萄酒需要简单的食物来衬托',
      '垂直年份品鉴可以感受年份差异',
      '品鉴时注意记录每款酒的特点'
    ],
    decantingTips: [
      '老年份葡萄酒醒酒需要特别小心',
      '建议提前4-6小时开始醒酒过程',
      '使用宽底醒酒器增加与空气接触面积',
      '珍贵的老酒可以在品鉴前才开瓶'
    ],
    highlights: [
      '七款稀世珍酿',
      '酿酒师面对面',
      '珍藏酒窖探访',
      '垂直年份品鉴',
      '定制礼品套装'
    ],
    maxGuests: 6,
    minGuests: 2,
    availableAddons: ['addon-photo', 'addon-souvenir', 'addon-private', 'addon-transport', 'addon-dinner']
  },
  {
    id: 'tour-dinner',
    name: '晚餐套餐',
    slug: 'dinner',
    description: '沉浸式美食美酒体验。由行政总厨定制的六道式菜单，每道菜都由侍酒师精心搭配一款葡萄酒，打造难忘的味蕾盛宴。',
    duration: 240,
    distance: 300,
    wineCount: 6,
    drivingSuitable: false,
    pace: 'relaxed',
    price: 1888,
    originalPrice: 2288,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop',
    timeline: [
      {
        id: 'tl-4-1',
        time: '00:00',
        title: '香槟欢迎',
        description: '在观景露台享用欢迎香槟和开胃小食',
        duration: 30,
        icon: 'champagne'
      },
      {
        id: 'tl-4-2',
        time: '00:30',
        title: '餐前参观',
        description: '简短参观酒窖，了解今晚配餐葡萄酒的故事',
        duration: 20,
        icon: 'cellar'
      },
      {
        id: 'tl-4-3',
        time: '00:50',
        title: '入席就座',
        description: '在私人餐厅就座，侍酒师介绍今晚菜单',
        duration: 10,
        icon: 'dining'
      },
      {
        id: 'tl-4-4',
        time: '01:00',
        title: '六道式晚宴',
        description: '行政总厨定制菜单，每道菜搭配精选葡萄酒',
        duration: 120,
        icon: 'dinner'
      },
      {
        id: 'tl-4-5',
        time: '03:00',
        title: '甜品时光',
        description: '餐后甜点和咖啡，搭配贵腐甜酒',
        duration: 30,
        icon: 'dessert'
      }
    ],
    mapPoints: [
      {
        id: 'mp-4-1',
        name: '观景露台',
        description: '俯瞰葡萄园的美丽露台',
        x: 20,
        y: 30,
        type: 'dining'
      },
      {
        id: 'mp-4-2',
        name: '主酒窖',
        description: '展示今晚配餐葡萄酒',
        x: 45,
        y: 55,
        type: 'cellar'
      },
      {
        id: 'mp-4-3',
        name: '主厨餐厅',
        description: '私密的高端餐厅，最多容纳12位客人',
        x: 75,
        y: 45,
        type: 'dining'
      }
    ],
    wineIds: ['wine-003', 'wine-006', 'wine-001', 'wine-004', 'wine-007', 'wine-008'],
    pairingSuggestions: [
      '开胃酒选择清爽的气泡酒或白葡萄酒',
      '前菜搭配清爽的白葡萄酒',
      '主菜搭配酒体饱满的红葡萄酒',
      '奶酪课程搭配中等酒体的红葡萄酒',
      '甜点搭配甜酒'
    ],
    decantingTips: [
      '晚宴用酒需要提前准备妥当',
      '红葡萄酒根据年份提前醒酒',
      '白葡萄酒和甜酒需要适当冰镇',
      '侍酒温度直接影响品鉴体验'
    ],
    highlights: [
      '六道式主厨菜单',
      '六款佳酿配餐',
      '专属侍酒师',
      '私人餐厅',
      '难忘的美食体验'
    ],
    maxGuests: 12,
    minGuests: 2,
    availableAddons: ['addon-photo', 'addon-souvenir', 'addon-private', 'addon-transport']
  }
];

export const addonServices = [
  {
    id: 'addon-photo',
    name: '专业摄影',
    description: '全程跟拍，赠送高清电子照片',
    price: 298,
    icon: 'camera'
  },
  {
    id: 'addon-souvenir',
    name: '定制礼品',
    description: '酒庄定制礼品套装，含精选葡萄酒',
    price: 588,
    icon: 'gift'
  },
  {
    id: 'addon-private',
    name: '私人导览',
    description: '专属导游，独立成团，时间灵活',
    price: 400,
    icon: 'user'
  },
  {
    id: 'addon-transport',
    name: '接送服务',
    description: '市区酒店往返接送',
    price: 188,
    icon: 'car'
  },
  {
    id: 'addon-dinner',
    name: '酒庄晚餐',
    description: '参观结束后享用酒庄餐厅晚餐',
    price: 688,
    icon: 'utensils'
  }
];

export const getTourById = (id: string): Tour | undefined => {
  return tours.find(tour => tour.id === id);
};

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getAddonById = (id: string) => {
  return addonServices.find(addon => addon.id === id);
};

export const getAddonsByIds = (ids: string[]) => {
  return ids.map(id => getAddonById(id)).filter(Boolean);
};
