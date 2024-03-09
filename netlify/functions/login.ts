import { stringifyQuery } from 'ufo'
import { REDIRECT_URL, getapp } from './share'


export async function handler(event: any) {
  const {server} = event.queryStringParameters

  if (!server) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Server parameter is required' }),
    };
  }

  const app = await getapp()
  const loginQuery = stringifyQuery({
    client_id: app[server].client_id,
    scope: 'read write follow push',
    redirect_uri: REDIRECT_URL,
    response_type: 'code',
    server,
  })

  const url = `https://${server}/oauth/authorize?${loginQuery}`
  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
    body: '',
  }
}
