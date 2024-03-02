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


function App() {
  // oauth
  useServerInfos(DEFAULT_SERVER)

  return (
    <RequireAuthRoute>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index path='/public' element={<Public />} />
          <Route index path='/home' element={<Home />} />
          <Route index path='/bookmarks' element={<BookMarks />} />
          <Route index path='/explore' element={<Explore />} />
          <Route index path='/login' element={<Login />} />
          <Route index path='/favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </RequireAuthRoute>
  )
}

export default App
