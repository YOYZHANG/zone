import { UseCookieState } from '@reactuses/core'
import { MastoClient, login } from 'masto'
import { create } from 'zustand'

interface State {
  masto: MastoClient | undefined
}

interface Action {
  createMasto: (serverURL: UseCookieState, token: UseCookieState) => void
}

export const useMastoStore = create<State & Action>(set => ({
  masto: undefined,
  createMasto: async (serverURL: UseCookieState, token: UseCookieState) => {
    const masto = await login({
      url: `https://${serverURL}`,
      accessToken: token ||'',
    })

    set({masto});
  },
}))
