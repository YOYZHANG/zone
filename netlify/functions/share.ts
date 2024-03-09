import {$fetch} from 'ohmyfetch'
import { AppInfo } from '../../src/types'
export const HOST_DOMAIN = 'http://localhost:8888'
export const DEFAULT_SERVER = 'mastodon.social'
export const REDIRECT_URL = `${HOST_DOMAIN}/api/oauth`
const registeredApps: Record<string, AppInfo> = {}
const registeredAppsUrl = `${HOST_DOMAIN}/registered-apps.json`

const promise = $fetch(registeredAppsUrl, { responseType: 'json' })
  .then((r: any) => {
    Object.assign(registeredApps, r)
  })
  .catch((e) => {
    console.error(e)
  })

export async function getapp() {
    await promise
    return registeredApps
}

