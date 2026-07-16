import Dexie, { type EntityTable } from 'dexie'

export interface Member { id?: number; name: string; shortName: string; role: string; isAdmin: boolean; isPhoneUser: boolean; isChild: boolean; active: boolean }
export interface Setting { key: string; value: string }
export interface ShiftOverride { date: string; status: string; reason?: string; modifiedBy?: string }
export interface Recipe { id?: number; name: string; category: string; mealTypes: string; ingredients: string; steps: string; estimatedMinutes: number; babyFriendly: boolean; babyNote: string; tags: string; isCustom: boolean; lastCooked?: string; enabled: boolean }
export interface MealPlan { id?: number; date: string; meal: string; flag: string; status: string; dishName: string; cookId?: string; babyFriendly: boolean; note?: string; lockedBy?: string }
export interface Vote { id?: number; mealPlanId: number; memberId: number; choice: string }
export interface PantryItem { id?: number; name: string; status: string; quantity?: string; storage: string; priority: boolean; expiryDate?: string; note?: string }
export interface ShoppingItem { id?: number; name: string; quantity: string; status: string; channel: string; claimedBy?: string; source: string; sourceMenu?: string }
export interface ChoreDefinition { id: string; name: string; category: string; estimatedMinutes: number }
export interface ChoreAssignment { id?: number; date: string; choreId: string; assignedTo?: string; status: string; reason?: string }
export interface TaskExcuse { id?: number; choreAssignmentId: number; submittedBy: string; reasonCategory: string; reasonText: string; submittedAt: string; reviewStatus: string; reviewedBy?: string; reviewedAt?: string; reviewComment?: string }
export interface MealReview { id?: number; date: string; reviewerId: number; stars: number; taste?: string; thanks: string; bestDish?: string; note?: string }
export interface Reward { id?: number; name: string; owner: string; status: string; source: string; createdAt: string }
export interface ExerciseTask { id?: number; memberId: number; name: string; date: string; durationMinutes: number; status: string; babyType?: string }
export interface ConsequenceRule { id?: number; triggerType: string; occurrenceThreshold: number; consequenceType: string; amount: number; monthlyCap: number; enabled: boolean }
export interface ConsequenceRecord { id?: number; memberId: number; choreAssignmentId: number; ruleId: number; consequenceType: string; amount: number; status: string; createdAt: string; disputedAt?: string; resolvedAt?: string }
export interface TaskDispute { id?: number; refId: number; refType: string; submittedBy: string; reason: string; status: string; resolvedBy?: string; resolution?: string; createdAt: string; resolvedAt?: string }

export class FamilyDB extends Dexie {
  members!: EntityTable<Member, 'id'>
  settings!: EntityTable<Setting, 'key'>
  shiftOverrides!: EntityTable<ShiftOverride, 'date'>
  recipes!: EntityTable<Recipe, 'id'>
  mealPlans!: EntityTable<MealPlan, 'id'>
  votes!: EntityTable<Vote, 'id'>
  pantryItems!: EntityTable<PantryItem, 'id'>
  shoppingItems!: EntityTable<ShoppingItem, 'id'>
  choreDefinitions!: EntityTable<ChoreDefinition, 'id'>
  choreAssignments!: EntityTable<ChoreAssignment, 'id'>
  taskExcuses!: EntityTable<TaskExcuse, 'id'>
  mealReviews!: EntityTable<MealReview, 'id'>
  rewards!: EntityTable<Reward, 'id'>
  exerciseTasks!: EntityTable<ExerciseTask, 'id'>
  consequenceRules!: EntityTable<ConsequenceRule, 'id'>
  consequenceRecords!: EntityTable<ConsequenceRecord, 'id'>
  taskDisputes!: EntityTable<TaskDispute, 'id'>

  constructor() {
    super('family-life-app-db')
    this.version(1).stores({
      members: '++id, name, role, active',
      settings: 'key',
      shiftOverrides: 'date',
      recipes: '++id, category, babyFriendly, enabled',
      mealPlans: '++id, date, meal, status',
      votes: '++id, [mealPlanId+memberId], mealPlanId, memberId',
      pantryItems: '++id, name, status, storage, priority',
      shoppingItems: '++id, name, status, claimedBy, source',
      choreDefinitions: 'id, category',
      choreAssignments: '++id, date, assignedTo, status',
      taskExcuses: '++id, choreAssignmentId, submittedBy, reviewStatus',
      mealReviews: '++id, date, reviewerId',
      rewards: '++id, owner, status',
      exerciseTasks: '++id, memberId, date, status',
      consequenceRules: '++id, triggerType, enabled',
      consequenceRecords: '++id, memberId, consequenceType, status',
      taskDisputes: '++id, refId, refType, status',
    })
  }
}

export const db = new FamilyDB()
