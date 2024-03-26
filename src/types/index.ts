import type { Account, AccountCredentials, Attachment, CreateStatusParams, Emoji, Instance } from 'masto'
export type PaginatorState = 'idle' | 'loading' | 'done' | 'error'

export interface ServerInfo extends Instance {
  server: string
  timeUpdated: number
  customEmojis?: Record<string, Emoji>
}

export interface UserLogin {
  server: string
  token: string
  account?: AccountCredentials
}

export interface AppInfo {
  id: string
  name: string
  website: string | null
  redirect_uri: string
  client_id: string
  client_secret: string
  vapid_key: string
}

export interface SearchResultType {
  type: string
  to: string
  label?: string
  account?: Account
  hashtag?: any
  action?: {
    label: string
  }
}


export interface Draft {
  params: CreateStatusParams,
  initialText?: string
  attachments: Attachment[]
}

export type DraftMap = Record<string, Draft>
