import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { scrollToTop } from "../utils/scroll-to-top";
import { Link } from "react-router-dom";
import { PublishWidget } from "../components/publish/PublishWidget";
import { Loading } from "../components/loading/Loading";

export default function Home() {
  const {masto, mastoLoggin} = useMastoStore()
  const paginator = masto!.timelines.iterateHome()

  if (!mastoLoggin) {
    return <Loading />
  }

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
      <TimelinePaginator paginator={paginator} />
    </MainContent>
  </>)
}
