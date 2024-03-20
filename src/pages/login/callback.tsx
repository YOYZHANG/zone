import { useLogin } from "../../hooks/login"
import { useLocation } from "react-router-dom"
import { parseQuery } from "ufo"

export default function CallBack() {
  const location = useLocation()
  const searchParams = parseQuery(location.search);

  useLogin(searchParams as any)

  return (<>
    Login...
  </>)
}
