import {Outlet} from 'react-router-dom';
import { NavTitle } from './components/nav/NavTitle';
import { NavSide } from './components/nav/NavSide';
import { NavFooter } from './components/nav/NavFooter';
import { PublishButton } from './components/publish/PublicButton';
import { SearchWidget } from './components/search/SearchWidgt';
import { UserSignInEntry } from './components/user/UserSignInEntry';

export const BaseLayout: React.FC = () => {
  return (
    <div className="h-full">
      <main className="w-full h-full flex mxa lg:max-w-80rem">
        <aside className='hidden sm:flex sm:w-1/8 md:w-1/6 justify-end lg:w-1/4'>
          <div className='sticky top-0 w-20 lg:w-100 h-screen flex flex-col'>
            <div className='mx3 mt4 mb2 self-start'>
              <NavTitle />
            </div>
            <div className="flex flex-col overflow-y-auto justify-between h-full">
              <div className="flex flex-col">
                <NavSide />
                <PublishButton />
              </div>
              <div className="flex flex-col">
                <UserSignInEntry />  
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full min-h-screen sm:w-600px sm:border-l sm:border-r border-base">
          <div className='sm:min-h-screen'>
            <Outlet />
          </div>
          <div className="sm:hidden sticky left-0 right-0 bottom-0 z-10 bg-base transition-padding-20">
            {/* <CommonOfflineChecker /> */}
            {/* <NavBottom /> */}
          </div>
        </div>


        <aside className="hidden sm:none lg:block w-1/4">
        <div className="sticky top-0 h-screen flex flex-col py3">
            <SearchWidget />
            <div className="flex-auto" />
            {/* <PwaPrompt /> */}
            <NavFooter />
        </div>
        </aside>
      </main>
    </div>
  )
}
