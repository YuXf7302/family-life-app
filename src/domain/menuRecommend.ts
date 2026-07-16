export interface MenuCtx {
  date: string
  babyAtHome: boolean
  isWeekend: boolean
  isWuRest: boolean
  recentRecipeNames: string[]
  pantryNames: string[]
  babyFavIngredients: string[]
}

export interface Candidate {
  name: string; reason: string; score: number; babyFriendly: boolean
}

export interface MealSlot {
  meal: string; candidates: Candidate[]
}

function ensureBabyDinner(candidates: Candidate[]): Candidate[] {
  const hasBaby = candidates.some(c => c.babyFriendly)
  if (!hasBaby && candidates.length > 0) {
    const sorted = [...candidates].sort((a, b) => b.score - a.score)
    const baby = sorted.find(c => c.babyFriendly)
    if (baby) return [baby, ...sorted.filter(c => !c.babyFriendly)]
  }
  return candidates
}

export function recommendMenu(ctx: MenuCtx, recipes: Array<{name:string;mealTypes:string;babyFriendly:boolean;ingredients:string;tags:string;estimatedMinutes:number;enabled:boolean}>): MealSlot[] {
  const meals = ['breakfast', 'lunch', 'dinner']
  return meals.map(meal => {
    const candidates: Candidate[] = recipes
      .filter(r => r.enabled)
      .filter(r => r.mealTypes.includes(meal))
      .filter(r => !ctx.recentRecipeNames.includes(r.name))
      .map(r => {
        let score = 0; const reasons: string[] = []
        if (r.babyFriendly && ctx.babyAtHome) { score += 20; reasons.push('宝宝可以吃') }
        const ings = r.ingredients.split(',')
        const favMatch = ctx.babyFavIngredients.filter(f => ings.some(i => i.includes(f)))
        if (favMatch.length > 0) { score += favMatch.length * 15; reasons.push('含宝宝喜欢:' + favMatch.join(',')) }
        const pantryMatch = ings.filter(i => ctx.pantryNames.some(p => i.includes(p)))
        if (pantryMatch.length > 0) { score += pantryMatch.length * 10; reasons.push('家里有:' + pantryMatch.join(',')) }
        if (r.estimatedMinutes <= 20) { score += 10; reasons.push('制作快速') }
        if (ctx.isWuRest && r.estimatedMinutes > 45) { score += 5; reasons.push('吴老头休息适合做复杂菜') }
        if (!ctx.isWeekend && meal === 'dinner' && r.estimatedMinutes <= 25) { score += 10; reasons.push('工作日晚餐推荐快手菜') }
        return { name: r.name, reason: reasons.join(';') || '推荐', score, babyFriendly: r.babyFriendly }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
    return { meal, candidates: meal === 'dinner' ? ensureBabyDinner(candidates) : candidates }
  })
}
