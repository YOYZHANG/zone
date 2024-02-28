import type { Status } from 'masto'
import { RichContent } from '../common/RichContent'

interface Props {
  status: Status
}
export const StatusBody: React.FC<Props> = ({status}) => {
  return (
    <div className="text-sm">
      <RichContent content={status.content} />
    </div>
  )
}
