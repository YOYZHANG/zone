
import {useParams} from 'react-router-dom';
import { AccountHeader } from "../../components/account/AccountHeader";
import { CommonTabs } from "../../components/common/CommonTabs";
import { useEffect, useRef, useState } from "react";
import { masto } from "../../utils/masto";
import { Account } from 'masto';

export default function User() {
  const params = useParams()
  const [account, setAccount] = useState<Account>()
  const tab = useRef('Post')

  useEffect(() => {
    (async () => {
      const account = await masto.accounts.lookup({ acct: params.user! })
      console.log(account, 'account')
      setAccount(account)
    })()
  }, [])



  return (<>
    <div>
      {account && <AccountHeader account={account} />}
      <CommonTabs tab={tab.current} />
    </div>
  </>)
}
