import type { Status } from 'masto'
import { AccountInfo } from '../account/AccountInfo';
import { StatusBody } from './StatusBody';
import { StatusMedia } from './StatusMedia';
import { StatusActions } from './StatusActions';

interface Props {
  status: Status
}

export const StatusDetail: React.FC<Props> = ({status}) => {
  const cardStatus = status.reblog ? status.reblog : status;
  const date = Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(new Date(cardStatus.createdAt));
  return (
    <div className="flex flex-col gap-2 my-4 px-4">
      <AccountInfo account={cardStatus.account} ><div></div></AccountInfo>
      <StatusBody status={status} />
      {!!status.mediaAttachments?.length && (<StatusMedia status={status}></StatusMedia>)}
      <div>
        <span className="op50 text-sm">
          { date } · { status.application?.name || 'Unknown client' }
        </span>
      </div>
    <StatusActions status={status} />
    </div>
  )
}
