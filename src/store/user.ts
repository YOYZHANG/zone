import { create } from 'zustand'
import { UserLogin } from '../types'

interface State {
  currentUser: UserLogin | undefined,
}

interface Action {
  setCurrentUser: (user:  UserLogin | undefined) => void
}

export const useUserStore = create<State & Action>(set => ({
  currentUser: undefined,
  setCurrentUser: (currentUser) => {
    set({currentUser})
  }
}))
