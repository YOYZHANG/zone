import { useEffect, useState } from "react";
import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import {masto} from "../utils/masto";
import { DefaultPaginationParams, Paginator, Status } from "masto";

export default function Home() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()

  useEffect(() => {
    setPaginator(masto.timelines.getHomeIterable())
  }, [])

  return (<>
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:home-fill"></div>
          <span>Home</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      <TimelinePaginator paginator={paginator!} />
    </MainContent>
  </>)
}
