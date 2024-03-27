import {Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next'

export const NavTitle: React.FC = () => {
  const {t} = useTranslation()
  return (
    <Link to="/" className="flex text-2xl px3 py2 hover:bg-active rounded-full focus-visible:ring-2 focus-visible:ring-current">
       <div className="i-logos-dat mr-2"/>
       <div className="hidden lg:block">
        {t('app_name')} <sup className="text-sm italic text-secondary mt-1"> beta </sup>
       </div>
    </Link>
  )
}
