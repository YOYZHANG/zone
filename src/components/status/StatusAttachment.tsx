import type { Attachment } from 'masto'

interface Props {
  attachment: Attachment
}

export const StatusAttachment: React.FC<Props> = ({attachment}) => {
  return (
    <div className="w-full h-full">
      {attachment.type === 'image' && (
        <img
          src={attachment.previewUrl}
          loading="lazy"
          className="status-attachment-image border object-cover rounded-lg"
          alt={attachment.description!}
        />
      )}
    </div>
  )
}
