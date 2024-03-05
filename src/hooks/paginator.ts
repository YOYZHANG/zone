import type { Paginator } from 'masto'
import { useEffect, useRef, useState } from 'react'
import {useElementBounding} from '@reactuses/core'
import { PaginatorState } from '../types'

export function usePaginator<T>(paginator: Paginator<any, T[]>) {
  const [state, setState] = useState<PaginatorState>('idle')
  const [list, setList] = useState<T[]>([])
  const endAnchor = useRef<HTMLDivElement>(null)

  const bound = useElementBounding(endAnchor)

  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    (async () => {
      bound.update()
      const isInScreen = bound.top < window.innerHeight

      if (isInScreen && state === 'idle') {
        setState('loading')

        try {

          const result = await paginator?.next()

          if (result?.value?.length) {
            setList(items => [
                ...items,
                ...result.value.filter(newVal => !items.find(i => i.id === newVal.id))
            ])
            setState('idle')
          }
          else {
            setState('done')
          }
        }
        catch (e) {
          setError(e as Error)
          setState('error')
        }
      } 
    })()
    // QA: paginator
  }, [state, bound, paginator])

  return {
    list,
    state,
    error,
    endAnchor,
  }
}
