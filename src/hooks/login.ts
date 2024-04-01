import { useLocalStorage } from "@reactuses/core";
import { UserLogin } from "../types";
import { useEffect, useRef } from "react";
import {useMastoStore} from '../store/masto'
import { login } from "masto";
import { DEFAULT_SERVER } from "../constants";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

export async function useLogin(originUser: UserLogin) {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {createMasto, mastoLogged, mastoLoggin, setMastoLogin, setMastoError} = useMastoStore()
  const {setCurrentUser} = useUserStore()
  const loading = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      let user = originUser

      if (loading.current) return false
      
      if (mastoLoggin) return true

      if (accounts?.length && currentId) {
        user = accounts.find(u => u.account?.id === currentId)!
      }


      if (mastoLogged && !user?.token) return true

      try {
        loading.current = true
        const masto = await login({
          url: `https://${user.server || DEFAULT_SERVER}`,
          accessToken: user.token ||'',
        })
        loading.current = false
        
        createMasto(masto)

        if (user?.token) {
          const me = await masto.accounts.verifyCredentials()
          user.account = me
          setCurrentId(me.id)
          setCurrentUser(user)
          if (!accounts?.find(i => i.server === user.server)) {
            setAccounts([...accounts!, user])
          }

          setMastoLogin(true)
          navigate('/')
        }
      }
      catch(e) {
        setMastoError(e as Error)
      }
    })()
  }, [mastoLoggin, mastoLogged, accounts, currentId]);
  
    return true
}

