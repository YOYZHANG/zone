import {Route, Routes} from 'react-router-dom';
import { RequireAuthRoute } from './components/RequireAuthRoute';
import { BaseLayout } from './layout';
import Public from './pages/public';
import 'virtual:uno.css'
import './App.css'
import { useServerInfos } from './hooks/serverInfo';
import { DEFAULT_SERVER } from './constants';
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

function App() {
  // oauth
  useServerInfos(DEFAULT_SERVER)

  return (
    <RequireAuthRoute>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index path='/public' element={<Public />} />
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
        </Route>
      </Routes>
    </RequireAuthRoute>
  )
}

export default App
