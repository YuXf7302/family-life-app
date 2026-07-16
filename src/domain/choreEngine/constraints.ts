import type { Member, ChoreDefinition } from "../../db"
import type { ChoreContext } from "./types"

export interface ConstraintResult { allowed: boolean; reason: string }

export function canAssignTask(member: Member, chore: ChoreDefinition, context: ChoreContext): ConstraintResult {
  const shift = context.shifts[context.date] || "work"
  const name = member.name

  if (name === "Tony") {
    if ((chore.id === "cook_breakfast" || chore.id === "cook_lunch") && shift === "work") return { allowed: false, reason: "Tony工作日白天不能做饭" }
    if (chore.id === "baby_bath") return { allowed: true, reason: "Tony固定负责宝宝洗澡" }
    if (chore.id === "clean_kitchen" && context.existingAssignments.some(a => a.choreId === "baby_bath")) return { allowed: false, reason: "Tony不能同时洗澡+清洁厨房" }
  }

  if (name === "Joice") {
    if (chore.estimatedMinutes > 30) return { allowed: false, reason: "Joice晚间需陪宝宝" }
  }

  if (name === "吴老头") {
    if (shift === "work" && (chore.id === "cook_lunch" || chore.id === "cook_breakfast")) return { allowed: false, reason: "吴老头上班日不做饭" }
    if (shift === "rest" && chore.id === "cook_dinner") return { allowed: true, reason: "吴老头休息日优先做饭" }
  }

  if (name === "婆婆" && shift === "rest") return { allowed: false, reason: "婆婆休息日不参与" }

  return { allowed: true, reason: "可以安排" }
}
