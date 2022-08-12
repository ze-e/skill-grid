import React, { useState } from 'react'

export default function ModalContainer () {
  const [open, setOpen] = useState(false)

  return (
    <div className={`modalContainer ${open ? 'visible' : 'hidden'}`}>
      <div className='modalContainer__inner'>
          <div className="modalContainer__content">
            Hello world
          </div>
        <button className='modalContainer__close' type="button" onClick={() => { setOpen(false) }}>X</button>
      </div>
    </div>
  )
}
