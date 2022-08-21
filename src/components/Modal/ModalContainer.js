import React, { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext'

export default function ModalContainer () {
  const { modalContent, modalOpen, setModalOpen } = useContext(ModalContext)

  return (
    <div className={`modalContainer ${modalOpen ? 'visible' : 'hidden'}`}>
      <div className='modalContainer__inner'>
          <div className="modalContainer__content">
            {modalContent}
          </div>
        <button className='modalContainer__close' type="button" onClick={() => { setModalOpen(false) }}>X</button>
      </div>
    </div>
  )
}
