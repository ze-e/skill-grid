import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

export default function ModalContainer() {
  const { modalContent, modalOpen, setModalOpen } = useContext(ModalContext);

  return modalOpen ? (
    <div className="modalContainer visible">
      <div className="modalContainer__inner">
        <div className="modalContainer__content">{modalContent}</div>
        <button
          className="modalContainer__close"
          type="button"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  ) : null;
}
