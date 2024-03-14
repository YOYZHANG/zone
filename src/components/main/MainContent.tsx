import {ReactNode, FC} from 'react'
import { Link } from 'react-router-dom'

export const MainContent: FC<{children: ReactNode, title: ReactNode, actions?: ReactNode}> = ({
  children,
  title,
  actions
}) => {
  return (
    <>
      <div className="relative">
        <div className="sticky top-0 border-b border-base bg-base z-1">
          <div className="flex justify-between px5 py4">
            <div className="flex items-center overflow-hidden">
              <Link to="../" className='flex gap1 items-center btn-text'>
                <div className='i-ri:arrow-left-line'></div>
              </Link>
              <div className="truncate">{title}</div>
            </div>
            <div className='flex items-center gap2'>
              {actions && <div className="">{actions}</div>}
            </div>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}
