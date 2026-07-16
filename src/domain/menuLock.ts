import { db } from "../db"

export interface LockCheck { ok: boolean; warnings: string[]; errors: string[] }

export async function checkMenuBeforeLock(plans: Array<{date:string;meal:string;dishName:string;babyFriendly:boolean}>): Promise<LockCheck> {
  const e: string[] = []
  if (plans.filter(p => p.meal === "dinner").length > 0 && !plans.some(p => p.meal === "dinner" && p.babyFriendly)) {
    e.push("晚餐需要宝宝友好菜")
  }
  return { ok: e.length === 0, warnings: [], errors: e }
}

export async function lockMenu(plans: Array<{date:string;meal:string;dishName:string;babyFriendly:boolean}>): Promise<number[]> {
  const check = await checkMenuBeforeLock(plans)
  if (!check.ok) throw new Error(check.errors.join(";"))
  const ids: number[] = []
  for (const p of plans) {
    const id = await db.mealPlans.add({ date:p.date, meal:p.meal, flag:"home", status:"locked", dishName:p.dishName, babyFriendly:p.babyFriendly })
    if (id !== undefined) ids.push(id)
  }
  return ids
}
