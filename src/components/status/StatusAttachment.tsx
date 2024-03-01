import type { Attachment } from 'masto'

interface Props {
  attachment: Attachment
}

export const StatusAttachment: React.FC<Props> = ({attachment}) => {
  return (
    <>
      attachment.type === 'image' && (
        <img
          src={attachment.previewUrl}
          className="status-attachment-image border object-cover rounded-lg"
          alt={attachment.description!}
        />
      )
      // todo: other attachment types
    </>
  )
}
