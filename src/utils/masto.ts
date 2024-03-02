import { login } from 'masto'


function createMasto() {
  return login({
    url: `https://mastodon.social`,
    accessToken: '',
  })
}

export const masto = await createMasto()
