export type MemberId = 'wu' | 'yu' | 'popo' | 'tony' | 'joice' | 'wutong'

export interface FamilyMember {
  id: MemberId
  name: string
  shortName: string
  role: string
  status: 'active' | 'baby'
}

export type ShiftStatus = 'work' | 'rest' | 'override_work' | 'override_rest'

export interface DayShift {
  date: string
  status: ShiftStatus
}

export type MealType = 'breakfast' | 'lunch' | 'dinner'
export type MealFlag = 'home' | 'out' | 'pending'
export type VoteChoice = 'want' | 'dont' | 'ok'

export interface Dish {
  id: string
  name: string
  category: string
  mealTypes: MealType[]
  ingredients: string[]
  steps: string
  estimatedMinutes: number
  babyFriendly: boolean
  babyNote?: string
  tags: string[]
  lastCooked?: string
}

export interface MenuItem {
  id: string
  date: string
  meal: MealType
  dishId: string
  cookId: MemberId
  votes: Record<MemberId, VoteChoice>
  locked: boolean
  note?: string
}

export type IngredientStatus = 'have' | 'low' | 'none'
export type StorageType = 'fridge' | 'freezer' | 'pantry'
export type ShoppingChannel = 'market' | 'supermarket' | 'online' | 'any'

export interface Ingredient {
  id: string
  name: string
  status: IngredientStatus
  quantity?: number
  unit?: string
  storage: StorageType
  priority?: boolean // 优先吃掉
  note?: string
  addedToList?: boolean
}

export interface GroceryItem {
  id: string
  name: string
  quantity: string
  channel: ShoppingChannel
  claimedBy?: MemberId
  done: boolean
  notFound: boolean
}

export type ChoreId = string

export interface Chore {
  id: ChoreId
  name: string
  category: 'cook' | 'clean' | 'baby' | 'shop' | 'other'
  assignedTo?: MemberId
  date: string
  done: boolean
  transferred?: boolean
}

export type HealthGoal = 'lessOil' | 'lessSalt' | 'lessSugar' | 'weight' | 'moreProtein' | 'moreVeggie' | 'allergy' | 'doctorLimit' | 'none'

export interface DinnerReview {
  id: string
  date: string
  reviewerId: MemberId
  stars: 1|2|3|4|5
  bestDish?: string
  thanks: string
  note?: string
}

export interface FamilySettings {
  enrollmentDate: string
  voteOpenDay: number // 周四=4
  voteCloseDay: number // 周六=6
  voteCloseHour: number // 18
}
