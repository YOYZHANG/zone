import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { DefaultPaginationParams, Paginator, Status } from "masto";
import { useEffect, useState } from "react";
import { useMastoStore } from "../store/masto";

export default function Public() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()
  const {masto} = useMastoStore()

  useEffect(() => {
    setPaginator(masto?.timelines.getPublicIterable())
  }, [masto])

  return (<>
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:earth-line"></div>
          <span>Federated Timeline</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
    {paginator && <TimelinePaginator paginator={paginator} />}
    {!paginator && <div>waiting...</div>}
    </MainContent>
  </>)
}
