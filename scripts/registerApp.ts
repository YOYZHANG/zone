import {existsSync, mkdir, writeJSON} from 'fs-extra'
import { $fetch } from 'ohmyfetch'
import type { AppInfo } from '../src/types'

const KNOWN_SERVERS = [
  'mastodon.social',
]

const KNOWN_DOMAINS = [
  'http://localhost:8888',
  'https://zone.netlify.app'
]

const filename = 'public/registered-apps.json'

const registeredApps: Record<string, AppInfo> = {}

for (const server of KNOWN_SERVERS) {
  const redirect_uris = [
    'urn:ietf:wg:oauth:2.0:oob',
    ...KNOWN_DOMAINS.map(d => `${d}/api/oauth`),
  ].join('\n')

  const app = await $fetch(`https://${server}/api/v1/apps`, {
    method: 'POST',
    body: {
      client_name: 'zone',
      redirect_uris,
      scopes: 'read write follow push',
    },
  })

  registeredApps[server] = app

  console.log(registeredApps, 'registeredApps')

  console.log(`Registered app for ${server}`)
}

if (!existsSync('public'))
  await mkdir('public')

await writeJSON(filename, registeredApps, { spaces: 2})
