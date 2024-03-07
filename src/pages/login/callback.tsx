import { useEffect } from "react"

export default function CallBack() {
  useEffect(() => {
    location.pathname = '/'
  }, [])
  return (<>
    Login...
  </>)
}
