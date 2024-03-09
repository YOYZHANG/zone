import { useCookie } from "@reactuses/core"
import { DEFAULT_SERVER } from "../constants"
import { useState } from "react"

export function useAppCookies() {
  const [serverURL, updateServerURL] = useCookie('zone-server', {}, DEFAULT_SERVER)
  const [token, updateToken] = useCookie('zone-token')

  return {
    serverURL,
    updateServerURL,
    token,
    updateToken
  }
}

export function useLoginState() {
  const [token] = useCookie('zone-token')
  const [isLogin, setIsLogin] = useState(!!token)
  
  return {
    isLogin,
    setIsLogin
  }
}
