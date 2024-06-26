import { MastoClient } from 'masto'
import { create } from 'zustand'

interface State {
  masto: MastoClient | null,
  mastoLogged: boolean,
  mastoLoggin: boolean,
  mastoError: Error | null
}

interface Action {
  createMasto: (masto: MastoClient) => void,
  setMastoLogin: (loggin: boolean) => void,
  setMastoError: (e: Error) => void
  setMastoLogged: (logged: boolean) => void
}

export const useMastoStore = create<State & Action>(set => ({
  masto: null,
  mastoLogged: false,
  mastoLoggin: false,
  mastoError: null,
  createMasto: (masto: MastoClient) => {
    set({masto, mastoLogged: true, mastoError: null})
  },
  setMastoLogin: (loggin: boolean) => {
    set({mastoLoggin: loggin})
  },
  setMastoError(e) {
    set({mastoError: e as Error})
  },
  setMastoLogged(logged: boolean) {
    set({mastoLogged: logged})
  }
}))
