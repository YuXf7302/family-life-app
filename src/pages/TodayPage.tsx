import { useState, useEffect } from "react"
import { generateTodayPlan } from "../domain/todayEngine"
import { getShift } from "../domain/shift"
import type { TodayPlan } from "../domain/todayEngine"

export function TodayPage() {
  const [plan, setPlan] = useState<TodayPlan | null>(null)
  const now = new Date()
  const ds = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0")
  const shift = getShift(ds)

  useEffect(() => { generateTodayPlan(ds).then(setPlan) }, [])

  return (
    <main className="page-container space-y-4">
      <div className="card">
        <p className="text-lg font-bold text-green-800">今日家庭</p>
        <p className="text-sm text-green-500 mt-1">{ds} 吴老头{shift === "work" ? "上班" : "休息"}</p>
      </div>

      {plan?.meals.dinner && <div className="card">
        <p className="text-base font-bold text-green-800 mb-2">今日菜单</p>
        {plan.meals.breakfast && <p className="text-sm text-green-700">早餐：{plan.meals.breakfast}</p>}
        {plan.meals.lunch && <p className="text-sm text-green-700">午餐：{plan.meals.lunch}</p>}
        {plan.meals.dinner && <p className="text-sm text-green-700">晚餐：{plan.meals.dinner}</p>}
      </div>}

      {plan && plan.chores.assignments.length > 0 && <div className="card">
        <p className="text-base font-bold text-green-800 mb-2">家务安排</p>
        {plan.chores.assignments.map((a, i) => (
          <div key={i} className="flex justify-between text-sm text-green-700 py-1 border-b border-green-50 last:border-0">
            <span className="font-medium">{a.memberName}</span>
            <span>{a.taskName}</span>
          </div>
        ))}
      </div>}

      {plan && plan.shopping.pending > 0 && <div className="card">
        <p className="text-base font-bold text-green-800 mb-2">待购买（{plan.shopping.pending}项）</p>
        {plan.shopping.urgentItems.map((item, i) => <p key={i} className="text-sm text-green-700">{item}</p>)}
      </div>}

      {plan && plan.reminders.length > 0 && <div className="card bg-orange-50 border-orange-200">
        <p className="text-sm font-semibold text-orange-700 mb-2">提醒</p>
        {plan.reminders.map((r, i) => <p key={i} className="text-xs text-orange-600 mb-1">{r.type === "expiry" ? "" : ""} {r.message}</p>)}
      </div>}

      {plan && plan.meals.dinner == null && plan.chores.assignments.length === 0 && <div className="card">
        <p className="text-center text-sm text-green-400 py-4">今天还没有安排。去菜单页生成计划，家务页分配任务。</p>
      </div>}
    </main>
  )
}
