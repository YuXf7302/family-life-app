import type { ChoreContext, ChorePlan } from "./types"
import { canAssignTask } from "./constraints"
import { calculateTaskScore } from "./scoring"

export function generateChorePlan(context: ChoreContext): ChorePlan {
  const assignments: ChorePlan["assignments"] = []
  const priority = ["cook_dinner", "baby_bath", "cook_breakfast", "cook_lunch", "wash_dishes", "clean_kitchen"]
  const sorted = [...context.choreDefinitions].sort((a, b) => {
    const ia = priority.indexOf(a.id); const ib = priority.indexOf(b.id)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  for (const chore of sorted) {
    const eligible = context.members.filter(m => {
      if (m.id == null) return false
      return canAssignTask(m, chore, context).allowed
    })
    if (eligible.length === 0) continue
    const scored = eligible.map(m => ({ member: m, ...calculateTaskScore(m.id!, chore, context) }))
    const best = scored.sort((a, b) => b.score - a.score)[0]
    assignments.push({ choreId: chore.id, memberId: best.member.id!, reason: best.reasons.length > 0 ? best.reasons.join(";") : "可执行" })
  }
  return { date: context.date, assignments }
}
