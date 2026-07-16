import { db } from '../db'

export async function generateShoppingList(date: string, mealPlans: Array<{ dishName: string }>) {
  const all: string[] = []
  for (const mp of mealPlans) {
    const recipe = await db.recipes.where('name').equals(mp.dishName).first()
    if (recipe && recipe.ingredients) {
      recipe.ingredients.split(',').map(i => i.trim()).filter(Boolean).forEach(i => all.push(i))
    }
  }
  const merged = new Map<string, number>()
  for (const ing of all) {
    const base = ing.replace(/\d+[gml]/g,'').trim()
    if (base) merged.set(base, (merged.get(base)||0)+1)
  }
  const pantry = await db.pantryItems.toArray()
  for (const [name] of merged) {
    if (pantry.some(p => p.status!=='none' && (name.includes(p.name)||p.name.includes(name)))) continue
    const existing = await db.shoppingItems.where('name').equals(name).first()
    if (existing && (existing.source==='manual'||existing.status==='done')) continue
    await db.shoppingItems.add({ name, quantity:'1份', status:'pending', channel:'any', source:'menu', sourceMenu:date })
  }
}
