import { AccountInfo } from "../account/AccountInfo"
import type {SearchResultType} from '../../types/index'
import { Link } from "react-router-dom"

interface Props {
  result: SearchResultType
}
export const SearchResult: React.FC<Props> = ({result}) => {
  return (
    <Link to={`/user${result.to}`} className="py2 block px2 hover:bg-active">
      {result.type === 'account' && <AccountInfo account={result.account!} >1</AccountInfo>}
    </Link>
  )
}
