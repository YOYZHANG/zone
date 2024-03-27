import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";
import { useTranslation } from 'react-i18next'

export default function Public() {
  const {masto, mastoLogged} = useMastoStore()
  const { t } = useTranslation()

  if (!mastoLogged)
    return (<></>)

  const paginator = masto!.timelines.iteratePublic()

  return (<>
    <MainContent
      title={
        <Link to="/public" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:earth-line"></div>
          <span>{t('title.federated_timeline')}</span>
        </Link>
      }
    >
    {paginator && <TimelinePaginator paginator={paginator} />}
    </MainContent>
  </>)
}
