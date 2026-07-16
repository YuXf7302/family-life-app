import type { Member } from './index'

export const seedMembers: Member[] = [
  { name: '吴老头', shortName: '老头', role: '外公', isAdmin: false, isPhoneUser: true, isChild: false, active: true },
  { name: '余大娘', shortName: '大娘', role: '外婆', isAdmin: false, isPhoneUser: true, isChild: false, active: true },
  { name: '婆婆',   shortName: '婆婆', role: '奶奶', isAdmin: false, isPhoneUser: true, isChild: false, active: true },
  { name: 'Tony',   shortName: 'Tony', role: '爸爸', isAdmin: false, isPhoneUser: true, isChild: false, active: true },
  { name: 'Joice',  shortName: 'Joice', role: '妈妈', isAdmin: true,  isPhoneUser: true, isChild: false, active: true },
  { name: '小梧桐', shortName: '梧桐', role: '宝宝', isAdmin: false, isPhoneUser: false, isChild: true,  active: true },
]
