import { createRoot } from 'react-dom/client'
import {StrictMode, Suspense} from 'react';
import {
  BrowserRouter
} from "react-router-dom";
import App from './App'
import './index.css'
import 'virtual:uno.css'
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Loading } from './components/loading/Loading';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container!)
root.render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </Suspense>
    </ErrorBoundary>
  </StrictMode>,
)
