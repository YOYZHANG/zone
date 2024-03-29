import {stringifyQuery} from 'ufo'
import { HOST_DOMAIN, getApp, getRedirectURI } from './share'
import {ofetch} from 'ofetch'

export async function handler(event: any) {
  const query = event.queryStringParameters
  const {code, server} = query
  const app = await getApp(server)

  if (!app) {
    return {
      statusCode: 401,
      body: `App not registered for server: ${server}`,
    }
  }
  const result: any = await ofetch(`https://${server}/oauth/token`, {
    method: 'POST',
    body: {
      client_id: app.client_id,
      client_secret: app.client_secret,
      redirect_uri: getRedirectURI(server),
      grant_type: 'authorization_code',
      code,
      scope: 'read write follow push',
    },
  })

  return {
    statusCode: 302,
    headers: {
      Location: `${HOST_DOMAIN}?${stringifyQuery({ server, token: result.access_token, vapid_key: app.vapid_key })}`,
    },
    body: '',
  }
}
