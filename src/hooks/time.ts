import { useState } from "react"

const DEFAULT_UNITS:UseTimeAgoUnit<UseTimeAgoUnitNamesDefault>[] = [
  { max: 60000, value: 1000, name: 'second' },
  { max: 2760000, value: 60000, name: 'minute' },
  { max: 72000000, value: 3600000, name: 'hour' },
  { max: 518400000, value: 86400000, name: 'day' },
  { max: 2419200000, value: 604800000, name: 'week' },
  { max: 28512000000, value: 2592000000, name: 'month' },
  { max: Number.POSITIVE_INFINITY, value: 31536000000, name: 'year' },
]
type UseTimeAgoFormatter<T = number> = (value: T, isPast: boolean) => string
interface UseTimeAgoMessagesBuiltIn {
  justNow: string
  past: string | UseTimeAgoFormatter<string>
  future: string | UseTimeAgoFormatter<string>
  invalid: string
}

const DEFAULT_MESSAGES = {
  justNow: 'just now',
  past: n => n.match(/\d/) ? `${n} ago` : n,
  future: n => n.match(/\d/) ? `in ${n}` : n,
  month: (n, past) => n === 1
    ? past
      ? 'last month'
      : 'next month'
    : `${n} month${n > 1 ? 's' : ''}`,
  year: (n, past) => n === 1
    ? past
      ? 'last year'
      : 'next year'
    : `${n} year${n > 1 ? 's' : ''}`,
  day: (n, past) => n === 1
    ? past
      ? 'yesterday'
      : 'tomorrow'
    : `${n} day${n > 1 ? 's' : ''}`,
  week: (n, past) => n === 1
    ? past
      ? 'last week'
      : 'next week'
    : `${n} week${n > 1 ? 's' : ''}`,
  hour: n => `${n} hour${n > 1 ? 's' : ''}`,
  minute: n => `${n} minute${n > 1 ? 's' : ''}`,
  second: n => `${n} second${n > 1 ? 's' : ''}`,
  invalid: '',
}
export type UseTimeAgoUnitNamesDefault = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
export interface UseTimeAgoUnit<Unit extends string = UseTimeAgoUnitNamesDefault> {
  max: number
  value: number
  name: Unit
}
/**
 * 
 * ime | Output
--- | ---
 * Less than 1 minute | `just now`
 * 1-2 minutes | `a minute ago`
 * 2-46 minutes | # `minutes ago`
 * 46 minutes - 2 hours | `an hour ago`
 * 2-20 hours | # `hours ago`
 * 20-48 hours | `yesterday`
 * 2-6 days | `last week`
 * 7-28 days | # `weeks ago`
 * 28 days - 2 months | `last month`
 * 2-11 months | # `months ago`
 * 11-23 months | `last year`
 * 2+ years | # `years ago`

 */
export function useTimeAgo(from: Date | number | string) {
  const now = new Date()
  const diff = +now - +new Date(from)
  const absDiff = Math.abs(diff)

  function getValue(diff: number, unit: UseTimeAgoUnit<UseTimeAgoUnitNamesDefault>) {
    return Math.round(Math.abs(diff) / unit.value)
  }

  function format(diff: number, unit: UseTimeAgoUnit<UseTimeAgoUnitNamesDefault>) {
    const val = getValue(diff, unit)
    const past = diff > 0

    const str = applyFormat(unit.name as UseTimeAgoUnitNamesDefault, val, past)
    return applyFormat(past ? 'past' : 'future', str, past)
  }

  function applyFormat(name: UseTimeAgoUnitNamesDefault | keyof UseTimeAgoMessagesBuiltIn, val: number | string, isPast: boolean) {
    const formatter = DEFAULT_MESSAGES[name]
    if (typeof formatter === 'function')
      return formatter(val as never, isPast)
  }

  // less than a minute
  if (absDiff < 60000)
    return DEFAULT_MESSAGES.justNow

  for (const [idx, unit] of DEFAULT_UNITS.entries()) {
    const val = getValue(diff, unit)
    if (val <= 0 && DEFAULT_UNITS[idx - 1]) {

      return format(diff, DEFAULT_UNITS[idx - 1])
    }
      
    else if (absDiff < unit.max) {
      return format(diff, unit)
    }
  }

  return 0
}
