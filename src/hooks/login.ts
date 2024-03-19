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

        console.log(masto, 'masto login')

        const me = await masto.accounts.verifyCredentials()
        user.account = me
        setCurrentId(me.id)
        setAccounts([...accounts!, user])
        console.log('setAccounts!!', user)

        updateServerURL(user.server)
        updateToken(user.token)
        location.href="/"
        
        return true
      }
    })()
  }, [existing, user]);

  if (existing !== -1) {
    if (currentId === accounts?.[existing].account?.id) {
      console.log('reuse login cookie')
    }
    else {
      setCurrentId(user.account!.id)
      updateServerURL(user.server)
      updateToken(user.token)
    }
      
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
