import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { login as loginMasto } from 'masto'
import { useEffect, useState } from "react";
import { useAppCookies } from "./cookie";

export async function useLogin(user: UserLogin) {
  console.log('inuseLogin', user)
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {updateServerURL, updateToken} = useAppCookies()
  
  updateServerURL(user.server)
  updateToken(user.token)

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
        console.log(user, 'user!!!')
        setAccounts([...accounts!, user])

        return true
      }
    })()
  }, [existing]);

  if (existing !== -1) {
    if (currentId === accounts?.[existing].account?.id)
        return null
    setCurrentId(user.account!.id)
    return true
  }
}

export function useCurrentUser() {
  const [accounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId] = useLocalStorage<string>('zone-current', '')
  const [currentUser, setCurrentUser] = useState<UserLogin | null>(null)

  console.log(accounts, 'accounts')
  console.log(currentId, 'currentId')

  if (currentId && accounts?.length) {
    setCurrentUser(accounts.find(user => user.account?.id === currentId) || accounts?.[0])
  }

  return {currentUser, setCurrentUser}
}
