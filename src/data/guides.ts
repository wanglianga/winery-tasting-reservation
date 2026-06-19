import type { Guide } from '../types';

export const guides: Guide[] = [
  {
    id: 'guide-001',
    name: '张明远',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    languages: ['中文', 'English', '日本語'],
    specialties: ['波尔多葡萄酒', '勃艮第黑皮诺', '垂直年份品鉴'],
    status: 'available',
    rating: 4.9,
    experience: 12,
    bio: '毕业于法国波尔多大学葡萄酒专业，WSET四级品酒师。曾在多家名庄工作，对旧世界葡萄酒有深入研究。'
  },
  {
    id: 'guide-002',
    name: '李思琪',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    languages: ['中文', 'English', 'Français'],
    specialties: ['意大利葡萄酒', '餐酒搭配', '甜酒鉴赏'],
    status: 'busy',
    rating: 4.8,
    experience: 8,
    bio: '意大利侍酒师协会认证侍酒师，曾在米其林三星餐厅担任侍酒师，擅长打造完美的餐酒搭配体验。'
  },
  {
    id: 'guide-003',
    name: '王浩然',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    languages: ['中文', 'English'],
    specialties: ['新世界葡萄酒', '澳大利亚西拉', '阿根廷马尔贝克'],
    status: 'available',
    rating: 4.7,
    experience: 6,
    bio: 'WSET三级品酒师，热爱新世界葡萄酒的热情与奔放。曾走访澳大利亚、智利、阿根廷等多个产酒国。'
  },
  {
    id: 'guide-004',
    name: '陈雨萱',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    languages: ['中文', 'English', '한국어'],
    specialties: ['德国雷司令', '阿尔萨斯白葡萄酒', '起泡酒'],
    status: 'training',
    rating: 4.6,
    experience: 4,
    bio: '德国盖森海姆大学葡萄酒硕士，对白葡萄酒和起泡酒有独到见解。目前正在进修WSET四级课程。'
  },
  {
    id: 'guide-005',
    name: '刘建国',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    languages: ['中文', 'English', 'Español'],
    specialties: ['西班牙里奥哈', '葡萄牙波特酒', '雪莉酒'],
    status: 'off',
    rating: 4.9,
    experience: 15,
    bio: '酒庄资深品酒师，拥有超过15年的行业经验。对伊比利亚半岛的葡萄酒文化有精深研究，是团队中的灵魂人物。'
  }
];

export const getGuideById = (id: string): Guide | undefined => {
  return guides.find(guide => guide.id === id);
};

export const getAvailableGuides = (): Guide[] => {
  return guides.filter(guide => guide.status === 'available');
};

export const getGuidesByLanguage = (language: string): Guide[] => {
  return guides.filter(guide => guide.languages.includes(language));
};

export const getGuidesBySpecialty = (specialty: string): Guide[] => {
  return guides.filter(guide => guide.specialties.some(s => s.includes(specialty)));
};
