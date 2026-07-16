import { describe, it } from "node:test"
import assert from "node:assert"

interface M { id?: number; name: string; shortName: string; role: string; isAdmin: boolean; isPhoneUser: boolean; isChild: boolean; active: boolean }
interface C { id: string; name: string; category: string; estimatedMinutes: number }
interface CX { date: string; members: M[]; choreDefinitions: C[]; existingAssignments: any[]; shifts: Record<string, string> }

function canAssign(m: M, c: C, ctx: CX): { allowed: boolean; reason: string } {
  const shift = ctx.shifts[ctx.date] || "work"
  const name = m.name
  if (name === "Tony") {
    if ((c.id === "cook_breakfast" || c.id === "cook_lunch") && shift === "work") return { allowed: false, reason: "Tony不能白天做饭" }
    if (c.id === "baby_bath") return { allowed: true, reason: "Tony固定洗澡" }
    if (c.id === "clean_kitchen" && ctx.existingAssignments.some((a: any) => a.choreId === "baby_bath")) return { allowed: false, reason: "冲突" }
  }
  if (name === "Joice" && c.estimatedMinutes > 30) return { allowed: false, reason: "Joice晚间陪宝宝" }
  if (name === "吴老头") {
    if (shift === "work" && (c.id === "cook_lunch" || c.id === "cook_breakfast")) return { allowed: false, reason: "上班不做饭" }
    if (shift === "rest" && c.id === "cook_dinner") return { allowed: true, reason: "休息日做饭优先" }
  }
  if (name === "婆婆" && shift === "rest") return { allowed: false, reason: "休息日不参与" }
  return { allowed: true, reason: "可以" }
}

function mkM(o: any = {}): M { return { id: 1, name: "", shortName: "", role: "", isAdmin: false, isPhoneUser: true, isChild: false, active: true, ...o } }
function mkC(o: any = {}): C { return { id: "", name: "", category: "", estimatedMinutes: 30, ...o } }

describe("Tony", () => {
  it("休息日可做早餐", () => assert.ok(canAssign(mkM({id:2,name:"Tony"}), mkC({id:"cook_breakfast"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
  it("工作日不能做饭", () => assert.ok(!canAssign(mkM({id:2,name:"Tony"}), mkC({id:"cook_lunch"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("不能同时洗澡+厨房", () => assert.ok(!canAssign(mkM({id:2,name:"Tony"}), mkC({id:"clean_kitchen"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[{id:1,date:"2026-07-18",choreId:"baby_bath",assignedTo:"2",status:"assigned"}], shifts:{"2026-07-18":"work"} }).allowed))
})

describe("Joice", () => {
  it("不能做长时间任务", () => assert.ok(!canAssign(mkM({id:3,name:"Joice"}), mkC({id:"clean_kitchen",estimatedMinutes:45}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("可做短任务", () => assert.ok(canAssign(mkM({id:3,name:"Joice"}), mkC({id:"wipe_table",estimatedMinutes:5}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
})

describe("吴老头", () => {
  it("上班不做午饭", () => assert.ok(!canAssign(mkM({id:1,name:"吴老头"}), mkC({id:"cook_lunch"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("休息日可做晚饭", () => assert.ok(canAssign(mkM({id:1,name:"吴老头"}), mkC({id:"cook_dinner"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
})

describe("婆婆", () => {
  it("休息日不参与", () => assert.ok(!canAssign(mkM({id:6,name:"婆婆"}), mkC({id:"wash_dishes"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
  it("工作日可参与", () => assert.ok(canAssign(mkM({id:6,name:"婆婆"}), mkC({id:"wash_dishes"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
})
