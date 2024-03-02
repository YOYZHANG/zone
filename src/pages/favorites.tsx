import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import {masto} from "../utils/masto";

export default function Favorites() {
  const paginator = masto.favourites.getIterator()

  return (<>
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:heart-fill h-6"></div>
          <span>Favourites</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      <TimelinePaginator paginator={paginator} />
    </MainContent>
  </>)
}
