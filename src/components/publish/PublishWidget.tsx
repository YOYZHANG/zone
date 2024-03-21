import { useState } from "react";
import { useMastoStore } from "../../store/masto";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/login";
import { AccountAvator } from "../account/AccountAvator";
import { EditorContent, useEditor, Extension} from '@tiptap/react'
import { getDefaultDraft, useDraft } from "../../hooks/draft";
import classNames from "classnames";
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { htmlToText } from "../../utils/parse";


interface Props {
  draftKey: string;
  inReplyToId?: string;
  placeholder?: string;
  _expand?: boolean;
  closeModal?: () => void
}

export const PublishWidget: React.FC<Props> = ({
  draftKey,
  inReplyToId,
  placeholder="what is on your mind ?",
  _expand=false,
  closeModal
}) => {
  inReplyToId
  const {draft, setDraft, isEmpty} = useDraft(draftKey)
  const [isExpand, setExpand] = useState(false)
  const shouldExpand = isExpand || !isEmpty || _expand

  const {currentUser} = useCurrentUser()
  const {masto} = useMastoStore()

  const [isSending, setIsSending] = useState(false)

  const editor = useEditor({
    content: draft.params.status,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: 500,
      }),
      Extension.create({
        name: 'api',
        onFocus() {
          setExpand(true)
        },
      }),
    ],
    onUpdate({ editor }: any) {
      setDraft({...draft, params: {status: editor.getHTML()}})
    },
    editorProps: {
      attributes: {
        class: 'content-editor rich-content',
      },
    },
    autofocus: shouldExpand,
    editable: true,
  }, [])

  const handlePublish = async() => {
    if (!draft) return;

    try {
      setIsSending(true)

      if (draft) {
        const payload = {...draft.params, status: htmlToText(draft.params.status)}
        await masto?.statuses.create(payload)
        setDraft(getDefaultDraft());
      }

      // 关闭模态框
      closeModal?.()
    }
    finally {
      setIsSending(false);
    }
  }
  return (<>
    {currentUser && <div className="flex flex-col gap4 py3 px2 sm:px4">
      <div className="flex gap-4 flex-1">
        <Link to={currentUser.account!.acct}>
          <AccountAvator account={currentUser.account!} />
        </Link>
        <div className={
          classNames("flex flex-col gap-3 flex-1 border-2 border-dashed border-transparent max-w-120 relative", {
          'pointer-events-none': isSending
        })}>
            <div className={classNames(
                "relative flex-1 flex flex-col max-w-full", {
                  "min-h-30 md:max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-400px)] max-h-35 of-y-auto overscroll-contain": shouldExpand
                })}>
              <EditorContent editor={editor} />
            </div>
            {shouldExpand && (<div className="absolute right-0 bottom-0 pointer-events-none text-sm text-secondary-light">
            500 / { editor?.storage.characterCount.characters() }
            </div>)}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-12 h-full sm:block hidden" />
        {shouldExpand && <div className="flex gap2 flex-1 pt2 justify-between max-full border-t border-base">
          <div className="flex-auto" />
          <button
            className="btn-solid rounded-full text-sm"
            disabled={isEmpty}
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>}
      </div>
    </div>}
  </>)
}
