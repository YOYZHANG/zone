
import {useParams} from 'react-router-dom';
import { AccountHeader } from "../../components/account/AccountHeader";
import { useEffect, useState } from "react";
import { Account, Paginator } from 'masto';
import { AccountCard } from '../../components/account/AccountCard';
import { AccountPaginator } from '../../components/account/AccountPaginator';
import { useMastoStore } from '../../store/masto';

export default function Following() {
  const params = useParams()
  const [account, setAccount] = useState<Account>()
  const [paginator, setPaginator] = useState<Paginator<any, any[]>>()
  const {masto} = useMastoStore()

  console.log(params, 'params')

  useEffect(() => {
    (async () => {
      const account = await masto?.accounts.lookup({ acct: params.user! })
      setAccount(account)
    })()
  }, [])

  useEffect(() => {
    const paginator = account && masto?.accounts.getFollowingIterable(account!.id, {})
    setPaginator(paginator)
  }, [account])


  return (<>
    <div>
      {account && <AccountHeader account={account} />}
      {paginator && <AccountPaginator paginator={paginator} AccountCard={AccountCard}/>}
    </div>
  </>)
}
