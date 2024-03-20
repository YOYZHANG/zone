import type { Paginator } from 'masto'
import { usePaginator } from '../../hooks/paginator'
import { StatusProps } from '../status/StatusCard'
import { StatusCardSkeleton } from '../status/StatusCardSkeleton'
interface Props {
  paginator: Paginator<any, any[]>,
  Card: React.FC<StatusProps>,
}

export const CommonPaginator: React.FC<Props> = ({paginator, Card}) => {
  const {list, endAnchor, error, state} = usePaginator(paginator)

  return (
    <div>
      {list.map(item => (
        <div key={item['id']}>
          <Card key={item['id']} item={item}></Card>
          <div className='w-auto bg-border h-0.2'></div>
        </div>
        
      ))}
      <div ref={endAnchor}></div>
      {
        state === 'loading' && (<>
          <StatusCardSkeleton></StatusCardSkeleton>
          <StatusCardSkeleton></StatusCardSkeleton>
          <StatusCardSkeleton></StatusCardSkeleton>
        </>)
      }
      {
        state === 'done' && (
          <div className="p5 op50 italic text-center">
            End of the list
          </div>
        )
      }
      {
        state === 'error' && (
          <div className='p5 op50'>
            <span>{String(error)}</span>
          </div>
        )
      }
    </div>
  )
}
