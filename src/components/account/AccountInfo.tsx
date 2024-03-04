import { Link } from "react-router-dom"
import type { Account } from 'masto'

interface Props {
  children: React.ReactNode,
  account: Account
}

export const AccountInfo: React.FC<Props> = ({children, account}) => {
  console.log(account.acct, 'account.acct')
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="p1">
          <Link to={account.acct}>
            <img src={account.avatar} alt="profile" className="w-10 h-10 rounded-10 bg-gray:10"/>
          </Link>
        </div>
        <Link className="flex items-center" to={account.acct}>
          <span className="font-bold mr-1 text-sm">{account.displayName}</span>
          <span className="op35 text-sm">@{account.acct}</span>
        </Link>
      </div>
      <div className="flex justify-end items-center">
        {children}
      </div>
    </div>
  )
}
