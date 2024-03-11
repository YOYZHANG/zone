import {stringifyQuery} from 'ufo'
import { $fetch } from 'ohmyfetch'
import { HOST_DOMAIN, REDIRECT_URL, getApp } from './share'

export async function handler(event: any) {
  const query = event.queryStringParameters

  const code = query.code
  const server = query.server
  if (!server) {
    return {
      statusCode: 401,
    }
  }

  const app = getApp(server)
  const result: any = await $fetch(`https://${server}/oauth/token`, {
    method: 'POST',
    body: {
      client_id: app.client_id,
      client_secret: app.client_secret,
      redirect_uri: `${REDIRECT_URL}?server=${server}`,
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
