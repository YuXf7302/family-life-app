import { useState, useEffect } from "react"
import { db } from "../db"
import { recommendMenu } from "../domain/menuRecommend"
import { getShift } from "../domain/shift"
import { lockMenu } from "../domain/menuLock"
import { addVote, getVotesByMealPlan } from "../services/voteService"
import { generateShoppingList } from "../services/shoppingEngine"

const ML: Record<string,string> = { breakfast:"早餐", lunch:"午餐", dinner:"晚餐" }

export function MenuPage() {
  const [recipes, setRecipes] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [candidates, setCandidates] = useState<any[]>([])
  const [selected, setSelected] = useState<Record<string,string>>({})
  const [voteCounts, setVoteCounts] = useState<Record<string,number>>({})
  const [locked, setLocked] = useState(false)
  const [lockMsg, setLockMsg] = useState("")

  useEffect(() => {
    db.recipes.where("enabled").equals(1).toArray().then(setRecipes)
    db.members.toArray().then(setMembers)
  }, [])

  const now = new Date()
  const ds = now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0")
  const shift = getShift(ds)
  const isWeekend = now.getDay()===0||now.getDay()===6

  const generate = () => {
    const ctx = { date:ds, babyAtHome:true, isWeekend, isWuRest:shift==="rest", recentRecipeNames:[], pantryNames:[], babyFavIngredients:["香菇","蘑菇","茭白"] }
    setCandidates(recommendMenu(ctx, recipes))
    setSelected({}); setVoteCounts({}); setLocked(false); setLockMsg("")
  }

  const selectDish = async (meal:string, name:string) => {
    const newSel = { ...selected, [meal]: selected[meal]===name ? "" : name }
    setSelected(newSel)
  }

  const handleVote = async (name:string) => {
    const memberId = 5 // Joice as default
    const mpId = name.charCodeAt(0) + name.length // simple id
    await addVote(mpId, memberId, "want")
    setVoteCounts(p => ({...p, [name]: (p[name]||0)+1}))
  }

  const handleLock = async () => {
    const plans = Object.entries(selected).filter(([,v])=>v).map(([meal, dishName]) => ({
      date: ds, meal, dishName, babyFriendly: candidates.find((s:any)=>s.meal===meal)?.candidates.find((c:any)=>c.name===dishName)?.babyFriendly || false
    }))
    if (plans.length === 0) { setLockMsg("请先选择菜品"); return }
    try {
      await lockMenu(plans)
      setLocked(true)
      setLockMsg("菜单已锁定！")
      await generateShoppingList(ds, plans)
      setLockMsg(prev => prev + " 购物清单已生成")
    } catch (e: any) { setLockMsg("锁定失败：" + e.message) }
  }

  return (
    <main className="page-container space-y-4">
      <div className="card">
        <p className="text-base font-bold text-green-800 mb-2">本周菜单</p>
        <p className="text-xs text-green-500 mb-3">{ds} 吴老头{shift==="work"?"上班":"休息"}</p>
        <button onClick={generate} className="w-full rounded-xl bg-green-500 py-3 text-sm font-medium text-white active:bg-green-600">生成候选菜单</button>
      </div>

      {candidates.map((slot:any) => (
        <div key={slot.meal} className="card">
          <p className="text-base font-bold text-green-800 mb-2">{ML[slot.meal]||slot.meal}</p>
          <div className="space-y-2">
            {slot.candidates.map((c:any) => {
              const sel = selected[slot.meal]===c.name
              return <div key={c.name} className={"rounded-xl px-4 py-3 border "+(sel?"border-green-400 bg-green-50":"border-green-100 bg-green-50")}>
                <div className="flex items-center justify-between">
                  <button onClick={()=>selectDish(slot.meal,c.name)} className="flex-1 text-left">
                    <p className="text-sm font-semibold text-green-800">{c.name} {c.babyFriendly?"":""}</p>
                    <p className="text-xs text-green-500 mt-0.5">{c.reason}</p>
                  </button>
                  <button onClick={()=>handleVote(c.name)} className="ml-2 rounded-lg bg-white px-3 py-1 text-sm shadow-sm">{voteCounts[c.name]||0}</button>
                </div>
              </div>
            })}
          </div>
        </div>
      ))}

      {candidates.length>0 && (
        <div className="card">
          <p className="text-base font-bold text-green-800 mb-2">已选菜品</p>
          {Object.entries(selected).filter(([,v])=>v).map(([m,n])=><div key={m} className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-2 mb-1"><span className="text-sm text-green-700">{(ML[m]||m)+": "+n}</span></div>)}
          {Object.values(selected).filter(Boolean).length===0 && <p className="text-xs text-green-400">点击候选菜品选择</p>}
        </div>
      )}

      {candidates.length>0 && (
        <div className="card">
          <button onClick={handleLock} disabled={locked} className="w-full rounded-xl bg-green-600 py-3 text-sm font-medium text-white active:bg-green-700 disabled:opacity-50">锁定菜单</button>
          {lockMsg && <p className="text-xs text-green-600 mt-2">{lockMsg}</p>}
        </div>
      )}
    </main>
  )
}
