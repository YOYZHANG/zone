import type { Status } from 'masto'
import { Link } from 'react-router-dom'
import classNames from 'classnames';

interface Props {
  status: Status
}
export const StatusActions: React.FC<Props> = ({status}) => {
  const toggleReblog = () => {}
  const toggleFavourite = () => {}
  const toggleBookmark = () => {}
  return (
    <div className="flex gap-8">
      <Link
        className="rounded op75 hover:op100 hover:text-blue"
        to="/@${status.account.acct}/${status.id}"
      >
        <div className="rounded-full hover:bg-blue/10">
          <div
            className={classNames('', {
              'i-ri:chat-3-line': !status.favourited,
              'i-ri:chat-3-fill': status.favourited
            })}
          ></div>
          { status.repliesCount && (<span>status.repliesCount</span>) }
        </div>
      </Link>
      <button 
        className={classNames("rounded op75 hover:op100 hover:text-green", {
          'text-green op100': status.reblogged,
          'pointer-events-none': false
        })}
        onClick={toggleReblog}
      >
        <div className="rounded-full hover:bg-green/10">
        <div
            className={classNames('', {
              'i-ri:repeat-2-line': !status.reblogged,
              'i-ri:repeat-2-fill': status.reblogged
            })}
          ></div>
          { status.reblogsCount && (<span>status.reblogsCount</span>) }
        </div>
      </button>

      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose", {
          'text-rose op100': status.favourited,
          'pointer-events-none': false
        })}
        onClick={toggleFavourite}
      >
        <div className="rounded-full hover:bg-rose/10">
          <div
            className={classNames('', {
              'i-ri:heart-3-line': !status.favourited,
              'i-ri:heart-3-fill': status.favourited
            })}
          ></div>
          { status.favouritesCount && (<span>status.favouritesCount</span>) }
        </div>
      </button>
      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose", {
          'text-rose op100': status.bookmarked,
          'pointer-events-none': false
        })}
        onClick={toggleBookmark}
      >
        <div className="rounded-full hover:bg-rose/10">
        <div
            className={classNames('', {
              'i-ri:bookmark-line': !status.bookmarked,
              'i-ri:bookmark-fill': status.bookmarked
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
