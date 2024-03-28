import { useState } from "react"
import { ModalDialog } from "../modal/ModalDialog"
import { UserSignIn } from "./UserSignIn"
import { DEFAULT_SERVER } from "../../constants"
import { useTranslation } from 'react-i18next'

export const UserSignInEntry: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const openSignInDialog = () => {
      setShowModal(true)
  }
  return (<>
    <div className="hidden lg:block">
      <div className="p8 flex flex-col gap4">
        <p className="text-sm">
          Viewing <strong>{DEFAULT_SERVER}</strong> public data
        </p>
        <p className="text-sm text-secondary">
          {t('user.sign_in_desc')}
        </p>
        <button className="btn-solid text-center" onClick={openSignInDialog}>
          {t('action.sign_in')}
        </button>
      </div>
      <ModalDialog showModal={showModal} setShowModal={setShowModal}>
        <UserSignIn />
      </ModalDialog>
    </div>
  </>)
}
