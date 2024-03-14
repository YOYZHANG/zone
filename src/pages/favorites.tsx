import { useEffect, useState } from "react";
import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { DefaultPaginationParams, Paginator, Status } from "masto";
import { useMastoStore } from "../store/masto";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()
  const {masto} = useMastoStore()
  useEffect(() => {
    const favoraites = masto?.favourites.getIterator()
    // @ts-ignore
    setPaginator(favoraites)
  }, [masto])

  return (
    <MainContent
      title={
        <Link to="/favorites" className="text-lg font-bold flex items-center gap2">
          <div className="mr-1 i-ri:heart-line h-6"></div>
          <span>Favourites</span>
        </Link>
      }
    >
      {paginator && <TimelinePaginator paginator={paginator!} />}
    </MainContent>
  )
}
