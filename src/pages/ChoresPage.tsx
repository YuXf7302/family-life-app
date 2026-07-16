import { useState, useEffect } from "react"
import { db } from "../db"
import { generateChorePlan } from "../domain/choreEngine"
import { getShift } from "../domain/shift"

export function ChoresPage() {
  const [plan, setPlan] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState<Record<number,boolean>>({})

  const today = new Date()
  const ds = today.getFullYear()+"-"+String(today.getMonth()+1).padStart(2,"0")+"-"+String(today.getDate()).padStart(2,"0")

  useEffect(() => {
    (async () => {
      const m = await db.members.toArray()
      const c = await db.choreDefinitions.toArray()
      const a = await db.choreAssignments.where("date").equals(ds).toArray()
      setMembers(m)
      const shift = getShift(ds)
      const ctx = { date:ds, members:m, choreDefinitions:c, existingAssignments:a, shifts:{[ds]:shift} }
      const p = generateChorePlan(ctx)
      setPlan(p)
    })()
  }, [])

  const memberName = (id: number) => members.find((m:any) => m.id === id)?.name || "?"

  const saveAssignments = async () => {
    setSaving(true)
    if (plan) {
      for (const a of plan.assignments) {
        await db.choreAssignments.add({
          date: ds,
          choreId: a.choreId,
          assignedTo: String(a.memberId),
          status: done[a.memberId] ? "done" : "assigned",
          reason: a.reason
        })
      }
    }
    setSaving(false)
  }

  return (
    <main className="page-container space-y-4">
      <div className="card">
        <p className="text-base font-bold text-green-800 mb-2">今日家务计划</p>
        <p className="text-xs text-green-500 mb-3">{ds} 自动分配</p>
      </div>

      {plan && plan.assignments.map((a:any, i:number) => (
        <div key={i} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-800">
                {members.find((m:any) => m.id === a.memberId)?.name || "?"}
                <span className="font-normal text-green-600"> → </span>
                {plan.choreId ? a.choreId : ''}
              </p>
              <p className="text-xs text-green-500 mt-1">{a.reason}</p>
            </div>
            <button onClick={() => setDone((p:any) => ({...p, [a.memberId]: !p[a.memberId]}))}
              className={"rounded-full w-8 h-8 border-2 flex items-center justify-center " + (done[a.memberId] ? "bg-green-500 border-green-500 text-white" : "border-green-300")}>
              {done[a.memberId] ? "✓" : ""}
            </button>
          </div>
        </div>
      ))}

      {plan && plan.assignments.length > 0 && (
        <button onClick={saveAssignments} disabled={saving} className="w-full rounded-xl bg-green-600 py-3 text-sm font-medium text-white active:bg-green-700 disabled:opacity-50">
          {saving ? "保存中..." : "保存今日计划"}
        </button>
      )}

      {plan && plan.assignments.length === 0 && <div className="card"><p className="text-xs text-green-400 text-center py-4">今日无需安排</p></div>}
    </main>
  )
}
