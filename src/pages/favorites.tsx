import { useEffect, useState } from "react";
import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import { DefaultPaginationParams, Paginator, Status } from "masto";
import { useMastoStore } from "../store/masto";

export default function Favorites() {
  const [paginator, setPaginator] = useState<Paginator<DefaultPaginationParams, Status[]>>()
  const {masto} = useMastoStore()
  useEffect(() => {
    const favoraites = masto?.favourites.getIterator()
    setPaginator(favoraites)
  }, [])

  return (
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:heart-fill h-6"></div>
          <span>Favourites</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      {paginator && <TimelinePaginator paginator={paginator!} />}
    </MainContent>
  )
}
