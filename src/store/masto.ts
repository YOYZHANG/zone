import { MastoClient, login } from 'masto'
import { create } from 'zustand'
import { DEFAULT_SERVER } from '../constants';

interface State {
  masto: MastoClient | null,
  mastoLogged: boolean
}

interface Action {
  createMasto: (server: string | undefined, token: string | undefined) => void
}

export const useMastoStore = create<State & Action>(set => ({
  masto: null,
  mastoLogged: false,
  createMasto: async (server, token) => {
    if (!token) {
      return
    }
    const newmasto = await login({
      url: `https://${server || DEFAULT_SERVER}`,
      accessToken: token ||'',
    })

    set({masto: newmasto, mastoLogged: true});
  },
}))
