import { stringifyQuery } from 'ufo'
import { getMastoSocial } from './share'
const HOST_DOMAIN = 'http://localhost:64492'
const SERVER = 'masto.social'

export async function handler(event: any) {
  console.log(event.queryStringParameters, 'event.queryStringParameters')
  const app = getMastoSocial()
  const query = stringifyQuery({
    client_id: app.client_id,
    scope: 'read write follow push',
    redirect_uri: `${HOST_DOMAIN}/api/oauth`,
    response_type: 'code',
  })
  const url = `https://${SERVER}/oauth/authorize?${query}`
  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
    body: '',
  }
}
