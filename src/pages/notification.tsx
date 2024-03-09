import { useEffect, useState } from "react";
import { CommonTabs } from "../components/common/CommonTabs"
import { MainContent } from "../components/main/MainContent"
import { useLocalStorage } from "@reactuses/core";
import { Paginator } from "masto";
import { NotificationPaginator } from "../components/notification/NotificationPaginator";
import { NotificationCard } from "../components/notification/NotificationCard";
import { useMastoStore } from "../store/masto";

export default function Notification() {
  const tabNames = ['All', 'Mentions']
  const [tab, setTab] = useLocalStorage('zone-notifications-tab', 'All')
  const [paginator, setPaginator] = useState<Paginator<any, any[]>>()
  const {masto} = useMastoStore()

  useEffect(() => {
    if (!tab)
        return

    const paginator = masto?.notifications.getIterator(tab === 'All' ? undefined : { types: ['mention'] })
    setPaginator(paginator)
  }, [tab])

  return (
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:notification-2-fill"></div>
          <span>Notifications</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      <CommonTabs tab={tab!} setTab={setTab} options={tabNames} />
      {paginator && <NotificationPaginator paginator={paginator} NotificationCard={NotificationCard}/>}
    </MainContent>
  )

}
