import {Route, Routes} from 'react-router-dom';
import { RequireAuthRoute } from './components/RequireAuthRoute';
import { BaseLayout } from './layout';
import Public from './pages/public';
import 'virtual:uno.css'
import './App.css'
import { useServerInfos } from './hooks/serverInfo';
import { DEFAULT_SERVER } from './constants';


function App() {
  // oauth
  useServerInfos(DEFAULT_SERVER)

  return (
    <RequireAuthRoute>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index path='/' element={<Public />} />
        </Route>
      </Routes>
    </RequireAuthRoute>
  )
}

export default App
