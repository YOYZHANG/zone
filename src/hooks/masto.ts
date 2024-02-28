import { login } from 'masto'


function createMasto() {
  return login({
    url: `https://mastodon.social`,
    accessToken: 'JM5-Rh0vu682DroMTNMxUlDO0xSEOolBtMb8Mllh82o',
  })
}



const maston = await createMasto()
console.log(maston, 'masto')

export const masto = maston
