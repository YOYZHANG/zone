import {Link} from 'react-router-dom';
export const NavSide: React.FC = () => {
  return (
    <div className="flex flex-col gap6 text-lg p8 border-y border">
      <Link className="flex gap2 items-center hover:opacity-80" to="/home" >
        <div className="i-ri:home-5-line"/>
        <span>Home</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/explore">
        <div className="i-ri:hashtag"/>
        <span>Explore</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/public">
        <div className="i-ri:earth-line"/>
        <span>Federated</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/favorites">
      <div className="i-ri:heart-3-line"/>
        <span>Favorites</span>
      </Link>
      <Link className="flex gap2 items-center hover:opacity-80" to="/bookmarks">
      <div className="i-ri:bookmark-line"/>
        <span>Bookmarks</span>
      </Link>
    </div>
  )
}
