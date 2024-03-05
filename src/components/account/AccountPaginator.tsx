import { Paginator } from "masto"
import { CommonPaginator } from "../common/CommonPaginator"

interface Props {
  paginator: Paginator<any, any[]>,
  AccountCard: React.FC<any>
}
export const AccountPaginator: React.FC<Props> = ({paginator, AccountCard}) => {
  return (
    <CommonPaginator
      paginator={paginator}
      Card={AccountCard}
    >
    </CommonPaginator>
  )
}
