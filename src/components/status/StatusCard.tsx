import type { Status } from 'masto'
import { StatusActions } from './StatusActions'
import { StatusBody } from './StatusBody'
import { AccountInfo } from '../accunt/AccountInfo'
import { useTimeAgo } from '../../hooks/time'
import { StatusMedia } from './StatusMedia'
import { AccountInlineInfo } from '../accunt/AccountInlineInfo'

export interface StatusProps {
  status: Status,
}

export const StatusCard: React.FC<StatusProps> = ({status}) => {
  const timeAgo = useTimeAgo(status.createdAt)
  const cardStatus = status.reblog && !status.content ? status.reblog : status

  const rebloggedBy = status.reblog ? status.account : ''

  return (
    <div className="flex flex-col gap-2 my-2 px-4">
      {rebloggedBy && (
        <div className='pl8 flex gap-1 items-center text-gray:75 text-sm'>
          <div className="i-ri:repeat-fill mr-1"></div>
          <AccountInlineInfo account={rebloggedBy} />
          reblogged
        </div>
      )}
      <AccountInfo account={cardStatus?.account}>
        <div className="text-sm op50"> {timeAgo} </div>
      </AccountInfo>
      <div>
        <StatusBody status={cardStatus}></StatusBody>
        {cardStatus.mediaAttachments?.length && (
          <StatusMedia
            status={cardStatus}
          />
        )}
      </div>
      <StatusActions status={cardStatus}></StatusActions>
    </div>
  )
}
