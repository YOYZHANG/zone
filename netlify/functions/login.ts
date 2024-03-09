import { stringifyQuery } from 'ufo'
import { REDIRECT_URL, getApp } from './share'


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
    redirect_uri: `${REDIRECT_URL}?server=${server}`,
    response_type: 'code',
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
