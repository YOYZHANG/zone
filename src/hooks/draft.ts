import { useLocalStorage } from "@reactuses/core";
import { Draft, DraftMap } from "../types";

const isEmptyDraft = (draft: Draft) => {
  if (!draft || !draft.params.status?.length)
    return true

  return draft.params.status === '<p></p>'
}

export const getDefaultDraft = (options: Partial<Draft['params']> = {}):Draft  => {
  const {
    status,
    inReplyToId
  } = options

  return {
    params: {
      status,
      inReplyToId,
      mediaIds: []
    },
  }
}

export function useDraft(draftKey: string) {
  const [currentDraft, setCurrentDraft] = useLocalStorage<DraftMap>('zone-drafts', {})

  const draft = currentDraft?.[draftKey] || getDefaultDraft({})
  const setDraft = (val: Draft) => {
    currentDraft![draftKey] = val;
    setCurrentDraft({...currentDraft})
  }

  console.log(draft, 'draft')
  const isEmpty = isEmptyDraft(draft)


  return { draft, isEmpty, setDraft}
}
