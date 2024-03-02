import { useAppCookies } from "../hooks/cookie";

{/* <script setup lang="ts">
const { server, token } = useAppCookies()

async function oauth() {
  const a = document.createElement('a')
  a.href = `/api/${server.value}/login`
  a.target = '_blank'
  a.click()
}
</script> */}


export default function Login() {
  const { serverURL, token, updateServerURL, updateToken } = useAppCookies();
  function oauth() {
    window.open(`/api/${serverURL}/login`, '_blank');
  }

  const handleServerURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateServerURL(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateToken(event.target.value);
  }

  return (<>
    <div className="p4">
      <button onClick={oauth}>OAuth</button>
    </div>
    <input
      value={serverURL}
      onChange={handleServerURLChange}
      placeholder="Server URL"
      className="bg-transparent text-current border px2 py1 w-full outline-none"
    />
    <input
      value={token}
      onChange={handleTokenChange}
      placeholder="Token"
      className="bg-transparent text-current border px2 py1 w-full outline-none"
    />
  </>)

}
