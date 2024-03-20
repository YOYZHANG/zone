import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { DefaultPaginationParams, Paginator, Status } from "masto";
import { useState } from "react";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";

export default function Public() {
  const {masto} = useMastoStore()
  const [paginator] = useState<Paginator<DefaultPaginationParams, Status[]>>(masto!.timelines.iteratePublic())

  return (<>
    <MainContent
      title={
        <Link to="/public" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:earth-line"></div>
          <span>Federated Timeline</span>
        </Link>
      }
    >
     <TimelinePaginator paginator={paginator} />
    </MainContent>
  </>)
}
