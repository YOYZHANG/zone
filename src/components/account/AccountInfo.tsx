import type { Account } from 'masto'
import { AccountAvator } from "./AccountAvator"
import { AccountHandle } from "./AccountHandle"
import { RichContent } from "../common/RichContent"

interface Props {
  children: React.ReactNode,
  account: Account
}

export const AccountInfo: React.FC<Props> = ({account}) => {
  return (
    <div className="flex gap-3 items-center">
        <AccountAvator account={account}/>
        <div className="flex flex-col shrink overflow-hidden justify-center leading-none">
          <div className="flex gap2 font-bold line-clamp-1 ws-pre-wrap break-all text-sm">
              <RichContent content={account.acct}/>
          </div>
          <div className="">
            <AccountHandle account={account} />
          </div>
        </div>
    </div>
  )
}
