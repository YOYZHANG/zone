
import {useParams} from 'react-router-dom';
import { AccountHeader } from "../../components/account/AccountHeader";
import { CommonTabs } from "../../components/common/CommonTabs";
import { useEffect, useState } from "react";
import { Account, Paginator } from 'masto';
import { TimelinePaginator } from '../../components/timeline/TimelinePaginator';
import { useMastoStore } from '../../store/masto';

export default function User() {
  const params = useParams()
  const [account, setAccount] = useState<Account>()
  const [tab, setTab] = useState('Posts')
  const [paginator, setPaginator] = useState<Paginator<any, any[]>>()
  const {masto} = useMastoStore()

  useEffect(() => {
    (async () => {
      const account = await masto?.accounts.lookup({ acct: params.user! })
      setAccount(account)
    })()
  }, [])

  useEffect(() => {
    const paginator = account && masto?.accounts.getStatusesIterable(account!.id, {excludeReplies: tab==='Posts'})
    setPaginator(paginator)
  }, [account, tab])


  return (<>
    <div>
      {account && <AccountHeader account={account} />}
      <CommonTabs tab={tab} setTab={setTab}/>
      {paginator && <TimelinePaginator key={tab} paginator={paginator} />}
    </div>
  </>)
}
