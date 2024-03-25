import type { Card } from 'masto'
import classNames from 'classnames'
import { CommonBlurhash } from '../common/CommonBlurhash'
import { StatusPreviewCardInfo } from './StatusPreviewCardInfo'

interface Props {
  card: Card
}
export const StatusPreviewCard: React.FC<Props> = ({card}) => {
  const providerName = card.providerName || new URL(card.url).hostname

  const isSquare = card.width === card.height || +(card.width || 0) < 400 || +(card.height || 0) < 200
  return (
   <div
      onClick={() => window.open(card.url, '_blank')}
      className={classNames('block of-hidden hover:bg-active rounded-lg border border-base cursor-pointer', {
        'flex': isSquare
      })}
    >
      {card.image && 
        <div className={classNames('flex flex-col display-block', {
          'min-w-22 w-22 h-22 border-r object-fill': isSquare,
          ' w-full border-b': !isSquare
        })}>
          <CommonBlurhash
            blurhash={card.blurhash}
            src={card.image}
            width={card.width || undefined}
            height={card.height || undefined}
          />
        </div>
      }
      <StatusPreviewCardInfo card={card} provider={providerName} />

   </div>
  )
}
