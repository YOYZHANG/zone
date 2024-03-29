import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../drop-down/DropDown'
import { AccountInfo } from '../account/AccountInfo'
import { UserLogout } from './UserLogout'
import { useUserStore } from '../../store/user'

export const UserSwitcher: React.FC = () => {
  const {currentUser} = useUserStore()

  if (!currentUser) {
    return <></>
  }

  return (<div>
    <DropdownMenu>
      <DropdownMenuTrigger><div className='i-ri:more-2-line'></div></DropdownMenuTrigger>
      <DropdownMenuContent >
        <DropdownMenuItem className="sm:min-w-60 max-w-100vw py2 flex flex-col">
          <div className='flex gap4 items-center text-center w-full'>
            <AccountInfo account={currentUser.account!} > </AccountInfo>
            <div className='flex-auto' />
            <div className="i-ri:check-line text-xl text-primary"/>
          </div>
        </DropdownMenuItem>
        <div className="border-base border-t px2 hover:bg-active">
          <DropdownMenuItem>
            <UserLogout />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>)
}
