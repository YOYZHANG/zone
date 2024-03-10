import {ReactNode, FC} from 'react'

export const MainContent: FC<{children: ReactNode, title: ReactNode, actions: ReactNode}> = ({
  children,
  title,
  actions
}) => {
  return (
    <>
      <div className="relative  border-y">
        <div className="sticky top-0 z10 flex justify-between h-10 items-center pl-2 font-bold bg-white border-b">
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
