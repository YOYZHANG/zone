import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { useEffect } from "react";
import {useMastoStore} from '../store/masto'
import { useNavigate } from "react-router-dom";

export async function useLogin(user: UserLogin) {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {masto, createMasto, setMastoLogin} = useMastoStore()
  const navigate = useNavigate()

  const existing = accounts!.findIndex(u => u.server === user.server && u.token === user.token)

  useEffect(() => {
    (async () => {
      if (existing === -1) {
        await createMasto(user.server, user.token)

        const me = await masto?.accounts?.verifyCredentials()
        if (!me) return false
        user.account = me
        setCurrentId(me.id)
        setAccounts([...accounts!, user])
        setMastoLogin(true)

        navigate('/')
      
        return true
      }
    })()
  }, [user]);

  if (existing !== -1) {
    if (currentId !== accounts?.[existing].account?.id) {
      setCurrentId(user.account!.id)
    }

    navigate('/')

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

