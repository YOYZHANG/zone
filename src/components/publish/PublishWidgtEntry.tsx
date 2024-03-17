import { PublishButton } from "./PublicButton"
import { ModalDialog } from "../modal/ModalDialog"
import { useCallback, useState } from "react"
import { PublishWidget } from "./PublishWidget"
import classNames from "classnames"
import { useCurrentUser } from "../../hooks/login"

interface Props {

}
export const PublishWidgetEntry: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(false)
  const {currentUser} = useCurrentUser()
  const openPublishDialog = useCallback(() => {
    setShowModal(true)
  }, [setShowModal])

  return (
   <div className={classNames('flex flex-col', {
    'pointer-events-none op50': !currentUser
   })}> 
      <PublishButton handleClick={openPublishDialog}/>
      
      <ModalDialog showModal={showModal} setShowModal={setShowModal}>
        <PublishWidget draftKey="dialog" />
      </ModalDialog>
      
   </div>
  )
}
