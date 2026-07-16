import { db } from './index'
import { seedMembers } from './seedMembers'
import { seedRecipes } from './seedRecipes'
import { seedChores } from './seedChores'

export async function initSeedData() {
  const count = await db.members.count()
  if (count > 0) return
  await db.transaction('rw', db.members, db.settings, db.recipes, db.choreDefinitions, async () => {
    await db.members.bulkAdd(seedMembers)
    await db.recipes.bulkAdd(seedRecipes)
    await db.choreDefinitions.bulkAdd(seedChores)
    await db.settings.put({ key: 'seedVersion', value: '1' })
  })
}

