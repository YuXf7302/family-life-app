import { db } from "../db"

export async function markAsPurchased(shoppingItemId: number) {
  const item = await db.shoppingItems.get(shoppingItemId)
  if (!item) return
  await db.shoppingItems.put({ ...item, status: "done" })
  await db.pantryItems.add({
    name: item.name,
    status: "available",
    storage: "fridge",
    priority: false
  })
}

export async function getExpiringItems(days = 3) {
  const all = await db.pantryItems.toArray()
  const now = Date.now()
  return all.filter(p => p.expiryDate && (new Date(p.expiryDate).getTime() - now) > 0 && (new Date(p.expiryDate).getTime() - now) < days * 86400000)
}

export async function getPriorityItems() {
  return (await db.pantryItems.toArray()).filter(p => p.priority || p.status === "low")
}
