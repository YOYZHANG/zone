import { MainContent } from "../components/main/MainContent";
import { TimelinePaginator } from "../components/timeline/TimelinePaginator";
import {masto} from "../hooks/masto";

export default function Public() {
  const paginator = masto.timelines.getPublicIterable()
  console.log(paginator, '================paginator================')

  return (<>
    <MainContent
      title={
        <div className="flex items-center">
          <div className="mr-1 i-ri:earth-line"></div>
          <span>Federated Timeline</span>
        </div>
      }
      actions={<div className="color-gray i-ri:equalizer-fill mr-1 h-6"></div>}
    >
      <TimelinePaginator paginator={paginator} />
    </MainContent>
  </>)
}
