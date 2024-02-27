import {Route, Routes} from 'react-router-dom';
import { RequireAuthRoute } from './components/RequireAuthRoute';
import { BaseLayout } from './layout';
import Public from './pages/public';

function App() {
  // oauth

  return (
    <RequireAuthRoute>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index path='/public' element={<Public />} />
        </Route>
      </Routes>
    </RequireAuthRoute>
  )
}

export default App
