import { MastoClient, login } from 'masto'
import { create } from 'zustand'
import { DEFAULT_SERVER } from '../constants';

interface State {
  masto: MastoClient | null,
  mastoLogged: boolean,
  mastoLoggin: boolean,
  mastoError: Error | null
}

interface Action {
  createMasto: (server: string | undefined, token: string | undefined) => void
}

export const useMastoStore = create<State & Action>(set => ({
  masto: null,
  mastoLogged: false,
  mastoLoggin: false,
  mastoError: null,
  createMasto: async (server, token) => {
     try {
        const newmasto = await login({
          url: `https://${server || DEFAULT_SERVER}`,
          accessToken: token ||'',
        })
    
        set({masto: newmasto, mastoLogged: true})
        if (server && token) {
          set({mastoLoggin: true})
        }
     }
     catch (e) {
        set({mastoError: e as Error})
     }
  },
}))
