import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";

export default function Explore() {
  const {masto, mastoLogged} = useMastoStore()

  if (!mastoLogged)
    return (<></>)

  const paginator = masto?.trends.iterateStatuses()

  return (<>
    <MainContent
      title={
        <Link to="/explore" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:hashtag"></div>
          <span>Explore</span>
        </Link>
      }
    >
      {paginator && <TimelinePaginator paginator={paginator} />}
    </MainContent>
  </>)
}
