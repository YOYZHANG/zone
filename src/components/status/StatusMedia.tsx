import type { Status } from 'masto'
import { StatusAttachment } from './StatusAttachment'

interface Props {
  status: Status
}

export const StatusMedia: React.FC<Props> = ({status}) => {
  return (
    <>
      {status.mediaAttachments.map(attachment =>
        {<StatusAttachment attachment={attachment}></StatusAttachment>}
      )}
    </>
  )
}
