import { create } from 'zustand'

export type FontSize = 'normal' | 'large' | 'xl'

interface AppState {
  fontSize: FontSize
  setFontSize: (s: FontSize) => void
}

export const useAppStore = create<AppState>(set => ({
  fontSize: 'large',
  setFontSize: fontSize => set({ fontSize }),
}))
