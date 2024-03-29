import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { scrollToTop } from "../utils/scroll-to-top";
import { Link, useNavigate } from "react-router-dom";
import { PublishWidget } from "../components/publish/PublishWidget";
import { Loading } from "../components/loading/Loading";
import { useTranslation } from 'react-i18next'

export default function Home() {
  const {masto, mastoLoggin, mastoLogged} = useMastoStore()
  const {t} = useTranslation()
  const navigate = useNavigate();

  if (!mastoLogged) {
    return <></>
  }

  if (!mastoLoggin) {
    return <Loading />
  }
  const paginator = masto!.timelines.iterateHome()

  const handlePublish = async () => {
    navigate('/')
  }

  return (<>
    <MainContent
      title={
        <Link to="/home" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:home-line"></div>
          <span>{t('nav_side.home')}</span>
        </Link>
      }
    >
      <div className="border-b border-base">
        <PublishWidget draftKey="home" handlePublishFn={handlePublish}/>
      </div>
      <TimelinePaginator paginator={paginator} />
    </MainContent>
  </>)
}
