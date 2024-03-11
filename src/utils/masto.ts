import { login } from 'masto'


function createMasto() {
  return login({
    url: `https://mastodon.social`,
    accessToken: 'JM5-Rh0vu682DroMTNMxUlDO0xSEOolBtMb8Mllh82o',
  })
}

export const masto = await createMasto()
