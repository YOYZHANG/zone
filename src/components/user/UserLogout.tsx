import { useLocalStorage } from '@reactuses/core'
import {LogOut} from 'lucide-react'
import { UserLogin } from '../../types'
import { useCurrentUser } from '../../hooks/login'
import { useTranslation } from 'react-i18next'
import { useMastoStore } from '../../store/masto'
import { useNavigate} from 'react-router-dom'


export const UserLogout: React.FC = () => {
  const [accounts, setAccounts] = useLocalStorage<UserLogin[]>('zone-accounts', [])
  const [currentId, setCurrentId] = useLocalStorage<string>('zone-current', '')
  const {currentUser} = useCurrentUser()
  const {setMastoLogin} = useMastoStore()
  const { t } = useTranslation()
  const navigate = useNavigate()
  


  const logout = (e: any) => {
    e.preventDefault()

    accounts && setAccounts([])
    currentId && setCurrentId('')
    setMastoLogin(false)
    navigate('/')
  }
  return (<>
    <div onClick={logout} className='cursor-pointer flex gap1 text-center items-center font-bold py2 w-full'>
      <LogOut className="mr-2 h-4 w-4" />
      <span>{t('user.sign_out_account', {name: `@${currentUser?.account?.acct}`})}</span>
    </div>
  </>)
}
