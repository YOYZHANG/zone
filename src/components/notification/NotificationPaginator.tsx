import { CommonPaginator } from "../common/CommonPaginator"
import {Paginator} from 'masto'

interface Props {
  paginator: Paginator<any, any[]>,
  NotificationCard: React.FC<any>
}

export const NotificationPaginator: React.FC<Props>= ({paginator, NotificationCard}) => {
  return (
    <CommonPaginator
      paginator={paginator}
      Card={NotificationCard}
    />
  )
}
