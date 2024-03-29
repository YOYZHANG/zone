import {Link, Outlet} from 'react-router-dom';
import { NavTitle } from './components/nav/NavTitle';
import { NavSide } from './components/nav/NavSide';
import { NavFooter } from './components/nav/NavFooter';
import { SearchWidget } from './components/search/SearchWidgt';
import { UserSignInEntry } from './components/user/UserSignInEntry';
import { AccountInfo } from './components/account/AccountInfo';
import { useCurrentUser } from './hooks/login';
// import { PublishWidgetEntry } from './components/publish/PublishWidgtEntry';

import { UserSwitcher } from './components/user/UserSwitcher';

export const BaseLayout: React.FC = () => {
  const {currentUser} = useCurrentUser()
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
                {/* <PublishWidgetEntry /> */}
              </div>
              <div className="flex flex-col">
                { !currentUser && <UserSignInEntry />}
                {currentUser && (
                  <div>
                    <div className="p6 pb8 w-full flex items-center justify-between">
                      <Link
                        className="hidden lg:block rounded-full text-start w-full hover:bg-active cursor-pointer transition-100"
                        to={`/user/${currentUser.account!.acct}`}
                      >
                        <AccountInfo account={currentUser.account!} > </AccountInfo>
                      </Link>
                      <UserSwitcher />
                    </div>
                  </div>
                )}
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
