import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { login as loginMasto } from 'masto'
import { useEffect } from "react";
import { useAppCookies } from "./cookie";

export async function useLogin(user: UserLogin) {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {updateServerURL, updateToken} = useAppCookies()


  const existing = accounts!.findIndex(u => u.server === user.server && u.token === user.token)

  useEffect(() => {
    (async () => {
      if (existing === -1) {
        const masto = await loginMasto({
          url: `https://${user.server}`,
          accessToken: user.token,
        }) 

        const me = await masto.accounts.verifyCredentials()
        user.account = me
        setCurrentId(me.id)
        setAccounts([...accounts!, user])

        updateServerURL(user.server)
        updateToken(user.token)
        
        return true
      }
    })()
  }, [existing]);

  if (existing !== -1) {
    if (currentId === accounts?.[existing].account?.id) {
      return null
    }
      
    setCurrentId(user.account!.id)
    updateServerURL(user.server)
    updateToken(user.token)

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
