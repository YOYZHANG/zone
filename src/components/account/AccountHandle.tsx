import { Account } from "masto"

interface Props {
  account: Account
}
export const AccountHandle: React.FC<Props> = ({account}) => {
  return (<>
    <p className="line-clamp-1 whitespace-pre-wrap break-all text-secondary-light text-sm">
      <span className="text-secondary">@{ account.acct }</span>
    </p>
  </>)
}
