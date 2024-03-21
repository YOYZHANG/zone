import {Route, Routes} from 'react-router-dom';
import { BaseLayout } from './layout';
import Public from './pages/public';
import 'virtual:uno.css'
import './App.css'
import './styles/var.css'
import Home from './pages/home';
import BookMarks from './pages/bookmarks';
import Explore from './pages/explore';
import Favorites from './pages/favorites';
import User from './pages/@user';
import Following from './pages/@user/following';
import Follower from './pages/@user/followers';
import Post from './pages/@user/post';
import Notification from './pages/notification'
import CallBack from './pages/login/callback';
import { useMastoStore } from './store/masto';
import { useEffect } from 'react';
import { useCurrentUser } from './hooks/login';

function App() {
  const {createMasto, mastoLogged, mastoError} = useMastoStore()
  const {currentUser} = useCurrentUser()

  useEffect(() => {
    (async () => {
        await createMasto(currentUser?.server, currentUser?.token);
    })();
  }, [currentUser?.server, currentUser?.token]);

  if (mastoError) {
    return (<>
      <div className='flex flex-col items-center text-center p5'>
        <span className="op50">Oop! Mastodon server Error</span>
      </div>
    </>);
  }

  {!mastoLogged && (
    <div className='flex flex-col items-center text-center p5 animate-pulse'>
      <div className="op50 i-ri:loader-2-fill animate-spin text-2xl"></div>
      <span className="op50">Maston Server Loading...</span>
    </div>
  )}

  return (
    <Routes>
      <Route path='/' element={<BaseLayout/>}>
        {mastoLogged && (<>
          <Route path='/' element={currentUser ? <Home /> : <Public />} />
          <Route path='/public' element={<Public />} />
          <Route path='/home' element={<Home />} />
          <Route path='/bookmarks' element={<BookMarks />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/:user' element={<User />} />
          <Route path='/:user/following' element={<Following />} />
          <Route path='/:user/followers' element={<Follower />} />
          <Route path='/:user/:post' element={<Post />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/login/callback' element={<CallBack />} />
        </>)}
      </Route>
    </Routes>
  )
}

export default App
