import { DefaultPaginationParams, Paginator, Status } from "masto";
import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import {masto} from "../utils/masto";
import { useEffect, useState } from "react";

export default function Explore() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()

  useEffect(() => {
    setPaginator(masto.trends.getStatuses())
  }, [])

  return (<>
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:hashtag"></div>
          <span>Explore</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      {paginator && <TimelinePaginator paginator={paginator} />}
    </MainContent>
  </>)
}
