import { db } from "../db"

export async function exportAllData(): Promise<string> {
  const tables: Record<string, any[]> = {}
  for (const table of ["members","recipes","mealPlans","votes","pantryItems","shoppingItems","choreAssignments","settings","rewards","exerciseTasks","mealReviews","taskExcuses"] as const) {
    tables[table] = await (db as any)[table].toArray()
  }
  return JSON.stringify({ exportedAt: new Date().toISOString(), version: "1.0", data: tables }, null, 2)
}

export function downloadJSON(json: string, filename: string) {
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = filename
  document.body.appendChild(a); a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
