import {readJSONSync} from 'fs-extra'
import { AppInfo } from '../../src/types'
import { resolve } from 'path'

export const HOST_DOMAIN = 'http://localhost:8888' || 'https://zone.netlify.app'
export const DEFAULT_SERVER = 'mas.to'
export const REDIRECT_URL = `${HOST_DOMAIN}/api/oauth`


const registeredApps: Record<string, AppInfo> = {}
const registeredAppsUrl = resolve('./public/registered-app.json')

export function getApp(server: string): AppInfo {
  if (!registeredApps[server]) {
    try {
      const json = readJSONSync(registeredAppsUrl)
      Object.assign(registeredApps, json)
    }
    catch (e) {
      console.error(e)
    }
  }

  return registeredApps[server]
}

