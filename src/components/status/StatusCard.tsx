import type { Status } from 'masto'
import { StatusActions } from './StatusActions'
import { useTimeAgo } from '../../hooks/time'
import {CommonTooltip} from '../common/CommonTooltip'
import { Link } from 'react-router-dom'
import {AccountAvator} from '../account/AccountAvator'
import { StatusAccountDetails } from './StatusAccountDetails'
import {StatusContent} from './StatusContent'
export interface StatusProps {
  item: Status,
  action?: boolean
}

export const StatusCard: React.FC<StatusProps> = ({item, action = true}) => {
  const timeAgo = useTimeAgo(item.createdAt)
  const cardStatus = item.reblog && !item.content ? item.reblog : item

  // const rebloggedBy = item.reblog ? item.account : ''

  return (
    <div className="flex flex-col gap1 px-4 pt-1 pb-1 transition-100 hover:bg-active focus-visible:ring-2 focus-visible:ring-primary min-w-0">
      <div className="flex gap3">
        {/* <div>
          {rebloggedBy && (
            <div className='pl8 flex gap-1 items-center text-gray:75 text-sm'>
              <div className="i-ri:repeat-fill mr-1"></div>
              <AccountInlineInfo account={rebloggedBy} />
              reblogged
            </div>
          )}
        </div> */}
        <div className='flex gap3 w-full'>
            <div className='relative  mt3'>
                <Link to={`/user/${cardStatus.account.acct}`} className="rounded-full">
                  <AccountAvator account={cardStatus.account} />
                </Link>
            </div>
            <div className="flex flex-col flex-1">
              <div className='flex items-center mt4'>
                  <StatusAccountDetails account={cardStatus.account} />
                 <div className='flex-auto' />
                 <div className='text-sm text-secondary flex flex-nowrap hover:underline'>
                    <CommonTooltip content='createAt'>
                      <a>
                        <time className="font-size-3 ws-nowrap hover:underline">
                          {timeAgo}
                        </time>
                      </a>
                    </CommonTooltip>
                 </div>
              </div>
              <StatusContent status={cardStatus}/>
              {action && <StatusActions status={cardStatus}></StatusActions>}
            </div>
        </div>
      </div>
    </div>
  )
}

