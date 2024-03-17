import { useEffect, useState } from "react";
import { CommonTabs } from "../components/common/CommonTabs"
import { MainContent } from "../components/main/MainContent"
import { useLocalStorage } from "@reactuses/core";
import { Paginator } from "masto";
import { NotificationPaginator } from "../components/notification/NotificationPaginator";
import { NotificationCard } from "../components/notification/NotificationCard";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";

export default function Notification() {
  const tabNames = ['All', 'Mentions']
  const [tab, setTab] = useLocalStorage('zone-notifications-tab', 'All')
  const [paginator, setPaginator] = useState<Paginator<any, any[]>>()
  const {masto} = useMastoStore()

  useEffect(() => {
    if (!tab)
        return

    const paginator = masto?.notifications.iterate()
    setPaginator(paginator)
  }, [tab, masto])

  return (
    <MainContent
      title={
        <Link to="/notification" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:notification-2-fill"></div>
          <span>Notifications</span>
        </Link>
      }
    >
      <CommonTabs tab={tab!} setTab={setTab} options={tabNames} />
      {paginator && <NotificationPaginator paginator={paginator} NotificationCard={NotificationCard}/>}
    </MainContent>
  )

}
