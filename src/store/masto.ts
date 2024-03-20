import { MastoClient, login } from 'masto'
import { create } from 'zustand'
import { DEFAULT_SERVER } from '../constants';

interface State {
  masto: MastoClient
}

interface Action {
  createMasto: (server: string | undefined, token: string | undefined) => void
}

const masto = await login({
  url: `https://${DEFAULT_SERVER}`,
  accessToken: '',
})

export const useMastoStore = create<State & Action>(set => ({
  masto,
  createMasto: async (server, token) => {

    const masto = await login({
      url: `https://${server || DEFAULT_SERVER}`,
      accessToken: token ||'',
    })

    set({masto});
  },
}))
