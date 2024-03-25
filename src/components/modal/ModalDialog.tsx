import {FC} from 'react'
import { createPortal } from 'react-dom';

interface Prop {
  children: React.ReactNode,
  showModal: boolean,
  setShowModal: (value: boolean) => void
}
export const ModalDialog: FC<Prop> = ({
  children,
  showModal,
  setShowModal
}) => {
  const clickMask = () => {
    setShowModal(false);
  }
  return (<>
    {showModal && createPortal(
       <div className="fixed inset-0 of-y-auto scrollbar-hide overscroll-none z-2">
          <div className="dialog-mask absolute inset-0 z-0 bg-transparent opacity-100 backdrop-filter backdrop-blur-sm touch-none"/>
          <div className="dialog-mask absolute inset-0 z-0 bg-black opacity-48 touch-none h-full" onClick={clickMask} />
          <div className="p-safe-area absolute inset-0 z-1 pointer-events-none opacity-100 flex">
            <div className="flex-1 flex items-center justify-center p-4">
              <div>
                {children}
              </div>
            </div>
          </div>
       </div>,
       document.body
    )}
    </>)
}
