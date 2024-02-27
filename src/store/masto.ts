import { MastoClient } from 'masto'
import { create } from 'zustand'
import { createMasto } from '../hooks/masto'

interface State {
  masto: MastoClient
}

interface Action {
  setMasto: (masto: MastoClient) => void
}

const masto = await createMasto()

export const useMastoStore = create<State & Action>(set => ({
  masto,
  setMasto: masto => set({ masto}),
}))
