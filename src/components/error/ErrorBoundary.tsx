import {ReactNode, FC, useState} from 'react'

export const ErrorBoundary: FC<{children: ReactNode}> = ({
  children,
}) => {
  const [hasError] = useState(false)
  return (
    <>
    {hasError && (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try again later.</p>
      </div>
    )}
    {!hasError && children}
    </>
  )
}
