import { useLocalStorage } from "@reactuses/core";
import { Draft, DraftMap } from "../types";
import { Status } from "masto";

const isEmptyDraft = (draft: Draft) => {
  if (!draft || !draft.params.status?.length)
    return true

  return draft.params.status === '<p></p>'
}

export const getDefaultDraft = (options: Partial<Draft['params'] & Omit<Draft, 'params'>> = {}):Draft  => {
  const {
    status,
    inReplyToId,
    initialText
  } = options

  return {
    params: {
      status,
      inReplyToId,
      mediaIds: []
    },
    initialText
  }
}

export function useDraft(draftKey: string, initDraft: Draft) {
  const [currentDraft, setCurrentDraft] = useLocalStorage<DraftMap>('zone-drafts', {})

  const draft = currentDraft?.[draftKey] || initDraft
  const setDraft = (val: Draft) => {
    currentDraft![draftKey] = val;
    setCurrentDraft({...currentDraft})
  }

  const isEmpty = isEmptyDraft(draft)

  return { draft, isEmpty, setDraft}
}

function mentionHTML(acct: string) {
  return `<span data-type="mention" data-id="${acct}" contenteditable="false">@${acct}</span>`
}

export function getReplyDraft (status: Status)  {
  const accountsToMention: string[] = []
  
  accountsToMention.push(status.account.acct)
  accountsToMention.push(...(status.mentions.map(mention => mention.acct)))

  return {
    key: `reply-${status.id}`,
    draft: () => {
      return getDefaultDraft({
        initialText: accountsToMention.map(acct => mentionHTML(acct)).join(' '),
        inReplyToId: status!.id,
        visibility: status.visibility,
      })
    },
  }
}
