import type { Account } from 'masto'
import { Link } from 'react-router-dom'

interface Props {
  account: Account
}

export const AccountInlineInfo: React.FC<Props> = ({account}) => {
  return (
    <Link to={`/user/${account.acct}`} className='flex gap-2 font-bold items-center'>
      <img src={account.avatar} className="w-5 h-5 rounded" />
      <span>{account.displayName}</span>
    </Link>
  )
}

