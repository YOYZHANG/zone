import type { Status } from 'masto'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';
import { useState } from 'react';
import { useMastoStore } from '../../store/masto';
import { useCurrentUser } from '../../hooks/login';
import { ModalDialog } from '../modal/ModalDialog';
import { UserSignIn } from '../user/UserSignIn';

interface Props {
  status: Status
}
export const StatusActions: React.FC<Props> = ({status}) => {
  const [cardStatus, setCardStatus] = useState(status)
  const {currentUser} = useCurrentUser()
  const {masto} = useMastoStore()
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  async function toggleStatusAction(
    action: 'reblogged' | 'favourited' | 'bookmarked',
    newcardStatus: (cur: boolean) => Promise<Status>
  ) {
    if (!currentUser) {
      setShowModal(true)
      return
    }
    const currentAction = cardStatus[action]

    await newcardStatus(!!currentAction)
  }
  const toggleReblog = () => toggleStatusAction(
    'reblogged',
    (cur) => {
      const count = cur ? cardStatus.reblogsCount - 1 : cardStatus.reblogsCount + 1
      setCardStatus({...cardStatus, 'reblogsCount': count < 0 ? 0 : count, 'reblogged': !cur})
      return masto!.statuses[cur ? 'unreblog' : 'reblog'](status.id)
    },
  )
  const toggleFavourite = () => toggleStatusAction(
    'favourited',
    (cur) => {
      const count = cur ? cardStatus.favouritesCount - 1 : cardStatus.favouritesCount + 1
      setCardStatus({...cardStatus, 'favouritesCount': count < 0 ? 0 : count, 'favourited': !cur})
      return masto!.statuses[cur ? 'unfavourite' : 'favourite'](status.id)
    },
  )
  
  const toggleBookmark = () => toggleStatusAction(
    'bookmarked',
    (cur) => {
      setCardStatus({...cardStatus, 'bookmarked': !cur})
      return masto!.statuses[cur ? 'unbookmark' : 'bookmark'](status.id)
    },
  )

  const reply = (url: string) => {
    if (!currentUser) {
      setShowModal(true)
      return
    }

    navigate(url)
  }
  return (
    <>
      <div className="flex justify-between my-3 text-sm">
      <div
        className="rounded op75 hover:op100 hover:text-blue group flex-1 items-center"
        onClick={() => reply(`/user/@${cardStatus.account.acct}/${cardStatus.id}`)}
      >
        <div className="rounded-full  flex items-center">
          <div
            className="i-ri:chat-3-line"
          ></div>
          { !!cardStatus.repliesCount && (<span className="pl1 text-xs">{cardStatus.repliesCount}</span>) }
        </div>
      </div>
      <button 
        className={classNames("rounded op75 hover:op100 hover:text-green flex-1 items-center", {
          'text-green op100': cardStatus.reblogged,
          'pointer-events-none': false
        })}
        onClick={toggleReblog}
      >
        <div className="rounded-full flex items-center">
          <div
              className={classNames('', {
                'i-ri:repeat-2-line': !cardStatus.reblogged,
                'i-ri:repeat-2-fill': cardStatus.reblogged
              })}
            ></div>
          { !!cardStatus.reblogsCount && (<span className="pl2 text-xs">{cardStatus.reblogsCount}</span>) }
        </div>
      </button>

      <button
        className={classNames("rounded op75 hover:op100 hover:text-rose flex-1 items-center", {
          'text-rose op100': cardStatus.favourited,
          'pointer-events-none': false
        })}
        onClick={toggleFavourite}
      >
        <div className="rounded-full flex items-center">
          <div
            className={classNames('', {
              'i-ri:heart-3-line': !cardStatus.favourited,
              'i-ri:heart-3-fill': cardStatus.favourited
            })}
          ></div>
          { !!cardStatus.favouritesCount && (<span className="pl1 text-xs">{cardStatus.favouritesCount}</span>) }
        </div>
      </button>
      <button
        className={classNames("rounded op75 hover:op100 hover:text-yellow flex-none items-center flex", {
          'text-yellow op100': cardStatus.bookmarked,
          'pointer-events-none': false
        })}
        onClick={toggleBookmark}
      >
        <div className="rounded-full">
        <div
            className={classNames('', {
              'i-ri:bookmark-line': !cardStatus.bookmarked,
              'i-ri:bookmark-fill': cardStatus.bookmarked
            })}
          ></div>
        </div>
      </button>
    </div>
    <ModalDialog showModal={showModal} setShowModal={setShowModal}>
      <UserSignIn />
    </ModalDialog>
    </>
    
  )
}
