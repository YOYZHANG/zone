import { create } from 'zustand'

interface State {
  theme: 'light' | 'dark',
}

interface Action {
  setTheme: (theme: 'light' | 'dark') => void
}

export const useSettingStore = create<State & Action>(set => ({
  theme: 'light',
  setTheme: (theme) => {
    set({theme})
  }
}))
