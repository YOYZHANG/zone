import {Link} from 'react-router-dom';

export const NavTitle: React.FC = () => {
  return (
    <Link to="/" className="flex gap-2 text-2xl p5">
       <div className="i-logos-mastodon-icon"/>
       <div>
          Mastodon <sup className="text-sm op50 mt-1"> Zone</sup>
       </div>
    </Link>
  )
}
