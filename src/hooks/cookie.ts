import { useCookie } from "@reactuses/core"
import { DEFAULT_SERVER } from "../constants"

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
