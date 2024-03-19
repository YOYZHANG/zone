import { useEffect, useState } from "react";
import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { DefaultPaginationParams,  Paginator, Status } from "masto";
import { useMastoStore } from "../store/masto";
import { scrollToTop } from "../utils/scroll-to-top";
import { Link } from "react-router-dom";
import { PublishWidget } from "../components/publish/PublishWidget";

export default function Home() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()
  const {masto} = useMastoStore()

  useEffect(() => {
    console.log('home get timeline update')
    setPaginator(masto?.timelines.iterateHome())
  }, [masto])

  return (<>
    <MainContent
      title={
        <Link to="/home" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:home-line"></div>
          <span>Home</span>
        </Link>
      }
    >
      <div className="border-b border-base">
        <PublishWidget draftKey="home"/>
      </div>
      {paginator && <TimelinePaginator paginator={paginator!} />}
    </MainContent>
  </>)
}
