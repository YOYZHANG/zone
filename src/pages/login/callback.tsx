import { useEffect } from "react";
import { useLogin } from "../../hooks/login"
import { useLocation, useNavigate } from "react-router-dom"
import { parseQuery } from "ufo"

export default function CallBack() {
  const location = useLocation()
  const searchParams = parseQuery(location.search);
  const res = useLogin(searchParams as any)

  const navigate = useNavigate();

  useEffect(() => {
    res.then(() => {
      navigate('/')
    })
  }, [res]);


  return (<>
    Login...
  </>)
}
