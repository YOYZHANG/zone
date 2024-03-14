import {stringifyQuery} from 'ufo'
import { $fetch } from 'ofetch'
import { HOST_DOMAIN, getApp, getRedirectURI } from './share'

export async function handler(event: any) {
  const query = event.queryStringParameters

  const {code, server = 'mastodon.social'} = query

  console.log(code, 'code')
  console.log(server, 'server')

  const app = await getApp(server)

  if (!app) {
    return {
      statusCode: 401,
      body: `App not registered for server: ${server}`,
    }
  }

  console.log({
    client_id: app.client_id,
    client_secret: app.client_secret,
    redirect_uri: getRedirectURI(server),
    grant_type: 'authorization_code',
    code,
    scope: 'read write follow push',
  }, 'oauth');
  const result: any = await $fetch(`https://${server}/oauth/token`, {
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

  console.log(result, 'oauth result') 

  return {
    statusCode: 302,
    headers: {
      Location: `${HOST_DOMAIN}/login/callback?${stringifyQuery({ server, token: result.access_token, vapid_key: app.vapid_key })}`,
    },
    body: '',
  }
}
