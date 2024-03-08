import {parseQuery, stringifyQuery} from 'ufo'
import { $fetch } from 'ohmyfetch'
import { getMastoSocial } from './share'

const HOST_DOMAIN = 'http://localhost:64492'
const SERVER = 'masto.social'
export async function handler(event: any) {
  const queryString = event.queryStringParameters
  const query = parseQuery(queryString)
  const app = getMastoSocial()

  const code = query.code;
  const result: any = await $fetch(`https://${SERVER}/oauth/token`, {
    method: 'POST',
    body: {
      client_id: app.client_id,
      client_secret: app.client_secret,
      redirect_uri: `${HOST_DOMAIN}/api/oauth`,
      grant_type: 'authorization_code',
      code,
      scope: 'read write follow push',
    },
  })

  return {
    statusCode: 302,
    headers: {
      Location: `${HOST_DOMAIN}/login/callback?${stringifyQuery({ server: SERVER, token: result.access_token })}`,
    },
    body: '',
  }
}
