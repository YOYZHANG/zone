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
import { Draft } from "../../types";
import { PublishEmojiPicker } from "./PublishEmojiPicker";
import {fileOpen} from 'browser-fs-access'
import { Attachment, CreateStatusParams } from "masto";
import { PublishAttachment } from "./PublishAttachment";
import { useTranslation } from 'react-i18next'


interface Props {
  draftKey: string;
  inReplyToId?: string;
  placeholder?: string;
  initDraft?: Draft;
  _expand?: boolean;
  handlePublishFn?: () => void
}

export const PublishWidget: React.FC<Props> = ({
  draftKey,
  inReplyToId,
  handlePublishFn,
  placeholder,
  _expand=false,
  initDraft = getDefaultDraft({}),
}) => {
  inReplyToId
  const {draft, setDraft, isEmpty} = useDraft(draftKey, initDraft)
  const {t} = useTranslation()

  const [isExpand, setExpand] = useState(false)
  const shouldExpand = isExpand || !isEmpty || _expand

  const {currentUser} = useCurrentUser()

  const [isSending, setIsSending] = useState(false)

  const editor = useEditor({
    content: draft.params.status,
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: placeholder || t('placeholders.default'),
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
      setDraft({...draft, params: {...draft.params, status: editor.getHTML()}})
    },
    editorProps: {
      attributes: {
        class: 'content-editor rich-content',
      },
    },
    autofocus: shouldExpand,
    editable: true,
  }, [])

  const {masto} = useMastoStore()

  const handlePublish = async() => {
    if (!draft) return;

    try {
      setIsSending(true)

      if (draft) {
        const payload = {
          ...draft.params,
          status: htmlToText(draft.params.status),
          mediaIds: draft.attachments?.map(a => a.id) || [],
        } as CreateStatusParams

        await masto?.statuses.create(payload)
      }
    }
    finally {
      handlePublishFn && handlePublishFn()
      editor?.chain().clearContent().run()
      setDraft({...initDraft});
      setIsSending(false)
    }
  }

  const selectEmoji = (emoji: string) => {
    editor?.chain().insertContent(emoji).focus().run()
  }

  const [isUploading, setIsUploading] = useState(false)
  const [failed, setFailed] = useState<File[]>([])

  const uploadAttachments = async (files: File[]) => {
    setIsUploading(true)
    
    const attachments: Attachment[] = draft.attachments
    for (const f of files) {
      try {
        const attachment = await masto?.mediaAttachments.create({file: f}) as Attachment
        attachments.push(attachment)
      }
      catch (e) {
        console.error(e)
        setFailed([...failed, f])
      }
    }

    setDraft({...draft, attachments})

    setIsUploading(false)
  }

  const pickAttachments = async () => {
    const files = await fileOpen([
      {
        description: 'Attachments',
        multiple: true,
        mimeTypes: ['image/*'],
        extensions: ['.png', '.gif', '.jpeg', '.jpg', '.webp', '.avif', '.heic', '.heif'],
      },
      {
        description: 'Attachments',
        mimeTypes: ['video/*'],
        extensions: ['.webm', '.mp4', '.m4v', '.mov', '.ogv', '.3gp'],
      },
      {
        description: 'Attachments',
        mimeTypes: ['audio/*'],
        extensions: ['.mp3', '.ogg', '.oga', '.wav', '.flac', '.opus', '.aac', '.m4a', '.3gp', '.wma'],
      },
    ])

    await uploadAttachments(files)
  }

  const removeAttachment = (attachment: Attachment) => {
    setDraft({...draft, attachments: draft.attachments.filter((a) => a.id !== attachment.id)})
  }

  return (<>
    {currentUser && <div className="flex flex-col gap4 py3 px2 sm:px4">
      <div className="flex gap-4 flex-1">
        <Link to={`/user/${currentUser.account!.acct}`}>
          <AccountAvator account={currentUser.account!} />
        </Link>
        <div className={
          classNames("flex flex-col gap-3 flex-1 border-2 border-dashed border-transparent max-w-120 relative", {
          'pointer-events-none': isSending
        })}>
            <div className={classNames(
                "relative flex-1 flex flex-col max-w-full", {
                  "min-h-20 md:max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-400px)] max-h-35 of-y-auto overscroll-contain": shouldExpand
                })}>
              <EditorContent editor={editor} />
            </div>
            {shouldExpand && (<div className="absolute right-0 bottom-0 mt-8 pointer-events-none text-sm text-secondary-light">
            500 / { editor?.storage.characterCount.characters() }
            </div>)}

            {isUploading &&
              <div className="flex gap1 items-center text-sm text-primary p1">
                <div className="i-ri-loader-2-fill animate animate-spin"></div>
                <div>Uploading...</div>
              </div>
            }
            {
              failed.length > 0 &&
              <div className="flex flex-col gap1 text-sm p2 text-red:600 dark:text-red:400 border border-base border-rounded border-red:600 dark:border-red:400 mb8">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-x-2 font-bold">
                      <div className="i-ri:error-warning-fill" />
                      <p>Upload Fail</p>
                    </div>
                    <button
                      className="flex rounded-4 p1 hover:bg-active cursor-pointer transition-100"
                      onClick={() => {setFailed([])}}
                    >
                      <span className="w-1.75em h-1.75em i-ri:close-line"/>
                    </button>
                  </div>
                  <ol className="pl2">
                    {failed.map((f) => <li key={f.name}>{f.name}</li>)}
                  </ol>
              </div>
            }
            {
              draft?.attachments?.length > 0 &&
              <div className="pb8">
                  {draft.attachments.map((attachment) => (
                    <div key={attachment.id}>
                        <PublishAttachment attachment={attachment} remove={() => removeAttachment(attachment)}></PublishAttachment>
                    </div>
                  ))}
              </div>
            }
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-12 h-full sm:block hidden" />
        {shouldExpand && <div className="flex gap2 flex-1 pt2 justify-between max-full border-t border-base">
          <PublishEmojiPicker selectEmoji={selectEmoji}/>
          <button className="btn-action-icon" onClick={pickAttachments}>
            <div className="i-ri:image-add-line"></div>
          </button>
          <div className="flex-auto" />
          <button
            className="btn-solid rounded-full text-sm flex gap2 text-center items-center"
            disabled={isEmpty || (draft.attachments.length === 0 && !draft.params.status)}
            onClick={handlePublish}
          >
            <div className={classNames({
              'i-ri-loader-4-line animate animate-spin': isSending
            })}></div>
            {t('action.publish')}
          </button>
        </div>}
      </div>
    </div>}
  </>)
}
