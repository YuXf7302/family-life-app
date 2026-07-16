import { Outlet } from 'react-router-dom'
import { TabBar } from './TabBar'
import { useAppStore } from '../../stores/useAppStore'

const SIZES = { normal: '14px', large: '18px', xl: '22px' }

export function AppShell() {
  const fontSize = useAppStore(s => s.fontSize)
  return (
    <div className="app-shell flex min-h-0 flex-col overflow-hidden bg-green-50" style={{ fontSize: SIZES[fontSize] }}>
      <Outlet />
      <TabBar />
    </div>
  )
}
