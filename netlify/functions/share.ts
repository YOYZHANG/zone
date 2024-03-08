interface AppInfo {
  id: string
  name: string
  website: string | null
  redirect_uri: string
  client_id: string
  client_secret: string
  vapid_key: string
}
// const registeredApps: Record<string, AppInfo> = {}
export function getMastoSocial():AppInfo {
  return {
    id: '',
    name: '',
    website: ''|| null,
    redirect_uri: '',
    client_id: '',
    client_secret: '',
    vapid_key: '',
  }
}
