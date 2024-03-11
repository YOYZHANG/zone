import { NavSideItem } from './NavSideItem';
export const NavSide: React.FC = () => {
  return (
    <nav className="sm:px3 sm:py4 flex flex-col gap2 text-size-base leading-normal md:text-lg">
      <NavSideItem text="Home" to="/home" icon="i-ri:home-5-line" />
      <NavSideItem text="Notification" to="/notification" icon="i-ri:notification-2-line" />
      <NavSideItem text="Explore" to="/explore" icon="i-ri:hashtag" />
      <NavSideItem text="Federated" to="/public" icon="i-ri:earth-line" />
      <NavSideItem text="Favorites" to="/favorites" icon="i-ri:heart-3-line" />
      <NavSideItem text="Bookmarks" to="/bookmarks" icon="i-ri:bookmark-line" />
      <NavSideItem text="Settings" to="/settings" icon="i-ri:settings-4-line" />
    </nav>
  )
}
