import classNames from "classnames"
import { Account } from "masto"
import { useState } from "react"

interface Props {
  account: Account
}
export const AccountAvator: React.FC<Props> = ({account}) => {
  const [loaded, setLoaded] = useState(true)
  const [error, setError] = useState(false)
  return (<div className="account-avatar-normal mt3 rounded-full">
    <img
      className={classNames("rounded-full", {
        'bg-base': loaded,
        'bg-gray:10': !loaded
      })}
      key={account.avatar}
      src={error ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : account.avatar}
      alt={account.username}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
    />
  </div>)
}
