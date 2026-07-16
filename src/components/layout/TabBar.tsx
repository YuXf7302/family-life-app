import { useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../stores/useAppStore'

const TABS = [
  { path: '/', icon: '🏠', label: '今日' },
  { path: '/menu', icon: '🍳', label: '菜单' },
  { path: '/grocery', icon: '🛒', label: '食材' },
  { path: '/chores', icon: '🧹', label: '家务' },
  { path: '/family', icon: '👨‍👩‍👧‍👦', label: '家庭' },
]

export function TabBar() {
  const loc = useLocation()
  const nav = useNavigate()
  const fontSize = useAppStore(s => s.fontSize)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-green-200 bg-white" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <div className="flex h-20 items-center justify-around px-2 pb-2">
        {TABS.map(({ path, icon, label }) => {
          const active = loc.pathname === path
          return (
            <button key={path} onClick={() => nav(path)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-colors active:bg-green-100 ${active ? 'text-green-600' : 'text-green-400'}`}>
              <span style={{ fontSize: fontSize === 'xl' ? 28 : 24 }}>{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
