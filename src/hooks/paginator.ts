import type { Paginator } from 'masto'

export function usePaginator<T>(paginator: Paginator<any, T[]>) {
  const result = await paginator.next()
}
