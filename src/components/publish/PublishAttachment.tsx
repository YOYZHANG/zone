import { Attachment } from "masto"
import { StatusAttachment } from "../status/StatusAttachment"

interface Props {
  attachment: Attachment;
  remove: () => void;
}
export const PublishAttachment: React.FC<Props> = ({attachment, remove}) => {
  return (
    <div className="w-full relative">
      <StatusAttachment attachment={attachment}></StatusAttachment>
      <div className="absolute right-2 top-2">
        <div className="btn-action-icon" onClick={remove}>
          <div className="text-3 i-ri-close-fill"></div>
        </div>
      </div>
    </div>
  )
}
