import {Outlet} from 'react-router-dom';
import { AccountMe } from './components/account/AccuntMe';
import { NavTitle } from './components/nav/NavTitle';
import { NavSide } from './components/nav/NavSide';
import { NavFooter } from './components/nav/NavFooter';

export const BaseLayout: React.FC = () => {
  return (
    <div className="h-full">
      <main className="w-full h-full flex mxa lg:max-w-80rem">
        <div className="w-1/4 lg:flex flex-col items-end">
          <AccountMe />
        </div>
        <div className="lg:w-3/4 flex">
          <div className="h-full w-full md:w-2/3 border-l border-r border">
            <Outlet />
          </div>
          <div className="md:flex md:flex-col w-1/3">
            <div className="fixed">
              <NavTitle/>
              <NavSide />
              <NavFooter />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
