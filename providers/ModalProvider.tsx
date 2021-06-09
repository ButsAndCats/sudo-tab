import * as React from "react";

const contextDefaultValues = {
  handleShowModal: null,
  handleCloseModal: null,
  modal: null,
}
export const ModalContext = React.createContext<ModalContextState>(contextDefaultValues);

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = React.useState<Modal>(contextDefaultValues.modal);
  const handleShowModal = React.useCallback((modal: Modal) => {
    setModal(modal)
  }, [modal]);
  const handleCloseModal = () => setModal(null);

  React.useEffect(() => {
    if (Boolean(modal)) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [modal])

  return (
    <ModalContext.Provider
      value={{
        modal,
        handleShowModal,
        handleCloseModal,
      }}
    >
      {children}
      <div className={`fixed inset-0 z-20 flex items-center justify-center ${Boolean(modal) ? "block" : "hidden pointer-events-none"}`}>
        <div className={`bg-gray opacity-40 absolute inset-0`} onClick={() => setModal(null)}/>
        <div className="bg-gray p-8 rounded shadow z-20">
          {modal}
        </div> 
      </div>
    </ModalContext.Provider>
  )
}

type Modal = JSX.Element | null;
type ModalContextState = {
  modal: Modal
  handleShowModal: null | ((modal: Modal) => void)
  handleCloseModal: null | (() => void)
}