import { create } from 'zustand'

interface State {
  isMediaPreviewOpen: boolean
}

interface Action {
  setIsMediaPreviewOpen: (isMediaPreviewOpen: boolean) => void
}

export const useModelStore = create<State & Action>(set => ({
  isMediaPreviewOpen: false,
  setIsMediaPreviewOpen: (isMediaPreviewOpen: boolean) => {
    set({isMediaPreviewOpen: isMediaPreviewOpen})
  }
}))
