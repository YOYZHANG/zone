import {Notification} from 'masto'
import { AccountCard } from '../account/AccountCard'
import { StatusCard } from '../status/StatusCard'
interface Prop {
  notification: Notification
}

export const NotificationCard: React.FC<Prop> = ({notification}) => {
  const notificationType = notification.type
  return (
    <div className="flex flex-col">
      {notificationType === "follow" && (
        <div className="flex ml-4">
          <div className="i-ri:user-follow-fill mr-3 color-purple">{notification.account.displayName} followed you</div>
          <AccountCard status={notification.account} />
        </div>
      )}
      {notificationType === "follow_request" && (
        <div className="flex ml-4">
          <div className="i-ri:user-follow-fill mr-3 color-gray">{notification.account.displayName} request to follow you</div>
          <AccountCard status={notification.account} />
        </div>
      )}
      {notificationType === "favourite" && (
        <div className="flex ml-4">
          <div className="i-ri:heart-fill mr-3 color-red">{notification.account.displayName} favorited your post</div>
          <StatusCard status={notification.status!}/>
        </div>
      )}
      {notificationType === "reblog" && (
        <div className="flex ml-4">
          <div className="i-ri:repeat-fill mr-3 color-green">{notification.account.displayName} reblogged your post</div>
          <StatusCard status={notification.status!}/>
        </div>
      )}
      {(notificationType === "mention" || notificationType === "poll") && (
        <StatusCard status={notification.status!}/>
      )}
    </div>
  )
}
