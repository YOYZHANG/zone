import { useAppCookies } from "../../hooks/cookie"
import { useCurrentUser } from "../../hooks/login"
import { PublishWidget } from "../publish/PublishWidget"
import { AccountInfo } from "./AccountInfo"

export const AccountMe: React.FC = () => {
  const {currentUser} = useCurrentUser()
  const {serverURL} = useAppCookies()
  return (<>
    {currentUser && (
      <>
        <AccountInfo account={currentUser.account!} >123</AccountInfo>
        <PublishWidget draftKey="home" />
      </>
    )}
    {!currentUser && (
      <div className="flex flex-col gap-4 p4">
        <a href={`/api/login?server=${serverURL}`} className="px2 py1 bg-teal6 text-white m2 rounded">Login</a>
      </div>
    )}
  </>)
}
