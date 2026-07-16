import { useState, useEffect } from "react"
import { db } from "../db"
import { useAppStore } from "../stores/useAppStore"
import { MEMBERS } from "../constants"
import { exportAllData, downloadJSON } from "../services/exportService"

export function FamilyPage() {
  const { fontSize, setFontSize } = useAppStore()
  const [seedInfo, setSeedInfo] = useState("")

  useEffect(() => {
    Promise.all([db.members.count(), db.recipes.count(), db.choreDefinitions.count()])
      .then(([mc, rc, cc]) => setSeedInfo(mc > 0 ? "成员" + mc + "人 | 菜谱" + rc + "道 | 家务" + cc + "项" : "初始化中"))
  }, [])

  return (
    <main className="page-container space-y-4">
      <div className="card"><p className="text-base font-bold text-green-800 mb-3">家庭成员</p><div className="space-y-2">
        {MEMBERS.map(m => <div key={m.id} className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
          <span className="text-xl">{m.role === "外公" ? "\u{1F474}" : m.role === "外婆" || m.role === "奶奶" ? "\u{1F475}" : m.role === "爸爸" ? "\u{1F468}" : m.role === "妈妈" ? "\u{1F469}" : "\u{1F476}"}</span>
          <div><p className="text-sm font-semibold text-green-800">{m.name}</p><p className="text-xs text-green-500">{m.role}</p></div>
        </div>)}
      </div></div>

      <div className="card"><p className="text-base font-bold text-green-800 mb-3">字体大小</p><div className="flex gap-2">
        {[{key:"normal",label:"A 标准"},{key:"large",label:"A+ 大号"},{key:"xl",label:"A++ 特大"}].map(opt => (
          <button key={opt.key} onClick={() => setFontSize(opt.key as any)}
            className={"flex-1 py-2.5 rounded-xl text-sm font-medium transition-all " + (fontSize === opt.key ? "bg-green-500 text-white shadow-sm" : "bg-green-100 text-green-700")}>{opt.label}</button>
        ))}
      </div></div>

      <div className="card bg-green-50"><p className="text-sm font-bold text-green-800 mb-2">家庭状态</p><p className="text-xs text-green-600">{seedInfo || "加载中"}</p><p className="text-xs text-green-500 mt-1">数据存于浏览器，家人各自独立</p></div>

      <div className="card"><p className="text-base font-bold text-green-800 mb-3">数据备份</p><p className="text-xs text-green-500 mb-3">导出JSON文件，防止浏览器清理缓存丢失数据</p>
        <button onClick={async () => { const json = await exportAllData(); downloadJSON(json, "family-life-" + new Date().toISOString().split("T")[0] + ".json") }} className="w-full rounded-xl bg-green-500 py-3 text-sm font-medium text-white active:bg-green-600">导出家庭数据</button>
      </div>
    </main>
  )
}
