import { Attachment } from 'masto'
import {FC} from 'react'

interface Prop {
  attachment: Attachment
}
export const ModalMediaPreview: FC<Prop> = ({attachment}) => {

  return (
  <div className="relative max-h-full max-w-full">
    <img
      src={attachment.url || attachment.previewUrl}
      alt={attachment.description || ''}
      className="max-h-[80vh] max-w-[80vw]"
    />
  </div>
  )
}
