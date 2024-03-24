import { useLocalStorage } from '@reactuses/core'
import {LogOut} from 'lucide-react'
import { UserLogin } from '../../types'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '../../hooks/login'

export const UserLogout: React.FC = () => {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {currentUser} = useCurrentUser()
  const [isLogout, setIsLogout] = useState(false)


  useEffect(() => {
    if (isLogout && !accounts?.length && !currentId) {
      location.href = '/'
    }
  }, [accounts, currentId])

  const logout = (e: any) => {
    e.preventDefault()

    accounts && setAccounts([])
    currentId && setCurrentId('')
    setIsLogout(true)
  }
  return (<>
    <div onClick={logout} className='cursor-pointer flex gap1 text-center items-center font-bold py2 w-full'>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign out @{currentUser?.account?.acct}@{currentUser?.server}</span>
    </div>
  </>)
}
