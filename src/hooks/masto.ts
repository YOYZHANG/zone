import { login } from 'masto'


function createMasto() {
  return login({
    url: `https://mas.to`,
    accessToken: '',
  })
}

export const masto = await createMasto()
