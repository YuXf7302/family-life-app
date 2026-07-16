import type { MemberId, MealType } from '../types'

export const MEMBERS: Array<{ id: MemberId; name: string; shortName: string; role: string }> = [
  { id: 'wu', name: '吴老头', shortName: '老头', role: '外公' },
  { id: 'yu', name: '余大娘', shortName: '大娘', role: '外婆' },
  { id: 'popo', name: '婆婆', shortName: '婆婆', role: '奶奶' },
  { id: 'tony', name: 'Tony', shortName: 'Tony', role: '爸爸' },
  { id: 'joice', name: 'Joice', shortName: 'Joice', role: '妈妈' },
  { id: 'wutong', name: '小梧桐', shortName: '梧桐', role: '宝宝' },
]

export const MEAL_LABELS: Record<MealType, string> = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐' }

export const DEFAULT_SETTINGS = {
  enrollmentDate: '2026-09-01',
  voteOpenDay: 4,     // 周四
  voteCloseDay: 6,    // 周六
  voteCloseHour: 18,
}

export const QUICK_MEAL_FLAGS = [
  { value: 'home', label: '在家吃' },
  { value: 'out', label: '外出吃' },
  { value: 'pending', label: '待定' },
] as const

export const CHORE_CATEGORIES = [
  { id: 'cook', name: '做饭', chores: ['做早餐', '做午餐', '做晚餐'] },
  { id: 'clean', name: '清洁', chores: ['洗碗', '收拾厨房', '擦桌', '扫地', '拖地', '倒垃圾', '清洁马桶'] },
  { id: 'laundry', name: '洗衣', chores: ['洗衣', '晾衣', '收衣', '整理衣物'] },
  { id: 'baby', name: '宝宝', chores: ['宝宝洗澡', '陪宝宝玩', '哄睡觉', '收纳玩具', '整理宝宝用品'] },
  { id: 'shop', name: '采购', chores: ['买菜', '采购日用品'] },
  { id: 'other', name: '其他', chores: ['检查冰箱', '周末整理', '全家一起10分钟'] },
]

export const HEALTH_GOALS = [
  { id: 'lessOil', label: '少油' },
  { id: 'lessSalt', label: '少盐' },
  { id: 'lessSugar', label: '少糖' },
  { id: 'weight', label: '控制体重' },
  { id: 'moreProtein', label: '增加蛋白质' },
  { id: 'moreVeggie', label: '多吃蔬菜' },
  { id: 'allergy', label: '明确过敏' },
  { id: 'doctorLimit', label: '医生限制' },
  { id: 'none', label: '暂无目标' },
] as const

export const EXERCISES = ['散步', '快走', '跑步', '拉伸', '瑜伽', '力量训练', '自定义']
export const BABY_EXERCISES = ['户外玩耍', '跑跳游戏', '滑步车', '球类游戏', '公园活动']

export const CANCEL_REASONS = ['同类替换', '优先吃剩菜', '临时外出', '临时加班', '食材没买到', '应急简单餐', '宝宝状态调整']

export const STORAGE_LABELS = { fridge: '冷藏', freezer: '冷冻', pantry: '常温' } as const
export const CHANNEL_LABELS = { market: '菜市场', supermarket: '超市', online: '线上买菜', any: '不限' } as const
