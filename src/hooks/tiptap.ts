import {useEditor, Extension} from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useState } from 'react'
import { useLocalStorage } from '@reactuses/core'
import { CreateStatusParamsWithStatus } from 'masto'

export interface UseTiptapOptions {
  content: string
  placeholder: string
  onSubmit: () => void
  onFocus: () => void
  onPaste: (event: ClipboardEvent) => void
  autofocus: boolean
}

export function useTiptap(options: UseTiptapOptions) {
  const [content, setContent] = useState('');
  const {
    autofocus,
    placeholder,
  } = options

  const editor = useEditor({
    content: content,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Extension.create({
        name: 'api',
        addKeyboardShortcuts() {
          return {
            'Mod-Enter': () => {
              options.onSubmit()
              return true
            },
          }
        },
        onFocus() {
          options.onFocus()
        },
      }),
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'content-editor rich-content',
      },
    },
    autofocus,
    editable: true,
  })

  editor!.commands.setContent(content || '')

  return {
    editor,
    content
  }
}
