import {Link} from 'react-router-dom';
import { useLoginState } from '../../hooks/cookie';
import classNames from 'classnames';

export const NavSide: React.FC = () => {
  const {isLogin} = useLoginState();
  return (
    <div className="flex flex-col gap6 text-lg p8">
      <Link
        className={classNames("flex gap2 items-center hover:opacity-80", {
          'op-50': !isLogin,
          'pointer-events-none': !isLogin
        })}
        to="/home"
      >
        <div className="i-ri:home-5-line"/>
        <span>Home</span>
      </Link>
      <Link
        className={classNames("flex gap2 items-center hover:opacity-80", {
          'op-50': !isLogin,
          'pointer-events-none': !isLogin
        })}
        to="/notification"
      >
        <div className="i-ri:notification-2-line"/>
        <span>Notification</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/explore">
        <div className="i-ri:hashtag"/>
        <span>Explore</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/public">
        <div className="i-ri:earth-line"/>
        <span>Federated</span>
      </Link>
      <Link
        className={classNames("flex gap2 items-center hover:opacity-80", {
          'op-50': !isLogin,
          'pointer-events-none': !isLogin
        })}
        to="/favorites"
      >
        <div className="i-ri:heart-3-line"/>
        <span>Favorites</span>
      </Link>
      <Link
        className={classNames("flex gap2 items-center hover:opacity-80", {
          'op-50': !isLogin,
          'pointer-events-none': !isLogin
        })}
        to="/bookmarks"
      >
        <div className="i-ri:bookmark-line"/>
        <span>Bookmarks</span>
      </Link>
    </div>
  )
}
