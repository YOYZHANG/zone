import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { useEffect } from "react";
import {useMastoStore} from '../store/masto'

export async function useLogin(user: UserLogin) {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {masto, createMasto, setMastoLogin} = useMastoStore()

  const existing = accounts!.findIndex(u => u.server === user.server && u.token === user.token)

  useEffect(() => {
    (async () => {
      if (existing === -1) {
        await createMasto(user.server, user.token)

        const me = await masto!.accounts.verifyCredentials()
        user.account = me
        setCurrentId(me.id)
        setAccounts([...accounts!, user])

        setMastoLogin(true)
        location.href="/"
      
        return true
      }
    })()
  }, [user]);

  if (existing !== -1) {
    if (currentId === accounts?.[existing].account?.id) {
      console.log('reuse login cookie')
    }
    else {
      setCurrentId(user.account!.id)
    }
    
    console.log('login success: redirect cache')
    location.href="/"

    return true
  }
}

export function useCurrentUser() {
  const [accounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId] = useLocalStorage<string>('zone-current', '')

  let currentUser = null;

  if (currentId && accounts?.length) {
    currentUser = {...accounts.find(user => user.account?.id === currentId)}
  }

  return {currentUser}
}
