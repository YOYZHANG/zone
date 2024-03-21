import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";

export default function Favorites() {
  const {masto, mastoLogged} = useMastoStore()


  if (!mastoLogged)
    return (<></>)

  const paginator = masto?.favourites.iterate()

  return (
    <MainContent
      title={
        <Link to="/favorites" className="text-lg font-bold flex items-center gap2">
          <div className="mr-1 i-ri:heart-line h-6"></div>
          <span>Favourites</span>
        </Link>
      }
    >
      {paginator && <TimelinePaginator paginator={paginator} />}
    </MainContent>
  )
}
