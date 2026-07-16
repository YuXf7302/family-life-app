import type { Member, ChoreDefinition, ChoreAssignment } from "../../db"

export type DayShift = "work" | "rest"

export interface ChoreContext {
  date: string
  members: Member[]
  choreDefinitions: ChoreDefinition[]
  existingAssignments: ChoreAssignment[]
  shifts: Record<string, DayShift>
}

export interface ChorePlan {
  date: string
  assignments: Array<{ choreId: string; memberId: number; reason: string }>
}
