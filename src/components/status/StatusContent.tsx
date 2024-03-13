import type { Status } from 'masto'
import { StatusBody } from './StatusBody'
import { StatusMedia } from './StatusMedia'
import { StatusCard } from './StatusCard'

interface Props {
  status: Status
}

export const StatusContent: React.FC<Props> = ({status}) => {
  return (
    <div className="
      space-y-3
      pt2 pb0.5 px3.5 br2 rounded-3 rounded-tl-none"
    >
      <StatusBody status={status} />
      {!!status.mediaAttachments?.length && <StatusMedia status={status}/>}
      {/* StatusPreviewCard */}
      { !!status.reblog && <StatusCard item={status.reblog} action={false}/>}
    </div>
  )
}
