import {Route, Routes} from 'react-router-dom';
import { BaseLayout } from './layout';
import Public from './pages/public';
import 'virtual:uno.css'
import './App.css'
import Home from './pages/home';
import BookMarks from './pages/bookmarks';
import Explore from './pages/explore';
import Login from './pages/login';
import Favorites from './pages/favorites';
import User from './pages/@user';
import Following from './pages/@user/following';
import Follower from './pages/@user/followers';
import Post from './pages/@user/post';
import Notification from './pages/notification'
import CallBack from './pages/login/callback';
import { useMastoStore } from './store/masto';
import { useEffect } from 'react';
import { useAppCookies } from './hooks/cookie';

function App() {
  const {createMasto} = useMastoStore()
  const {token, serverURL} = useAppCookies();

  useEffect(() => {
    (async () => {
        await createMasto(serverURL, token);
    })();
  }, [createMasto, serverURL, token]);


  return (
    <Routes>
      <Route path='/' element={<BaseLayout/>}>
        <Route path='/' element={token ? <Home /> : <Public />} />
        <Route path='/public' element={<Public />} />
        <Route path='/home' element={<Home />} />
        <Route path='/bookmarks' element={<BookMarks />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<Login />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/:user' element={<User />} />
        <Route path='/:user/following' element={<Following />} />
        <Route path='/:user/followers' element={<Follower />} />
        <Route path='/:user/:post' element={<Post />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/login/callback' element={<CallBack />} />
      </Route>
    </Routes>
  )
}

export default App
