import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { TodayPage } from './pages/TodayPage'
import { MenuPage } from './pages/MenuPage'
import { GroceryPage } from './pages/GroceryPage'
import { ChoresPage } from './pages/ChoresPage'
import { FamilyPage } from './pages/FamilyPage'
import { initSeedData } from './db/seed'

export default function App() {
  useEffect(() => { initSeedData() }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<TodayPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/grocery" element={<GroceryPage />} />
          <Route path="/chores" element={<ChoresPage />} />
          <Route path="/family" element={<FamilyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
