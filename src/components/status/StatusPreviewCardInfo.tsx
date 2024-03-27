import type { Card } from 'masto'

interface Props {
  card: Card;
  provider: string
}
export const StatusPreviewCardInfo: React.FC<Props> = ({card, provider}) => {
  return (
    <div className='flex flex-col py1 justify-center px3 bg-base'>
      <p className='text-secondary line-clamp-1 ws-pre-wrap break-all font-normal'>{provider}</p>
      {card.title && <strong className='line-clamp-1 ws-pre-wrap break-all font-normal'>{ card.title }</strong>}
      {card.description && <p className='line-clamp-1 break-all ws-pre-wrap text-secondary'>{card.description}</p>}
    </div>
  )
}
