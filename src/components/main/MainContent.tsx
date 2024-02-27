import {ReactNode, FC} from 'react'

export const MainContent: FC<{children: ReactNode, title: ReactNode, actions: ReactNode}> = ({
  children,
  title,
  actions
}) => {
  return (
    <>
      <div className="relative">
        <div className="sticky top-0 z10 flex justify-between">
          <div className="">{title}</div>
          <div className="">{actions}</div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}
