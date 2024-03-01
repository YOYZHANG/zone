import type { Status } from 'masto'
import { StatusActions } from './StatusActions'
import { StatusBody } from './StatusBody'
import { AccountInfo } from '../accunt/AccountInfo'
import { useTimeAgo } from '../../hooks/time'
import { StatusMedia } from './StatusMedia'

export interface StatusProps {
  status: Status,
}
export const StatusCard: React.FC<StatusProps> = ({status}) => {
  const timeAgo = useTimeAgo(status.createdAt)
  return (
    <div className="flex flex-col gap-2 my-2 px-4">
      <AccountInfo account={status?.account}>
        <div className="text-sm op50"> {timeAgo} </div>
      </AccountInfo>
      <div>
        <StatusBody status={status}></StatusBody>
        {status.mediaAttachments?.length && (
          <StatusMedia
            status={status}
          />
        )}
      </div>
      <StatusActions status={status}></StatusActions>
    </div>
  )
}
