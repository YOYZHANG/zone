import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { useEffect } from "react";
import {useMastoStore} from '../store/masto'
import { useNavigate } from "react-router-dom";
import { login } from "masto";
import { DEFAULT_SERVER } from "../constants";

export async function useLogin(originUser: UserLogin) {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {createMasto, mastoLogged, mastoLoggin, setMastoLogin, setMastoError} = useMastoStore()
  const navigate = useNavigate()
  console.log(mastoLoggin, 'mastoLoggin')
  console.log(mastoLogged, 'mastoLogged')
  console.log(originUser, 'originUser')

  useEffect(() => {
    (async () => {
      let user = originUser
      let existing = false
      
      if (mastoLoggin) return true


      console.log(accounts, 'accounts')
      console.log(currentId, 'currentId')

      if (accounts?.find(u => u.server === user?.server && u.token === user?.token)) {
        console.log('1')
        existing = true
      }
      else if (accounts?.length && currentId) {
        console.log('2')
        existing =true
        user = accounts.find(u => u.account?.id === currentId)!

        console.log(user, 'user account')
      }

      if (mastoLogged && !user?.token) return true


      console.log(mastoLogged, 'mastoLogged')
      console.log(existing, 'existing')

      if (!existing) {
        console.log('create masto')
        try {
          const masto = await login({
            url: `https://${user.server || DEFAULT_SERVER}`,
            accessToken: user.token ||'',
          })
          
          createMasto(masto)
  
          if (user?.token) {
            setMastoLogin(true)
            console.log('first login', masto)
            const me = await masto.accounts.verifyCredentials()
            user.account = me
            console.log('account user', user)
            setCurrentId(me.id)
            setAccounts([...accounts!, user])
          }
        }
        catch(e) {
          setMastoError(e as Error)
        }
      }
      navigate('/')
    })()
  }, [mastoLoggin, mastoLogged, accounts, currentId]);
  
    return true
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

