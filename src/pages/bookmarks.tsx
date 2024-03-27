import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useEffect, useState } from "react";
import { DefaultPaginationParams, Paginator, Status } from "masto";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scroll-to-top";
import { useTranslation } from 'react-i18next'

export default function BookMarks() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()
  const {masto} = useMastoStore()
  const {t} = useTranslation()

  useEffect(() => {
    setPaginator(masto!.bookmarks.iterate())
  }, [masto])


  return (<>
    <MainContent
      title={
        <Link to="/bookmarks" className="text-lg font-bold flex items-center gap2" onClick={scrollToTop}>
          <div className=" i-ri:bookmark-line"></div>
          <span>{t('nav_side.bookmarks')}</span>
        </Link>
      }
    >
      {paginator && <TimelinePaginator paginator={paginator!} />}
    </MainContent>
  </>)
}
