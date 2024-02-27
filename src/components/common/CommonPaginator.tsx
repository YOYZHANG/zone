import type { Paginator } from 'masto'
interface Props {
  paginator: Paginator<any, any[]>,
  Card: React.FC<any>,
  keyProp?: string
}

export const CommonPaginator: React.FC<Props> = ({paginator, keyProp = 'id', Card}) => {
  const {items} = 
  return (
    <div className='border-t'>
      {items.map(item => (
        <Card key={item[keyProp]} item={item}></Card>
      ))}
      <div ref="endAnchor"></div>
    </div>
  )
}
