import { AccountInfo } from "../account/AccountInfo"
import type {SearchResultType} from '../../types/index'

interface Props {
  result: SearchResultType
}
export const SearchResult: React.FC<Props> = ({result}) => {
  return (
    <>
      {result.type === 'account' && <AccountInfo account={result.account!} >1</AccountInfo>}
    </>
  )
}
