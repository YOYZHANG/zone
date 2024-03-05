import type { Status } from 'masto'
import { StatusActions } from './StatusActions'
import { StatusBody } from './StatusBody'
import { AccountInfo } from '../account/AccountInfo'
import { useTimeAgo } from '../../hooks/time'
import { StatusMedia } from './StatusMedia'
import { AccountInlineInfo } from '../account/AccountInlineInfo'

export interface StatusProps {
  status: Status,
  action?: boolean
}

export const StatusCard: React.FC<StatusProps> = ({status, action = true}) => {
  const timeAgo = useTimeAgo(status.createdAt)
  const cardStatus = status.reblog && !status.content ? status.reblog : status

  const rebloggedBy = status.reblog ? status.account : ''

  return (
    <div className="flex flex-col my-2 px-4">
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
      <div className="pl12">
        <StatusBody status={cardStatus}></StatusBody>
        {!!cardStatus.mediaAttachments?.length && (
          <StatusMedia
            status={cardStatus}
          />
        )}
      </div>
      {
        cardStatus.reblog && (<StatusCard status={cardStatus.reblog} action={false}/>)
      }
      <div className="pl12 pb-3">
        {action && <StatusActions status={cardStatus}></StatusActions>}
      </div>
    </div>
  )
}

