import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export default function Favorites() {
  const {masto, mastoLogged} = useMastoStore()
  const {t} = useTranslation()


  if (!mastoLogged)
    return (<></>)

  const paginator = masto?.favourites.iterate()

  return (
    <MainContent
      title={
        <Link to="/favorites" className="text-lg font-bold flex items-center gap2">
          <div className="mr-1 i-ri:heart-line h-6"></div>
          <span>{t('nav_side.favoriates')}</span>
        </Link>
      }
    >
      {paginator && <TimelinePaginator paginator={paginator} />}
    </MainContent>
  )
}
