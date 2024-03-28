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
import { Loading } from './components/loading/Loading';
import './i18n/config';

function App() {
  const {createMasto, mastoLogged, mastoError, setMastoLogin, mastoLoggin} = useMastoStore()
  const {currentUser} = useCurrentUser()

  useEffect(() => {
    (async () => {
        await createMasto(currentUser?.server, currentUser?.token);
        if (currentUser?.token) {
          setMastoLogin(true);
        }
    })();
  }, [currentUser?.server, currentUser?.token]);


  return (
    <Routes>
      <Route path='/' element={<BaseLayout/>}>
        {mastoLogged && (<>
          <Route path='/' element={currentUser ? <Home /> : <Public />} />
          <Route path='/public' element={<Public />} />
          <Route path='/login/callback' element={<CallBack />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/user/:user' element={<User />} />
          <Route path='/user/:user/following' element={<Following />} />
          <Route path='/user/:user/followers' element={<Follower />} />
          <Route path='/user/:user/:post' element={<Post />} />
          {mastoLoggin && (<>
            <Route path='/home' element={<Home />} />
            <Route path='/bookmarks' element={<BookMarks />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/notification' element={<Notification />} />
          </>)}
          
        </>)}
        {
          !mastoLogged && (<>
            <Route path='/' element={<Loading />} />
          </>)
        }
        {
          mastoError && (<>
            <Route path='/' element={(
              <div className='flex flex-col items-center text-center p5'>
                <span className="op50">Oop! Mastodon server Error</span>
              </div>
            )} />
          </>)
        }
      </Route>
    </Routes>
  )
}

export default App
