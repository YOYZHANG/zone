import type { Status } from 'masto'
import { StatusActions } from './StatusActions'
import { StatusBody } from './StatusBody'
import { AccountInfo } from '../accunt/AccountInfo'

export interface StatusProps {
  status: Status,
}
export const StatusCard: React.FC<StatusProps> = ({status}) => {
  console.log(status, 'status')
  return (
    <div className="flex flex-col gap-2 my-2 px-4">
      <AccountInfo account={status?.account}>
        <div className="text-sm op50"> 2024-2-17 </div>
      </AccountInfo>
      <div>
        <StatusBody status={status}></StatusBody>
      </div>
      <StatusActions status={status}></StatusActions>
    </div>
  )
}
