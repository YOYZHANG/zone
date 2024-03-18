import { useLocalStorage } from "@reactuses/core";
import { CreateStatusParamsWithStatus } from "masto";
import { useState } from "react";
import { useMastoStore } from "../../store/masto";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/login";
import { AccountAvator } from "../account/AccountAvator";
import { EditorProvider} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  draftKey: string;
  inReplyToId?: string;
  placeholder?: string;
}

export const PublishWidget: React.FC<Props> = ({draftKey, inReplyToId, placeholder="what is on your mind ?"},) => {
  const [isSending, setIsSending] = useState(false)
  const {currentUser} = useCurrentUser()
  const {masto} = useMastoStore()
  const extensions = [
    StarterKit,
  ]

  const { editor, content } = useTiptap({

  })
  
  const getDefaultDraft = () => ({
    status: '',
    inReplyToId,
  })
  

  const handlePublish = async() => {
    if (!draft) return;
    try {
      setIsSending(true);
      console.log(draft, 'draft publish');
      await masto?.statuses.create(draft)
      setDraft(getDefaultDraft());
    }
    finally {
      setIsSending(false);
    }
  }

  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setDraft({...draft, status: e.target.value});
  // }
  return (<>
    {currentUser && <div className="flex flex-col gap4 py3 px2 sm:px4">
      <div className="flex gap-4 flex-1">
        <Link to={currentUser.account!.acct}>
          <AccountAvator account={currentUser.account!} />
        </Link>
        <div className="flex flex-col gap-3 flex-1 border-2 border-dashed border-transparent">
            <div className="
                relative flex-1 flex flex-col max-w-full min-h-30
                md:max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-400px)] max-h-35 of-y-auto overscroll-contain"
            >
              <EditorProvider  extensions={extensions} content={content}><div></div>
              </EditorProvider>
            </div>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-12 h-full sm:block hidden" />
        <div className="flex gap2 flex-1 pt2 justify-between max-full border-t border-base">
          <div className="flex-auto" />
          <button
            className="btn-solid rounded-full text-sm"
            // disabled={isEmpty || isUploading}
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>}
  </>)
}
