import { $fetch } from 'ofetch'
import { AppInfo } from '../../src/types'
import { APP_NAME } from '../../src/constants'
import { createClient } from 'redis';


export const HOST_DOMAIN = 'http://localhost:55632'
export const DEFAULT_SERVER = 'mas.to'

export function getRedirectURI(server: string) {
  return `${HOST_DOMAIN}/api/oauth?server=${server}`
}
async function fetchAppInfo(server: string): Promise<AppInfo> {
  const app = await $fetch(`https://${server}/api/v1/apps`, {
    method: 'POST',
    body: {
      client_name: APP_NAME,
      website: 'https://mastodon-zone.netlify.app/',
      redirect_uris: getRedirectURI(server),
      scopes: 'read write follow push',
    }
  })

  return app
}

export async function getApp(server: string= 'mastodon.social') {

  const client = await createClient({
      password: process.env.pswd,
      socket: {
          host: process.env.host,
          port: +process.env.port!
      }
  })
    .on('error', err => console.log('Redis Client Error!!!!!!!!!!!', err))
    .connect();

  const key = `zone:app_${HOST_DOMAIN.replace(/[^\w\d]/g, '-')}_${server}`


  try {
    const appInfo = await client.get(key)


    if (appInfo) {
      console.log(appInfo, 'use appInfo cache')
      client.disconnect()
      return JSON.parse(appInfo) as AppInfo
    }
  }
  catch(e) {
    console.error(e, 'get appInfo cache error')
  }

  
  const app = await fetchAppInfo(server)
  await  client.set(key, JSON.stringify(app))
  client.disconnect()
  return app
}

