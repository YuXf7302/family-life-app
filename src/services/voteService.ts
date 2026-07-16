import { db } from '../db'

export async function addVote(mealPlanId: number, memberId: number, choice: string) {
  const existing = await db.votes.where({ mealPlanId, memberId }).first()
  if (existing) { await db.votes.put({ ...existing, choice }) }
  else { await db.votes.add({ mealPlanId, memberId, choice }) }
}

export async function getVotesByMealPlan(mealPlanId: number) {
  return db.votes.where('mealPlanId').equals(mealPlanId).toArray()
}
