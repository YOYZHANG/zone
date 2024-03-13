import type { Status } from 'masto'
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import { useState } from 'react';
import { useMastoStore } from '../../store/masto';

interface Props {
  status: Status
}
export const StatusActions: React.FC<Props> = ({status}) => {
  const [cardStatus, setCardStatus] = useState(status);
  const {masto} = useMastoStore()
  async function toggleStatusAction(action: 'reblogged' | 'favourited' | 'bookmarked', newcardStatus: Promise<Status>) {
    console.log(action, 'action')
    setCardStatus({...cardStatus, ...(await newcardStatus)})
  }
  const toggleReblog = () => toggleStatusAction(
    'reblogged',
    masto!.statuses[cardStatus.reblog ? 'unreblog' : 'reblog'](status.id),
  )
  const toggleFavourite = () => toggleStatusAction(
    'favourited',
    masto!.statuses[cardStatus.favourited ? 'unfavourite' : 'favourite'](status.id),
  )
  
  const toggleBookmark = () => toggleStatusAction(
    'bookmarked',
    masto!.statuses[cardStatus.bookmarked ? 'unbookmark' : 'bookmark'](status.id),
  )
  return (
    <div className="flex justify-between my-3 text-sm">
      <Link
        className="rounded op75 hover:op100 hover:text-blue group flex-1 items-center"
        to={`/@${cardStatus.account.acct}/${cardStatus.id}`}
      >
        <div className="rounded-full hover:bg-blue/10 ">
          <div
            className="i-ri:chat-3-line"
          ></div>
          { !!cardStatus.repliesCount && (<span className="pl1 text-sm">{cardStatus.repliesCount}</span>) }
        </div>
      </Link>
      <button 
        className={classNames("rounded op75 hover:op100 hover:text-green flex-1 items-center", {
          'text-green op100': cardStatus.reblogged,
          'pointer-events-none': false
        })}
        onClick={toggleReblog}
      >
        <div className="rounded-full hover:bg-green/10">
        <div
            className={classNames('', {
              'i-ri:repeat-2-line': !cardStatus.reblogged,
              'i-ri:repeat-2-fill': cardStatus.reblogged
            })}
          ></div>
          { !!cardStatus.reblogsCount && (<span className="pl2 text-sm">{cardStatus.reblogsCount}</span>) }
        </div>
      </button>

      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose flex-1 items-center", {
          'text-rose op100': cardStatus.favourited,
          'pointer-events-none': false
        })}
        onClick={toggleFavourite}
      >
        <div className="rounded-full hover:bg-rose/10">
          <div
            className={classNames('', {
              'i-ri:heart-3-line': !cardStatus.favourited,
              'i-ri:heart-3-fill': cardStatus.favourited
            })}
          ></div>
          { !!cardStatus.favouritesCount && (<span className="pl1 text-sm">{cardStatus.favouritesCount}</span>) }
        </div>
      </button>
      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose flex-none items-center", {
          'text-rose op100': cardStatus.bookmarked,
          'pointer-events-none': false
        })}
        onClick={toggleBookmark}
      >
        <div className="rounded-full hover:bg-rose/10">
        <div
            className={classNames('', {
              'i-ri:bookmark-line': !cardStatus.bookmarked,
              'i-ri:bookmark-fill': cardStatus.bookmarked
            })}
          ></div>
        </div>
      </button>
    </div>
  )
}
