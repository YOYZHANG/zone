import type { Status } from 'masto'
import { StatusAttachment } from './StatusAttachment'
import styles from './statusMedia.module.css';

interface Props {
  status: Status
}

export const StatusMedia: React.FC<Props> = ({status}) => {
  return (
    <div className={styles[`status-media-container-${status.mediaAttachments.length}`]}>
      {status.mediaAttachments.map(attachment =>
        (<StatusAttachment attachment={attachment}></StatusAttachment>)
      )}
    </div>
  )
}
