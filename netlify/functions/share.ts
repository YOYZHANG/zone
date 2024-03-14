import { $fetch } from 'ofetch'
import { AppInfo } from '../../src/types'
import { APP_NAME } from '../../src/constants'
import { createStorage } from 'unstorage'

const storage = createStorage()

export const HOST_DOMAIN = 'http://localhost:64930'
export const DEFAULT_SERVER = 'mas.to'

export function getRedirectURI(server: string) {
  return `${HOST_DOMAIN}/api/oauth`
}
async function fetchAppInfo(server: string): Promise<AppInfo> {
  const app = await $fetch(`https://${server}/api/v1/apps`, {
    method: 'POST',
    body: {
      client_name: APP_NAME,
      website: 'https://maston-zone.netlify.com',
      redirect_uris: getRedirectURI(server),
      scopes: 'read write follow push',
    }
  })

  return app
}

export async function getApp(server: string= 'mastodon.social') {
  const key = `zone:app_${server}`

  const appInfo = await storage.getItem(key)

  if (appInfo) {
    console.log(appInfo, 'use appInfo cache')
    return appInfo as AppInfo
  }

  const app = await fetchAppInfo(server)
  await storage.setItem(key, app)
  console.log(app, 'use appInfo')
  return app
}

