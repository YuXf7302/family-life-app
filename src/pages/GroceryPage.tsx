import { useState, useEffect } from "react"
import { db } from "../db"
import { markAsPurchased, getExpiringItems, getPriorityItems } from "../domain/inventoryEngine"

const TABS = ["待购买", "库存", "已完成"]
const STORAGE_LABELS: Record<string,string> = { fridge:"冷藏", freezer:"冷冻", pantry:"常温" }

export function GroceryPage() {
  const [tab, setTab] = useState(0)
  const [shopping, setShopping] = useState<any[]>([])
  const [pantry, setPantry] = useState<any[]>([])
  const [done, setDone] = useState<any[]>([])
  const [expiring, setExpiring] = useState<any[]>([])
  const [priority, setPriority] = useState<any[]>([])

  const load = async () => {
    setShopping(await db.shoppingItems.where("status").equals("pending").toArray())
    setPantry(await db.pantryItems.toArray())
    setDone(await db.shoppingItems.where("status").equals("done").toArray())
    setExpiring(await getExpiringItems())
    setPriority(await getPriorityItems())
  }

  useEffect(() => { load() }, [])

  const handlePurchase = async (id: number) => {
    await markAsPurchased(id)
    await load()
  }

  return (
    <main className="page-container space-y-4">
      <div className="flex gap-2 mb-2">
        {TABS.map((label, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={"flex-1 py-3 rounded-xl text-sm font-medium transition-all " + (tab === i ? "bg-green-500 text-white shadow-sm" : "bg-green-100 text-green-700")}>{label}</button>
        ))}
      </div>

      {tab === 0 && <div className="card"><p className="text-base font-bold text-green-800 mb-3">待购买</p>
        {shopping.length === 0 && <p className="text-xs text-green-400">没有待购买项目</p>}
        {shopping.map(item => <div key={item.id} className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 mb-2">
          <span className="text-sm text-green-800">{item.name} x{item.quantity||"1份"}</span>
          <button onClick={() => handlePurchase(item.id)} className="rounded-lg bg-green-500 px-3 py-1 text-xs text-white">购买完成</button>
        </div>)}
      </div>}

      {tab === 1 && <div>
        {priority.length > 0 && <div className="card bg-orange-50 border-orange-200 mb-3"><p className="text-sm font-semibold text-orange-700 mb-2">优先使用</p>
          {priority.map(p => <div key={p.id} className="text-xs text-orange-600 mb-1">{p.name} {p.quantity}{p.unit} {p.priority?"(优先)":""} {p.status==="low"?"(快没了)":""}</div>)}
        </div>}
        {["fridge","freezer","pantry"].map(st => {
          const items = pantry.filter(p => p.storage === st && p.status !== "empty")
          if (items.length === 0) return null
          return <div key={st} className="card mb-3"><p className="text-sm font-bold text-green-800 mb-2">{STORAGE_LABELS[st]||st}</p>
            {items.map(p => <div key={p.id} className="flex justify-between text-sm text-green-700 py-1 border-b border-green-50 last:border-0">
              <span>{p.name}</span>
              <span className="text-green-500">{p.quantity}{p.unit}</span>
            </div>)}
          </div>
        })}
        {pantry.length === 0 && <div className="card"><p className="text-xs text-green-400">库存为空</p></div>}
      </div>}

      {tab === 2 && <div className="card"><p className="text-base font-bold text-green-800 mb-3">已完成采购</p>
        {done.map(item => <div key={item.id} className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3 mb-2">
          <span className="text-sm text-green-600 line-through">{item.name}</span>
          <span className="text-xs text-green-400">已购买</span>
        </div>)}
        {done.length === 0 && <p className="text-xs text-green-400">暂无已完成采购</p>}
      </div>}
    </main>
  )
}
