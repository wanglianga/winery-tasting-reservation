import type { Wine } from '../types';

export const wines: Wine[] = [
  {
    id: 'wine-001',
    name: 'Château Margaux',
    vintage: 2018,
    variety: 'Cabernet Sauvignon Blend',
    region: 'Bordeaux',
    country: 'France',
    tastingNotes: [
      '黑加仑',
      '雪松',
      '紫罗兰',
      '石墨',
      '淡淡的香草'
    ],
    decantingTime: 120,
    abv: 13.5,
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=600&fit=crop',
    description: '来自波尔多梅多克产区的顶级红葡萄酒，以其优雅和复杂的口感著称。2018年是一个卓越的年份，这款酒展现出完美的平衡和悠长的余味。',
    foodPairing: ['烤牛排', '松露意面', '陈年奶酪']
  },
  {
    id: 'wine-002',
    name: 'Domaine de la Romanée-Conti',
    vintage: 2019,
    variety: 'Pinot Noir',
    region: 'Burgundy',
    country: 'France',
    tastingNotes: [
      '红樱桃',
      '野草莓',
      '玫瑰花瓣',
      '森林地表',
      '香料'
    ],
    decantingTime: 90,
    abv: 13.0,
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=600&fit=crop',
    description: '勃艮第夜丘产区的传奇黑皮诺，被誉为"酒中之王"。2019年份展现出惊人的细腻度和层次感，是收藏级的珍品。',
    foodPairing: ['烤羊排', '松露鸡', '软质奶酪']
  },
  {
    id: 'wine-003',
    name: 'Dr. Loosen Wehlener Sonnenuhr',
    vintage: 2020,
    variety: 'Riesling Kabinett',
    region: 'Mosel',
    country: 'Germany',
    tastingNotes: [
      '青苹果',
      '白桃',
      '柑橘',
      '矿物质',
      '蜂蜜'
    ],
    decantingTime: 30,
    abv: 8.5,
    price: 280,
    imageUrl: 'https://images.unsplash.com/photo-1558001373-7b93ee46cf0f?w=400&h=600&fit=crop',
    description: '德国摩泽尔产区的经典雷司令，来自著名的日晷园。这款酒酸度清新，果香浓郁，甜酸平衡恰到好处。',
    foodPairing: ['清蒸鱼', '泰国菜', '蓝纹奶酪']
  },
  {
    id: 'wine-004',
    name: 'Opus One',
    vintage: 2019,
    variety: 'Bordeaux Blend',
    region: 'Napa Valley',
    country: 'United States',
    tastingNotes: [
      '黑樱桃',
      '摩卡咖啡',
      '黑巧克力',
      '烟草',
      '橡木'
    ],
    decantingTime: 150,
    abv: 14.5,
    price: 680,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=600&fit=crop',
    description: '纳帕谷的标志性波尔多混酿，由罗斯柴尔德家族与蒙大维酒庄合作打造。酒体饱满，结构宏大，具有极佳的陈年潜力。',
    foodPairing: ['和牛牛排', '红酒炖牛肉', '硬质奶酪']
  },
  {
    id: 'wine-005',
    name: 'Vega Sicilia Único',
    vintage: 2011,
    variety: 'Tempranillo Blend',
    region: 'Ribera del Duero',
    country: 'Spain',
    tastingNotes: [
      '黑醋栗',
      '李子',
      '皮革',
      '烟草',
      '香草'
    ],
    decantingTime: 180,
    abv: 14.0,
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=600&fit=crop',
    description: '西班牙杜罗河谷的顶级丹魄混酿，被誉为"西班牙的拉菲"。经过多年橡木桶和瓶中陈年，展现出无与伦比的复杂度。',
    foodPairing: ['烤乳猪', '伊比利亚火腿', '曼彻格奶酪']
  },
  {
    id: 'wine-006',
    name: 'Cloudy Bay Sauvignon Blanc',
    vintage: 2022,
    variety: 'Sauvignon Blanc',
    region: 'Marlborough',
    country: 'New Zealand',
    tastingNotes: [
      '百香果',
      '番石榴',
      '青柠',
      '青草',
      '矿物质'
    ],
    decantingTime: 15,
    abv: 12.5,
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1566854530180-cfc59b455d74?w=400&h=600&fit=crop',
    description: '新西兰马尔堡产区的标杆长相思，以其浓郁的热带水果香气和清爽的酸度闻名于世。',
    foodPairing: ['生蚝', '清蒸海鲜', '山羊奶酪沙拉']
  },
  {
    id: 'wine-007',
    name: 'Gaja Barbaresco',
    vintage: 2018,
    variety: 'Nebbiolo',
    region: 'Piedmont',
    country: 'Italy',
    tastingNotes: [
      '红玫瑰',
      '红樱桃',
      '松露',
      '皮革',
      '甘草'
    ],
    decantingTime: 120,
    abv: 14.0,
    price: 720,
    imageUrl: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=600&fit=crop',
    description: '意大利皮埃蒙特产区的顶级内比奥罗，由传奇酒庄Gaja出品。结构坚实，单宁细腻，具有惊人的陈年潜力。',
    foodPairing: ['红酒烩牛肉', '黑松露意饭', '帕玛森奶酪']
  },
  {
    id: 'wine-008',
    name: 'Château d\'Yquem',
    vintage: 2017,
    variety: 'Sémillon Blend',
    region: 'Sauternes',
    country: 'France',
    tastingNotes: [
      '杏干',
      '蜂蜜',
      '橙花',
      '焦糖',
      '坚果'
    ],
    decantingTime: 60,
    abv: 13.5,
    price: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=600&fit=crop',
    description: '波尔多苏玳产区的贵腐甜白之王，是世界上最著名的甜酒。2017年是一个优秀的年份，甜度与酸度完美平衡。',
    foodPairing: ['鹅肝', '蓝纹奶酪', '焦糖布丁']
  }
];

export const getWineById = (id: string): Wine | undefined => {
  return wines.find(wine => wine.id === id);
};

export const getWinesByIds = (ids: string[]): Wine[] => {
  return ids.map(id => getWineById(id)).filter(Boolean) as Wine[];
};
