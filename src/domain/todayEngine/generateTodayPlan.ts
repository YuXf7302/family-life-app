import type { TodayPlan } from "./types"
import { db } from "../../db"
import { getExpiringItems, getPriorityItems } from "../inventoryEngine"

export async function generateTodayPlan(date: string): Promise<TodayPlan> {
  const plan: TodayPlan = { meals: {}, shopping: { pending: 0, urgentItems: [] }, chores: { assignments: [] }, reminders: [] }
  try {
    const meals = (await db.mealPlans.where("date").equals(date).toArray()).filter(m => m.status === "locked")
    for (const m of meals) { if (m.meal === "breakfast") plan.meals.breakfast = m.dishName; if (m.meal === "lunch") plan.meals.lunch = m.dishName; if (m.meal === "dinner") plan.meals.dinner = m.dishName }
    const shopping = await db.shoppingItems.where("status").equals("pending").toArray()
    plan.shopping.pending = shopping.length; plan.shopping.urgentItems = shopping.slice(0, 5).map(i => i.name)
    const chores = await db.choreAssignments.where("date").equals(date).toArray()
    const members = await db.members.toArray(); const defs = await db.choreDefinitions.toArray()
    for (const c of chores) {
      const m = members.find(x => String(x.id) === c.assignedTo); const d = defs.find(x => x.id === c.choreId)
      plan.chores.assignments.push({ memberName: m?.name || "?", taskName: d?.name || c.choreId, reason: c.reason || "" })
    }
    const ei = await getExpiringItems(); for (const x of ei) plan.reminders.push({ type: "expiry", message: x.name + "即将过期" })
    const pi = await getPriorityItems(); for (const x of pi) plan.reminders.push({ type: "priority", message: x.name + "需优先使用" })
  } catch {}
  return plan
}
