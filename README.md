# 酒庄品鉴预约系统 - 访客移动端

## 项目简介

基于 Svelte 5 + TypeScript + Tailwind CSS 构建的酒庄品鉴预约系统访客移动端界面，提供优雅的葡萄酒品鉴行程选择、预订和确认体验。

## 技术栈

- **框架**: Svelte 5 + TypeScript
- **样式**: Tailwind CSS 3
- **路由**: svelte-routing
- **图标**: lucide-svelte
- **构建工具**: Vite
- **包管理**: npm

## 原始需求

> 请制作酒庄品鉴路线与酒窖预约页面，用 Svelte 呈现葡萄园步道、酒款年份、品鉴杯序、酒窖时段、醒酒提示、餐食搭配、代驾和寄酒服务。游客在手机上选择轻松参观、专业品评、酒窖深度游或晚餐套餐，能看到步行长度、讲解节奏、每轮酒款、是否适合驾车和餐厅衔接；酒庄接待用平板安排讲解员、酒窖容量、团客避让和餐桌准备。画面要有产区感，地图、时间线、酒标卡和确认页之间过渡自然，让游客在下单前理解自己会喝什么、走多久、结束后怎么离开。

## 目录结构

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.svelte        # 按钮组件
│   │   ├── Card.svelte          # 卡片组件
│   │   └── Badge.svelte         # 徽章组件
│   ├── TourCard.svelte          # 行程卡片
│   ├── WineLabel.svelte         # 酒标卡片（3D翻转）
│   ├── Timeline.svelte          # 时间线组件
│   ├── VineyardMap.svelte       # 葡萄园地图
│   ├── TimeSlotPicker.svelte    # 时间段选择器
│   └── AddonServiceCard.svelte  # 附加服务卡片
├── pages/
│   ├── TourSelection.svelte     # 首页 - 行程选择
│   ├── TourDetail.svelte        # 行程详情页
│   ├── Booking.svelte           # 预订页
│   ├── Confirmation.svelte      # 确认页
│   └── Success.svelte           # 成功页
├── data/
│   ├── tours.ts                 # 行程数据
│   ├── wines.ts                 # 葡萄酒数据
│   ├── timeSlots.ts             # 时间段数据
│   ├── guides.ts                # 导游数据
│   └── tables.ts                # 餐桌数据
├── stores/
│   ├── bookingStore.ts          # 预订状态管理
│   ├── tourStore.ts             # 行程状态管理
│   └── receptionStore.ts        # 接待状态管理
├── types/
│   └── index.ts                 # TypeScript 类型定义
├── utils/
│   └── format.ts                # 工具函数
├── app.css                      # 全局样式
├── App.svelte                   # 根组件
└── main.ts                      # 入口文件
```

## 主题配色

| 配色名称 | 主色 | 用途 |
|---------|------|------|
| Wine | #7B2838 | 主色调，品牌色 |
| Oak | #8B6914 | 橡木色，辅助色 |
| Vineyard | #3D5A3D | 葡萄园绿，自然感 |
| Champagne | #C9A961 | 香槟金，高亮色 |
| Cream | #FAF6ED | 奶油色，背景色 |

## 启动方式

### 前置要求

- Node.js >= 18.x
- npm >= 9.x

### 启动步骤

#### 1. 安装依赖

```bash
npm install
```

#### 2. 启动开发服务器

```bash
npm run dev
```

访问地址：http://localhost:5173

#### 3. 构建生产版本

```bash
npm run build
```

#### 4. 预览生产构建

```bash
npm run preview
```

访问地址：http://localhost:5173

### Docker 一键启动

#### 前置要求

- Docker >= 20.10
- Docker Compose >= 2.0

#### 启动命令

```bash
docker compose up --build
```

访问地址：http://localhost:5173

#### 后台运行

```bash
docker compose up --build -d
```

#### 停止和清理

```bash
docker compose down
```

#### 验证配置

```bash
docker compose config
```

#### 查看日志

```bash
docker compose logs
```

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | TourSelection | 游客首页，行程选择 |
| `/tour/:slug` | TourDetail | 行程详情（按slug） |
| `/tour/id/:id` | TourDetail | 行程详情（按ID） |
| `/booking` | Booking | 预订页面 |
| `/confirmation` | Confirmation | 确认页面 |
| `/success` | Success | 成功页面 |
| `/reception` | Reception | 酒庄接待平板端，调度管理仪表盘 |

## 功能特性

1. **优雅的视觉设计** - 采用酒庄主题配色，使用 Cormorant Garamond 和 Lora 字体营造高端感
2. **响应式布局** - 移动端优先设计，支持平板多列布局
3. **流畅的动画** - Svelte 过渡动画，卡片悬浮效果，3D翻转动画
4. **交互式地图** - SVG 葡萄园地图，路径绘制动画，点位悬停提示
5. **智能预订流程** - 分步式预订，时间段选择，附加服务配置
6. **状态管理** - Svelte stores 实现预订状态持久化
7. **TypeScript 支持** - 完整的类型定义，开发体验更佳

## 注意事项

- 项目使用 Svelte 5 的最新特性
- 时间插槽数据为模拟数据，实际使用需对接后端API
- 葡萄酒图片使用 picsum.photos 占位，实际使用需替换为真实图片
- QR 码为占位图片，实际使用需生成真实二维码
