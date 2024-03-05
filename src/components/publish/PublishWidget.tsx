import { useLocalStorage } from "@reactuses/core";
import classNames from "classnames";
import { CreateStatusParamsWithStatus } from "masto";
import { useState } from "react";
import { masto } from "../../utils/masto";

interface Props {
  draftKey: string;
  inReplyToId?: string;
  placeholder?: string;
}

export const PublishWidget: React.FC<Props> = ({draftKey, inReplyToId, placeholder="what is on your mind ?"},) => {
  const [isSending, setIsSending] = useState(false);
  const getDefaultDraft = () => ({
    status: '',
    inReplyToId,
  })
  const [draft, setDraft] = useLocalStorage<CreateStatusParamsWithStatus>(`zone-draft-${draftKey}`, getDefaultDraft());

  const handlePublish = async() => {
    if (!draft) return;
    try {
      setIsSending(true);
      console.log(draft, 'draft publish');
      await masto.statuses.create(draft)
      setDraft(getDefaultDraft());
    }
    finally {
      setIsSending(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft({...draft, status: e.target.value});
  }
  return (<>
    <div className={classNames("flex flex-col gap-4 w-full", {
      'pointer-events-none': isSending
    })}>
      <textarea
        value={draft?.status}
        placeholder={placeholder}
        className="p2 border-rounded w-full h-40 bg-gray:10 outline-none border" 
        onChange={handleChange}
      />
      <div className="flex justify-end cursor-pointer">
        <button
          className="h-7 w-22 bg-gray border-rounded hover:bg-gray:60 text-white"
          disabled={draft?.status === ''}
          onClick={handlePublish}
        >Publish!</button>
      </div>
    </div>
  </>)
}
