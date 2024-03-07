import { Account } from "masto"
import { AccountInfo } from "./AccountInfo"

interface Props {
  item: Account
}
export const AccountCard: React.FC<Props> = ({item}) => {
  return (
    <div className="p4 border-b">
      <AccountInfo account={item}>
        <div className="color-gray hover:color-purple hover:cursor-pointer i-ri:user-follow-fill"></div>
      </AccountInfo>
    </div>
  )
}
