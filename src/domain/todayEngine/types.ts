export interface TodayPlan {
  meals: { breakfast?: string; lunch?: string; dinner?: string }
  shopping: { pending: number; urgentItems: string[] }
  chores: { assignments: Array<{ memberName: string; taskName: string; reason: string }> }
  reminders: Array<{ type: string; message: string }>
}
