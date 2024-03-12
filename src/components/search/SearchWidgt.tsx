import { useEffect, useState } from "react"
import { SearchResultSkeleton } from "./SearchResultSkeleton"
import { SearchResult } from "./SearchResult"
import {useDebounce} from '@reactuses/core'
import { useMastoStore } from "../../store/masto"

interface Props {}

export const SearchWidget: React.FC<Props> = () => {
  const [query, setQuery] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState()
  const [inputVal, setInputVal] = useState('')
  const {masto} = useMastoStore()
  const debouncedQuery = useDebounce(query, 500)


  const [accounts, setAccounts] = useState([])
  useEffect(() => {
    const searchHN = async () => {
      setLoading(true);
      if (debouncedQuery) {
        const paginator = masto!.search({q: debouncedQuery})
        const nextResults = await paginator.next()
        setDone(nextResults.done || false)

        console.log(nextResults, 'nextResults')

        setAccounts(nextResults.value.accounts || [])
      }
    };

    searchHN();
  }, [debouncedQuery]);

  function active() {}
  return (
    <div className="relative px4 py2 group">
      <div className="h10 flex flex-row relative bg-base border border-base rounded-full items-center outline-1 focus-within:outline">
        <div className="i-ri-search-2-line mx4 absolute text-secondary"></div>
        <input
          className="h-full w-full pl-10 rounded-full bg-transparent outline-none focus:outline-none pr-4"
          placeholder="Search"
          value={inputVal}
          onKeyDown={active}
        >
        </input>
      </div>
      <div className="p4 absolute left-0 top-10 z-10 w-full group-focus-within:visible invisible">
        <div className="w-full bg-base border border-base rounded max-h-100 overflow-auto py2">
          {/* {query.length === 0 && (<span className="text-center text-secondary text-sm block"> search for people</span>)} */}
          {loading && (
          <>
            <SearchResultSkeleton/>
            <SearchResultSkeleton/>
            <SearchResultSkeleton/>
          </>
          )}
          {!loading && (result && <SearchResult result={result}/>)}
        </div>
      </div>
    </div>
  )
}
