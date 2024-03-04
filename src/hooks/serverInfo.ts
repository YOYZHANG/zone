import { useLocalStorage } from "@reactuses/core";
import { ServerInfo } from "../types";
import { masto } from "../utils/masto";
import { useEffect } from "react";

const ServerInfoTTL = 60 * 60 * 1000 * 12 // 12 hour

export function useServerInfos(url: string) {
  const [serverInfos, setServerInfos] = useLocalStorage<Record<string, ServerInfo>>('zone-server-info', {})
  
  if (!serverInfos?.[url]) {
    // @ts-expect-error init
    setServerInfos({
      ...serverInfos,
      [url]: {
        timeUpdated: Date.now(),
        server: url,
      },
    })
  }


  useEffect(() => {
    (async () =>{
      if ((serverInfos?.[url].timeUpdated || 0) + ServerInfoTTL < Date.now()) {
        await Promise.allSettled([
          masto.instances.fetch().then((r) => {
            
            setServerInfos({
              ...serverInfos,
              [url]: {...serverInfos![url], ...r},
            })
          }),
          masto.customEmojis.fetchAll().then((r) => {
            setServerInfos({
              ...serverInfos,
              [url]: {...serverInfos![url], customEmojis: Object.fromEntries(r.map(i => [i.shortcode, i]))},
            })
          }),
        ])
      }
    })()
  }, [])
  


  return {
    serverInfos,
  }
}
