import { Context, Status } from "masto"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { masto } from "../../utils/masto"
import { StatusCard } from "../../components/status/StatusCard"
import { StatusDetail } from "../../components/status/StatusDetail"
import { PublishWidget } from "../../components/publish/PublishWidget"

export default function Post() {
  const params = useParams()
  const id = params.post
  const [status, setStatus] = useState<Status>()
  const [context, setContext] = useState<Context>()

  useEffect(() => {
    (async () => {
      if (!id)
      return

      const status = await masto.statuses.fetch(id)
      setStatus(status)
      console.log(status, 'post status')
      const context = await masto.statuses.fetchContext(id)
      setContext(context)
      console.log(context, 'post context')
    })()
  }, [id])
  
  return (<>
    <div>
      {context?.ancestors.map(comment => (<div className="border-t" key={comment.id}><StatusCard status={comment} /></div>))}

      {status && <StatusDetail status={status}></StatusDetail>}

      <div className="border-t p6 flex gap-4">
        <img src={status?.account.avatar} className="rounded w-10 h-10 bg-gray:10"/>
        <PublishWidget
          draftKey={`reply-${id}`}
          inReplyToId={id}
          placeholder={`Reply to ${status?.account.displayName || status?.account.acct || 'thead'}...`}
        />
      </div>
      <div className="pt-4">
        {context?.descendants.map(comment => (<div className="pt4 border-t" key={comment.id}><StatusCard status={comment} /></div>))}
      </div>
    </div>
  </>)
}
