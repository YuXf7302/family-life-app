export type ShiftStatus = 'work' | 'rest'

const ANCHOR = '2026-07-18'

function dl(a: string, b: string): number {
  const [ay,am,ad] = a.split('-').map(Number)
  const [by,bm,bd] = b.split('-').map(Number)
  const u1 = Date.UTC(ay, am-1, ad)
  const u2 = Date.UTC(by, bm-1, bd)
  return Math.floor((u1 - u2) / 86400000)
}

let ov: Record<string, ShiftStatus> = {}
export function setOverride(d: string, s: ShiftStatus) { ov[d] = s }
export function clearOverride(d: string) { delete ov[d] }
export function loadOverrides(d: Record<string, ShiftStatus>) { ov = { ...d } }
export function getAllOverrides() { return { ...ov } }

export function getShift(d: string): ShiftStatus {
  if (ov[d]) return ov[d]
  const diff = dl(d, ANCHOR)
  return ((diff % 3) + 3) % 3 === 0 ? 'work' : 'rest'
}

export function getShiftWeek(start: string): Array<{ date: string; status: ShiftStatus }> {
  const r: Array<{ date: string; status: ShiftStatus }> = []
  const [y,m,day] = start.split('-').map(Number)
  const d = new Date(y, m-1, day)
  for (let i = 0; i < 7; i++) {
    const ds = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
    r.push({ date: ds, status: getShift(ds) })
    d.setDate(d.getDate() + 1)
  }
  return r
}

export function testShift(): string[] {
  const cases: Array<{ date: string; expected: ShiftStatus }> = [
    { date: '2026-07-18', expected: 'work' }, { date: '2026-07-19', expected: 'rest' },
    { date: '2026-07-20', expected: 'rest' }, { date: '2026-07-21', expected: 'work' },
    { date: '2026-07-22', expected: 'rest' }, { date: '2026-07-23', expected: 'rest' },
    { date: '2026-07-24', expected: 'work' },
  ]
  const errs: string[] = []
  for (const c of cases) {
    const a = getShift(c.date)
    if (a !== c.expected) errs.push(c.date + ': 期望' + c.expected + ' 实际' + a)
  }
  return errs
}
