import type { ChoreContext } from "./types"
export interface MemberBurden { memberId: number; taskCount: number; totalMinutes: number }
export function calculateMemberBurden(memberId: number, context: ChoreContext): MemberBurden {
  const tasks = context.existingAssignments.filter(a => a.assignedTo === String(memberId))
  return { memberId, taskCount: tasks.length, totalMinutes: tasks.reduce((s, a) => { const d = context.choreDefinitions.find(c => c.id === a.choreId); return s + (d?.estimatedMinutes || 0) }, 0) }
}
