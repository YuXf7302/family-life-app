import { describe, it } from "node:test"
import assert from "node:assert"
import type { Member, ChoreDefinition } from "../../db/index"
import { canAssignTask } from "../constraints"

function mkM(o: Partial<Member> = {}): Member {
  return { id:1, name:"", shortName:"", role:"", isAdmin:false, isPhoneUser:true, isChild:false, active:true, ...o }
}
function mkC(o: Partial<ChoreDefinition> = {}): ChoreDefinition {
  return { id:"", name:"", category:"", estimatedMinutes:30, ...o }
}

describe("家务约束", () => {
  it("Tony休息日可做早餐", () => assert.ok(canAssignTask(mkM({id:2,name:"Tony"}), mkC({id:"cook_breakfast"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
  it("Tony工作日白天不能做饭", () => assert.ok(!canAssignTask(mkM({id:2,name:"Tony"}), mkC({id:"cook_lunch"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("Tony不能同时洗澡+清洁厨房", () => assert.ok(!canAssignTask(mkM({id:2,name:"Tony"}), mkC({id:"clean_kitchen"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[{id:1,date:"2026-07-18",choreId:"baby_bath",assignedTo:"2",status:"assigned"}], shifts:{"2026-07-18":"work"} }).allowed))
  it("Joice不能做长时间任务", () => assert.ok(!canAssignTask(mkM({id:3,name:"Joice"}), mkC({id:"clean_kitchen",estimatedMinutes:45}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("吴老头上班日不做午饭", () => assert.ok(!canAssignTask(mkM({id:1,name:"吴老头"}), mkC({id:"cook_lunch"}), { date:"2026-07-18", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-18":"work"} }).allowed))
  it("吴老头休息日可做晚饭", () => assert.ok(canAssignTask(mkM({id:1,name:"吴老头"}), mkC({id:"cook_dinner"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
  it("婆婆休息日不参与", () => assert.ok(!canAssignTask(mkM({id:6,name:"婆婆"}), mkC({id:"wash_dishes"}), { date:"2026-07-19", members:[], choreDefinitions:[], existingAssignments:[], shifts:{"2026-07-19":"rest"} }).allowed))
})
