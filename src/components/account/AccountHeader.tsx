import type { Account } from 'masto'
import { Link } from 'react-router-dom'

interface Props {
  account: Account
}
export const AccountHeader: React.FC<Props> = ({account}) => {
  const date = new Date(account.createdAt)
  const createdAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date)


  return (
    <div className="flex flex-col">
      <div className="border-b">
        <img className="h-50 w-full object-cover" src={account.header}/>
      </div>
      <div className="p3 flex flex-col gap-6 -mt-12">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Link className="p1" to={`/user/${account.acct}`}>
              <img src={account.avatar}  className="w-20 h-20 rounded"/>
              <h4 className="font-bold">{ account.displayName }</h4>
              <p className="op50">@{ account.acct }</p>
            </Link>
          </div>
          <div className="flex gap-2">
              <button className="flex gap-1 items-center w-full rounded op75 hover:op100 hover:text-grey hover:b-purple">
                <div className="rounded p2 hover:bg-rose/10">
                  Follow
                </div>
              </button>
              <button className="flex gap-1 items-center w-full rounded op75 hover:op100 hover:text-grey hover:b-purple">
                <div className="rounded p2 hover:bg-rose/10">
                  <div className="i-ri:bell-line" />
                </div>
              </button>
              <button className="flex gap-1 items-center w-full rounded op75 hover:op100 hover:text-grey hover:b-purple">
                <div className="rounded p2 hover:bg-rose/10">
                  <div className="i-ri:more-2-fill" />
                </div>
              </button>
          </div>
        </div>
        <div>
          <div className="text-4 text-gray-3" dangerouslySetInnerHTML={{__html:account.note}} />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col rounded p3 bg-purple/10">
            <p className="text-gray text-3 uppercase">Joined</p>
            <p className="text-3 text-gray-3">{ createdAt }</p>
          </div>
          <div className="flex flex-col rounded p3 bg-purple/10">
          {
            account.fields?.map((field) => (
              <div key={field.name}>
                <p className="text-gray text-3 uppercase">{ field.name }</p>
                <p className="text-3 text-purple-3" dangerouslySetInnerHTML={{__html:field.value}} />
              </div>
            ))
          }
          </div>
        </div>
        
        <div className="flex gap-5">
          <Link to={`/user/${account.acct}`}>
            <span className="font-bold">{ account.statusesCount }</span> Posts
          </Link>
          <Link to={`/user/${account.acct}/following`}>
            <span className="font-bold">{ account.followingCount }</span> Following
          </Link>
          <Link to={`/user/${account.acct}/followers`}>
            <span className="font-bold">{ account.followersCount }</span> Followers
          </Link>
        </div>
      </div>
    </div>
  )
}
