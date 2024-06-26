import { useEffect, useState } from "react"
import { SearchResultSkeleton } from "./SearchResultSkeleton"
import { SearchResult } from "./SearchResult"
import {useDebounce} from '@reactuses/core'
import { useMastoStore } from "../../store/masto"
import { Account } from "masto"
import { useTranslation } from 'react-i18next'

interface Props {}

export const SearchWidget: React.FC<Props> = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const {masto} = useMastoStore()
  const debouncedQuery = useDebounce(query, 500)
  const { t } = useTranslation()


  const [accounts, setAccounts] = useState<Account[]>([])
  const normalizedResults = [
    ...accounts.map(account => ({ type: 'account', account, to: `/@${account.acct}` })),
  ]

  useEffect(() => {
    const searchHN = async () => {
      setLoading(true);
      if (debouncedQuery) {
        const paginator = masto!.search({q: debouncedQuery, type: "accounts"})
        const nextResults = await paginator.next()

        setAccounts(nextResults.value.accounts || [])
        setLoading(false);
      }
      else {
        setAccounts([])
      }
    };
    searchHN();

  }, [debouncedQuery]);

  function active() {}
  function handleChange(e: any) {
    setQuery(e.target.value)
  }

  // if (query.length) {
  //   setAccounts([])
  // }
  return (
    <div className="relative px4 py2 group">
      <div className="h10 flex flex-row relative bg-base border border-base rounded-full items-center outline-1 focus-within:outline">
        <div className="i-ri-search-2-line mx4 absolute text-secondary"></div>
        <input
          className="h-full w-full pl-10 rounded-full bg-transparent outline-none focus:outline-none pr-4"
          placeholder={t('nav_side.search')}
          value={query}
          onKeyDown={active}
          onChange={handleChange}
        >
        </input>
      </div>
      <div className="p4 absolute left-0 top-10 z-10 w-full group-focus-within:visible invisible">
        <div className="w-full bg-base border border-base rounded max-h-100 overflow-auto py2">
          {query.length === 0 && (<span className="text-center text-secondary text-sm block"> {t('search.search_desc')}</span>)}
          {loading && query && (
          <>
            <SearchResultSkeleton/>
            <SearchResultSkeleton/>
            <SearchResultSkeleton/>
          </>
          )}
          {/* SearchResult v-for="(result, i) in results" :key="result.to" :active="index === parseInt(i.toString())" :result="result" :tabindex="focused ? 0 : -1" /> */}
          {!loading && (normalizedResults.map((result) => (<SearchResult key={result.to} result={result}/>)))}
        </div>
      </div>
    </div>
  )
}
