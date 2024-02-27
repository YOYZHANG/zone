
import { CommonPaginator } from '../common/CommonPaginator'
import { StatusCard } from '../status/StatusCard'
import type { Paginator, Status } from 'masto'

interface Props {
  paginator: Paginator<any, Status[]>
}
export const TimelinePaginator: React.FC<Props> = ({paginator}) => {
  return (
    <CommonPaginator
      paginator={paginator}
      Card={StatusCard} 
    >
    </CommonPaginator>
  )
}
