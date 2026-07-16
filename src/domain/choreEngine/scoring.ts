import type { ChoreDefinition } from "../../db"
import type { ChoreContext } from "./types"

export interface TaskScore { score: number; reasons: string[] }

export function calculateTaskScore(memberId: number, chore: ChoreDefinition, context: ChoreContext): TaskScore {
  let score = 50; const reasons: string[] = []
  const existing = context.existingAssignments.filter(a => a.assignedTo === String(memberId))
  if (existing.length > 0) {
    const burden = existing.reduce((s, a) => { const d = context.choreDefinitions.find(c => c.id === a.choreId); return s + (d?.estimatedMinutes || 0) }, 0)
    score -= burden; reasons.push("已有" + existing.length + "项任务")
  }
  if (chore.estimatedMinutes > 30) { score -= 10; reasons.push("时间较长") }
  else { score += 5; reasons.push("快速任务") }
  return { score, reasons }
}
