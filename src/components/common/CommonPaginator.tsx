import type { Paginator } from 'masto'
import { usePaginator } from '../../hooks/paginator'
import { StatusProps } from '../status/StatusCard'
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
        state === 'loading' && (
          <div className='flex flex-col items-center text-center p5 animate-pulse'>
            <div className="op50 i-ri:loader-2-fill animate-spin text-2xl"></div>
            <span className="op50">Loading...</span>
          </div>
        )
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
