import {stringifyQuery} from 'ufo'
import { $fetch } from 'ohmyfetch'
import { HOST_DOMAIN, REDIRECT_URL, getapp } from './share'

export async function handler(event: any) {
  const query = event.queryStringParameters
  const app = await getapp()

  const code = query.code;
  const server = query.server;
  console.log(code, 'code')
  const result: any = await $fetch(`https://${server}/oauth/token`, {
    method: 'POST',
    body: {
      client_id: app[server].client_id,
      client_secret: app[server].client_secret,
      redirect_uri: REDIRECT_URL,
      grant_type: 'authorization_code',
      code,
      scope: 'read write follow push',
    },
  })


  return {
    statusCode: 302,
    headers: {
      Location: `${HOST_DOMAIN}/login/callback?${stringifyQuery({ server: query.server, token: result.access_token })}`,
    },
    body: '',
  }
}
