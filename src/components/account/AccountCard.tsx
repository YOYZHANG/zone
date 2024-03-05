import { Account } from "masto"
import { AccountInfo } from "./AccountInfo"

interface Props {
  status: Account
}
export const AccountCard: React.FC<Props> = ({status}) => {
  return (
    <div className="p4 border-b">
      <AccountInfo account={status}>
        <div className="color-gray hover:color-purple hover:cursor-pointer i-ri:user-follow-fill"></div>
      </AccountInfo>
    </div>
  )
}
