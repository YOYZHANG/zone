import { stringifyQuery } from 'ufo'
import { getApp, getRedirectURI } from './share'


export async function handler(event: any) {
  const {server} = event.queryStringParameters

  if (!server) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Server parameter is required' }),
    };
  }

  const app = await getApp(server)

  const loginQuery = stringifyQuery({
    client_id: app.client_id,
    scope: 'read write follow push',
    redirect_uri: getRedirectURI(server),
    response_type: 'code',
  })

  const url = `https://${server}/oauth/authorize?${loginQuery}`

  console.log('login redirecting to', url)
  return {
    statusCode: 200,
    body: url,
  }
}
