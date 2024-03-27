import { CommonTabs } from "../components/common/CommonTabs"
import { MainContent } from "../components/main/MainContent"
import { useLocalStorage } from "@reactuses/core";
import { NotificationPaginator } from "../components/notification/NotificationPaginator";
import { NotificationCard } from "../components/notification/NotificationCard";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";
import { useTranslation } from 'react-i18next'

export default function Notification() {
  const {masto, mastoLogged} = useMastoStore()
  const {t} = useTranslation()

  const tabNames = ['All', 'Mentions']
  const [tab, setTab] = useLocalStorage('zone-notifications-tab', 'All')

  if (!mastoLogged) {
    return <></>
  }

  const paginator = masto?.notifications.iterate()

  return (
    <MainContent
      title={
        <Link to="/notification" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:notification-2-fill"></div>
          <span>{t('nav_side.notification')}</span>
        </Link>
      }
    >
      <CommonTabs tab={tab!} setTab={setTab} options={tabNames} />
      {paginator && <NotificationPaginator paginator={paginator} NotificationCard={NotificationCard}/>}
    </MainContent>
  )

}
