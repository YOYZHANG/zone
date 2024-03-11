import {Notification} from 'masto'
import { AccountCard } from '../account/AccountCard'
import { StatusCard } from '../status/StatusCard'
interface Prop {
  item: Notification
}

export const NotificationCard: React.FC<Prop> = ({item}) => {
  const notificationType = item.type
  return (
    <div className="flex flex-col">
      {notificationType === "follow" && (
        <div>
          <div className="flex ml-4 mt-2 items-center">
            <div className="i-ri:user-follow-fill mr-3 color-purple"></div>
            <div className="">{item.account.displayName} <span>followed you</span></div>
          </div>
          <AccountCard item={item.account} />
        </div>
      )}
      {notificationType === "follow_request" && (
        <>
          <div className="flex ml-4 mt-2 items-center">
            <div className="i-ri:user-follow-fill mr-3 color-gray"></div>
            <div className="">{item.account.displayName} <span>request to follow you</span></div>
          </div>
          <AccountCard item={item.account} />
        </>
      )}
      {notificationType === "favourite" && (
        <>
          <div className="flex ml-4 mt-2 items-center">
            <div className="i-ri:heart-fill mr-3 color-red"></div>
            <div className="">{item.account.displayName} <span>favorited your post</span></div>
          </div>
          <StatusCard item={item.status!}/>
        </>
      )}
      {notificationType === "reblog" && (
        <>
          <div className="flex ml-4 mt-2 items-center">
            <div className="i-ri:repeat-fill mr-3 color-green"></div>
            <div className="">{item.account.displayName} <span>reblogged your post</span></div>
          </div>
          <StatusCard item={item.status!}/>
        </>
      )}
      {(notificationType === "mention" || notificationType === "poll") && (
        <StatusCard item={item.status!}/>
      )}
    </div>
  )
}
