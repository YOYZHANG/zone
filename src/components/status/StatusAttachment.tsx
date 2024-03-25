import type { Attachment } from 'masto'
import { CommonBlurhash } from '../common/CommonBlurhash'
import { ModalDialog } from '../modal/ModalDialog'
import { ModalMediaPreview } from '../modal/ModalMediaPreview'
import { useState } from 'react'

interface Props {
  attachment: Attachment
}

export const StatusAttachment: React.FC<Props> = ({attachment}) => {
  const openMediaPreview = () => {
    setIsMediaPreviewOpen(true)
  }

  const [isMediaPreviewOpen, setIsMediaPreviewOpen] = useState(false)

  const srcset =[
    [attachment.url, attachment.meta?.original?.width],
    [attachment.remoteUrl, attachment.meta?.original?.width],
    [attachment.previewUrl, attachment.meta?.small?.width],
  ].filter(([url]) => url).map(([url, size]) => `${url} ${size}w`).join(', ')

  return (
    <div className="w-full h-full">
      {attachment.type === 'video' && (
        <video
          poster={attachment.previewUrl}
          controls
          className="border border-base object-cover"
          width={attachment.meta?.original?.width}
          height={attachment.meta?.original?.height}
        >
          <source src={attachment.url || attachment.previewUrl} type="video/mp4" />
        </video>
      )}
      {attachment.type === 'gifv' && (
        <video
          poster={attachment.previewUrl}
          loop
          autoPlay
          className="border border-base object-cover"
          width={attachment.meta?.original?.width}
          height={attachment.meta?.original?.height}
        >
          <source src={attachment.url || attachment.previewUrl} type="video/mp4" />
        </video>
      )}
      {attachment.type === 'audio' && (
        <audio
          controls
          className='border border-base'
        >
          <source src={attachment.url || attachment.previewUrl} type="audio/mp3" />
        </audio>
      )}
      {attachment.type === 'image' && (
        <>
          <button
            className='focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset rounded-lg w-full'
            onClick={openMediaPreview}
          >
            <CommonBlurhash
              blurhash={attachment.blurhash}
              src={attachment.previewUrl || attachment.url || attachment.remoteUrl!}
              srcset={srcset}
              width={attachment.meta?.original?.width}
              height={attachment.meta?.original?.height}
            />
          </button>
          {isMediaPreviewOpen && <ModalDialog
            showModal={isMediaPreviewOpen}
            setShowModal={setIsMediaPreviewOpen}
          >
            <ModalMediaPreview attachment={attachment}/>
          </ModalDialog>}
        
        </>
      )}
    </div>
  )
}
