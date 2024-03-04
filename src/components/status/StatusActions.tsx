import type { Status } from 'masto'
import { Link } from 'react-router-dom'
import classNames from 'classnames';
import { masto } from '../../utils/masto';
import { useState } from 'react';

interface Props {
  status: Status
}
export const StatusActions: React.FC<Props> = ({status}) => {
  const [cardStatus, setCardStatus] = useState(status);
  async function toggleStatusAction(action: 'reblogged' | 'favourited' | 'bookmarked', newcardStatus: Promise<Status>) {
    setCardStatus({...cardStatus, ...(await newcardStatus)})
  }
  const toggleReblog = () => toggleStatusAction(
    'reblogged',
    masto.statuses[cardStatus.reblog ? 'unreblog' : 'reblog'](status.id),
  )
  const toggleFavourite = () => toggleStatusAction(
    'favourited',
    masto.statuses[cardStatus.favourited ? 'unfavourite' : 'favourite'](status.id),
  )
  
  const toggleBookmark = () => toggleStatusAction(
    'bookmarked',
    masto.statuses[cardStatus.bookmarked ? 'unbookmark' : 'bookmark'](status.id),
  )
  return (
    <div className="flex gap-8 pl12">
      <Link
        className="rounded op75 hover:op100 hover:text-blue group"
        to={`/@${cardStatus.account.acct}/${cardStatus.id}`}
      >
        <div className="rounded-full hover:bg-blue/10">
          <div
            className="i-ri:chat-3-line"
          ></div>
          { !!cardStatus.repliesCount && (<span className="pl1 text-sm">{cardStatus.repliesCount}</span>) }
        </div>
      </Link>
      <button 
        className={classNames("rounded op75 hover:op100 hover:text-green", {
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
          { cardStatus.reblogsCount && (<span className="pl2 text-sm">{cardStatus.reblogsCount}</span>) }
        </div>
      </button>

      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose", {
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
          { cardStatus.favouritesCount && (<span className="pl1 text-sm">{cardStatus.favouritesCount}</span>) }
        </div>
      </button>
      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose", {
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
      <button className="rounded op75 hover:op100 hover:text-purple">
        <div className="rounded-full hover:bg-purple/10">
          <div className="i-ri:share-circle-line"></div>
        </div>
      </button>
    </div>
  )
}
