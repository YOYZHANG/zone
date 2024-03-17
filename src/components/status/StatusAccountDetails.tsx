import { Account } from "masto"
import { Link } from "react-router-dom"
import { RichContent } from "../common/RichContent"
import { AccountHandle } from "../account/AccountHandle"

interface Props {
  account: Account
}
export const StatusAccountDetails: React.FC<Props> = ({account}) => {

  return (<div>
    <Link to={account.acct} className="flex flex-col min-w-0 md:flex-row md:gap2 md:items-center text-link-rounded">
      <div className="font-bold line-clamp-1 ws-pre-wrap break-all text-sm">
        <RichContent
          content={account?.displayName || account?.username || ''}
        />
      </div>
    
      <AccountHandle account={account} />
    </Link>
  </div>)
}
