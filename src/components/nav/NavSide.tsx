import { NavSideItem } from './NavSideItem';
import { useTranslation } from 'react-i18next'
export const NavSide: React.FC = () => {
  const { t } = useTranslation()

  return (
    <nav className="sm:px3 sm:py4 flex flex-col gap2 text-size-base leading-normal md:text-lg">
      <NavSideItem text={t('nav_side.home')} to="/home" isUserOnly={true} icon="i-ri:home-5-line" />
      <NavSideItem text={t('nav_side.notifications')} to="/notification" isUserOnly={true} icon="i-ri:notification-2-line" />
      <NavSideItem text={t('nav_side.local')} to="/local" icon="i-ri:group-2-line" isUserOnly={false}/>
      <NavSideItem text={t('nav_side.federated')} to="/public" icon="i-ri:earth-line" isUserOnly={false}/>
      <NavSideItem text={t('nav_side.favourites')} to="/favorites" isUserOnly={true} icon="i-ri:heart-3-line" />
      <NavSideItem text={t('nav_side.bookmarks')} to="/bookmarks" isUserOnly={true} icon="i-ri:bookmark-line" />
      {/* <NavSideItem text="Settings" to="/settings" icon="i-ri:settings-4-line" /> */}
    </nav>
  )
}
