import { login } from 'masto'


function createMasto() {
  return login({
    url: `https://mastodon.social`,
    accessToken: '',
  })
}



const maston = await createMasto()
console.log(maston, 'masto')

export const masto = maston
