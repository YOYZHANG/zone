import { useEffect } from "react"
import { useLogin } from "../../hooks/login"
import { useLocation } from "react-router-dom"
import { parseQuery } from "ufo"

export default function CallBack() {
  console.log('CallBack')
  const location = useLocation()
  const searchParams = parseQuery(location.search);
  console.log(searchParams, 'params')
  useLogin(searchParams as any)

  useEffect(() => {
    location.pathname = '/'
  }, [])
  return (<>
    Login...
  </>)
}
